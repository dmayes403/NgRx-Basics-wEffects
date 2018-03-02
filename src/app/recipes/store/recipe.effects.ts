import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';

export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            })
        })
        .map(
            (recipes) => {
                console.log(recipes);
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        );

    constructor(private actions$: Actions,
                private httpClient: HttpClient) {}
    // ^^ this automatically imports all of the actions
}
