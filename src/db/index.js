import admin from 'firebase-admin';
import config from '../config';

const { firebase } = config;

admin.initializeApp({
  credential: admin.credential.cert(firebase.credentialsPath),
});

const db = admin.firestore();

export default db;
