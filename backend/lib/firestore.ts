import * as admin from "firebase-admin";

import * as serviceAccount from "./key.json";

// if (admin.app.length == 0) {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://desafio-ppt-default-rtdb.firebaseio.com",
});
// }

const firestore = admin.firestore();
const rtdb = admin.database();
export { firestore, rtdb };
