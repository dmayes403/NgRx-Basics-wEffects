import firebaseKeys from '../angularKeys';

export const environment = {
    production: true,
    firebase: {
        apiKey: firebaseKeys.API_KEY,
        authDomain: firebaseKeys.AUTH_DOMAIN,
        databaseURL: firebaseKeys.DATABASE_URL,
        projectId: firebaseKeys.PROJECT_ID,
        storageBucket: firebaseKeys.STORAGE_BUCKET,
        messagingSenderId: firebaseKeys.MESSAGING_SENDER_ID
    }
};