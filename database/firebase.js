import React, { useState, useEffect, createContext } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import axios from "axios";
import Constants from 'expo-constants';

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

WebBrowser.maybeCompleteAuthSession();
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@federicoand/Registro-gastos' };
const NATIVE_REDIRECT_PARAMS = { native: "com.federicoand.registrogastos://" };
const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [request, googleResponse, googleAuth] = Google.useAuthRequest({
    expoClientId:
    '370676180770-89215l3ec70vg5711s6rng1qng1q116k.apps.googleusercontent.com',
    androidClientId: '409288050185-atno443maf6c9nppiio66gm1juquoc38.apps.googleusercontent.com',
    selectAccount: true,
    redirectUri,
    responseType: "id_token"
  });
  const loginAsync = () => {
    googleAuth();
  }
  useEffect(() => {
    // const serverUrl = "http://192.168.30.24:4000/api"
    // const userEndpoint = serverUrl + user;
    // const endpoints = {
    //   google: userEndpoint + "/google",

    // };
    
    // const googleLoginOrRegister = async (accessToken) => {
    //   try {
    //     const { data } = await axios.post(endpoints.google, {
    //       accessToken,
    //     });
    //     return data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // async function loginUserWithGoogle(access_token) {
    //   try {
    //     setLoading(true);
    //     const user = await googleLoginOrRegister(access_token);
    //     console.log(user)
    //     // handleSignInUser(user);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    // if (googleResponse?.type === "success") {
    //   const { access_token } = googleResponse.params;
    //   loginUserWithGoogle(access_token);
    // }
    // setLoading(false);
    if (googleResponse?.type !== "success") {
      setLoading(false);
    }
    if (googleResponse?.type === "success") {
      setLoading(true);
      // console.log(googleResponse)}
      const { id_token } = googleResponse.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
      .then((credential) => {
        setUser(credential.user)
        setDoc(doc(db, 'Users', credential.user.uid), {
          Foto: credential.user.photoURL,
          Nombre: credential.user.displayName,
          Email: credential.user.email,
          // Token: token
        })
        AsyncStorage.clear()
        AsyncStorage.setItem('User', JSON.stringify(credential.user))}
      )
      .catch((e) => {
        Alert(e);
        setLoading(false);
      })}
  }, [googleResponse]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginAsync,
        setLoading,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};