import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROEJCT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKEY,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const firestore = getFirestore(app);

export const auth = getAuth();

export const db = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: doc => ({
    id: doc.id,
    ...doc.data()
  })
};

/**
 * @param {string} name string name of folder,
 * @param {int} parentId id of parent folder,
 * @param {int} userId id of user craeted the foler,
 * @param {string} path path of folder,
 * @param {time} createdAt time the folder was created,
 */
export function addFolder(props) {
  addDoc(db.folders, {
    ...props,
    createdAt: serverTimestamp(),
  });
}

export default app;