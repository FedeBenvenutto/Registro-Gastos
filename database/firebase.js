import React, { useState, useEffect, createContext } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBdJX2hu2cAmyTL7ezeYMsCSqDs2dBN1V0",
  authDomain: "registro-gastos3.firebaseapp.com",
  projectId: "registro-gastos3",
  storageBucket: "registro-gastos3.appspot.com",
  messagingSenderId: "370676180770",
  appId: "1:370676180770:web:1935a0a1601438747b277b",
  measurementId: "G-1YML5E4BGG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// WebBrowser.maybeCompleteAuthSession();
// export const UserContext = createContext();
// export const UserProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//   //   expoClientId:
//   //   '370676180770-89215l3ec70vg5711s6rng1qng1q116k.apps.googleusercontent.com',
//   //   androidClientId: '409288050185-49rr6burn4dg7a95ldtsak1ourtaqu0j.apps.googleusercontent.com',   
//   // });
//   useEffect(() => {
//     setLoading(false);
//     if (response?.type !== "success") {
//       setLoading(false);
//     }
//     if (response?.type === "success") {
//       setLoading(true);
//       const { id_token } = response.params;
//       const auth = getAuth();
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential)
//       .then((credential) =>
//         setUser(credential.user)
//       )
//       .catch((e) => {
//         Alert(e);
//         setLoading(false);
//       });
//       console.log(user)
//       AsyncStorage.clear();
//       AsyncStorage.setItem('User', JSON.stringify(user));
//       addDoc(collection(db, 'user', user.id), {
//         Monto: monto,
//         Categoria: gasto.Categoria,
//         FormadePago: gasto.FormadePago,
//         Comentario: gasto.Comentario,
//         CategoriaIndex: gasto.CategoriaIndex,
//         FormadePagoIndex: gasto.FormadePagoIndex,
//         createdAt: new Date(),

//       });
//     }
//   }, [response]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         promptAsync,
//         setLoading,
//         loading,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };