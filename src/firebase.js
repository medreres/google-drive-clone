import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import 'firebase/storage'
import {
  deleteObject,
  getStorage,
  ref
} from "firebase/storage";

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
  }),
  addFile,
  addFolder,
  deleteFile
};

export const storage = getStorage(app);

/**
 * @param {string} name string name of folder,
 * @param {int} parentId id of parent folder,
 * @param {int} userId id of user craeted the foler,
 * @param {string} path path of folder,
 * @param {time} createdAt time the folder was created,
 */
function addFolder(props) {
  addDoc(db.folders, {
    ...props,
    createdAt: serverTimestamp(),
  });
}

function addFile(props) {
  addDoc(db.files, {
    ...props,
    createdAt: serverTimestamp(),
  })
}

async function deleteFile(path, id) {
  // delete doc from firestore
  const q = query(db.files, where('id', '==', id));
  getDocs(q).then(docs => {
    docs.forEach(doc => {
      deleteDoc(doc.ref);
      // delete file form storage
      const fileRef = ref(storage, path);
      deleteObject(fileRef)
    })

  })


}

export default app;