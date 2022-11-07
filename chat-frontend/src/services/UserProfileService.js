import {addDoc, doc, collection, serverTimestamp, getDocs, query, where, limit, updateDoc} from "firebase/firestore";
import {auth, db} from "config/firebase";
import {DATABASE_NAME} from "config/firestore.constant";
import {signOut } from "firebase/auth"

export const getUserSchemaFromUserHook = (userHook) => {
  let schemaUser = {...userHook}
  delete schemaUser.metadata;
  delete schemaUser.proactiveRefresh;
  delete schemaUser.providerData;
  delete schemaUser.stsTokenManager;
  delete schemaUser.reloadListener;
  delete schemaUser.auth;
  return schemaUser
}

export const saveUserInfo = async (userData) => {
  try {
    console.log('user data', userData)
    let schemaUserStorage = getUserSchemaFromUserHook(userData);

    const querySnapshot = await getDocs(query(collection(db, DATABASE_NAME.USERS), where("email", "==" , schemaUserStorage.email), limit(1) ))
    if(querySnapshot.size === 0) {
      const docRef = await addDoc(collection(db, DATABASE_NAME.USERS), {
        ...schemaUserStorage,
        active: true,
        created_at: serverTimestamp()
      });
      console.log("ID user: ", docRef.id);
    }

    if(querySnapshot.size === 1) {
      querySnapshot.forEach(userItem => {
        updateDoc(doc(db, DATABASE_NAME.USERS, userItem.id), {
          active: true,
        }).then(() => console.log("Cập nhật trạng thái active của user"))
      })
    }


  } catch (e) {
    console.error("Error", e);
  }
}

export const onSignOutUser = async (userSignOut, callback) => {
  const querySnapshot = await getDocs(query(collection(db, DATABASE_NAME.USERS), where("email", "==" , userSignOut.email), limit(1) ))
  if(querySnapshot.size === 1) {
    querySnapshot.forEach(userItem => {
      updateDoc(doc(db, DATABASE_NAME.USERS, userItem.id), {
        active: false,
      }).then(() => {
        console.log("Cập nhật trạng thái active của user");
        signOut(auth).then(() => callback())
      })
    })
  }
}