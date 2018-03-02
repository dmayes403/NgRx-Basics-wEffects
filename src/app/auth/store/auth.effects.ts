import { Effect, Actions } from '@ngrx/effects'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    // @Effect({dispatch: false})
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            // ^^ this automatically receives the whole action
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            // ^^ allows us to merge two observables into one
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        })

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignup) => {
            // ^^ this automatically receives the whole action
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            // ^^ allows us to merge two observables into one
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    @Effect({dispatch: false})
    // ^^ this is needed if we don't want to dispatch anything else
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        // ^^ we need to let this resolve to an observable, so we must use do instead of subscribe
        .do(() => {
            this.router.navigate(['/']);
        })


        // effects automatically have access to actions
        constructor(private actions$: Actions, private router: Router) {
        // ^^ this is essentially a list of all the actions in the app

        }
}