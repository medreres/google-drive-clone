import {
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDERS: "setChildFolders",
  SET_CHILD_FILES: "setChildFiles",
};

export const ROOT_FOLDER = {
  name: "root",
  id: null,
  path: [],
};

function reducer(state, { type, payload }) {
  // console.log(state)
  // console.log(type)
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
        isLoadingFiles: true,
        isLoadingFolders: true,
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
        isLoadingFolders: true,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
        isLoadingFolders: false,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
        isLoadingFiles: false,
      };

    default:
      return state;
  }
}

export default function useFolder(folderId = null, folder = null) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    isLoadingFiles: true,
    isLoadingFolders: true,
  });

  // select folder
  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);


  // update folder
  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER,
        },
      });
    }

    try {
      const docRef = doc(db.folders, folderId);
      getDoc(docRef)
        .then((d) => {
          return dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {
              folder: db.formatDoc(d),
            },
          });
        })
        .catch((err) => {
          navigate("/");

          return dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {
              folder: ROOT_FOLDER,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, [folderId, navigate]);


  // update child folders
  useEffect(() => {
    // create a query

    try {
      const q = query(
        db.folders,
        where("parentId", "==", folderId),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt")
      );
      return onSnapshot(q, (snapshot) => {
        const childFolders = [];
        snapshot.forEach((doc) => childFolders.push(db.formatDoc(doc)));

        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: {
            childFolders,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [folderId, currentUser]);


  // update child files
  useEffect(() => {
    // create a query

    try {
      const q = query(
        db.files,
        where("folderId", "==", folderId),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt")
      );
      return onSnapshot(q, (snapshot) => {
        const childFiles = [];
        snapshot.forEach((doc) => childFiles.push(db.formatDoc(doc)));

        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: {
            childFiles,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [folderId, currentUser]);

  return state;
}
