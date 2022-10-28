import React, { useState, useEffect, createContext } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../database/firebase";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [users, setUsers] = useState(null);
  const [proyectId, setProyectId] = useState("");
  console.log("User: " + users)
  const takeUsers = (proyect) => {
    console.log("proyectointake: " + proyect)
    const collectionRef = collection(db, "Registros", proyect, "Users");
      const q = query(collectionRef);
       onSnapshot(q, (querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({
            Mail: doc.data().Mail,
            Token: doc.data().Token,
            Uid: doc.data().Uid,
            Nombre: doc.data().Nombre,
          }))
        );
      });
      }

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        setLoading,
        loading,
        users,
        proyectId,
        setProyectId,
        setUsers,
        takeUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
