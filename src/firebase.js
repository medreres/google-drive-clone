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
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import 'firebase/storage'
import {
  deleteObject,
  getStorage,
  listAll,
  ref
} from "firebase/storage";
import {
  useAuth
} from "./context/AuthContext";

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
  deleteFile,
  deleteFolder,
  changeFileName,
  changeFolderName
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

function deleteFolder(path, userId) {
  const listRef = ref(storage, `files/${userId}`)
  listAll(listRef).then(docs => {
    console.log(docs)
  })

}


function changeFileName(id, newName) {
  // get ref of doc in database
  const q = query(db.files,
    where('id', '==', id),
    limit(1));

  getDocs(q).then(docs => {
    docs.forEach(doc => {
      updateDoc(doc.ref, {
        name: newName
      })
    })
  });

}


function changeFolderName(id, newName) {

  // get ref of doc in database
  const q = query(db.folders,
    where('folderIdFB', '==', id),
    limit(1));

  getDocs(q).then(docs => {
    console.log(docs)
    docs.forEach(doc => {
      updateDoc(doc.ref, {
        name: newName
      })
    })
  });

}

export default app;