// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import firebaseKeys from '../angularKeys';

export const environment = {
    production: false,
    firebase: {
        apiKey: firebaseKeys.API_KEY,
        authDomain: firebaseKeys.AUTH_DOMAIN,
        databaseURL: firebaseKeys.DATABASE_URL,
        projectId: firebaseKeys.PROJECT_ID,
        storageBucket: firebaseKeys.STORAGE_BUCKET,
        messagingSenderId: firebaseKeys.MESSAGING_SENDER_ID
    }
};
