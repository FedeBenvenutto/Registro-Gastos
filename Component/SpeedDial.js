import React, { useState, useContext } from "react";
import { SpeedDial } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../database/firebase.js";
import { signOut } from "firebase/auth";
import { UserContext } from "../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpeedDialComp = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const { setCurrentUserId, setLoading, setProyectId, setUsers } =
    useContext(UserContext);

  return (
    <SpeedDial
      color={"#606e8c"}
      isOpen={open}
      icon={{ name: "add", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Añadir nuevo gasto"
        onPress={() => {
          setOpen(!open);
          navigation.navigate("Nuevogasto");
        }}
      />
      <SpeedDial.Action
        icon={{ name: "add-chart", color: "#fff" }}
        title="Ver gastos"
        onPress={() => {
          setOpen(!open);
          navigation.navigate("Vergastos");
        }}
      />
      <SpeedDial.Action
        icon={{ name: "done-outline", color: "#fff" }}
        title="Totales"
        onPress={() => {
          setOpen(!open);
          navigation.navigate("Totales");
        }}
      />
      <SpeedDial.Action
        icon={{ name: "exit-to-app", color: "#fff" }}
        title="Cerrar sesión"
        onPress={() => {
          setLoading(false);
          setCurrentUserId(null);
          setProyectId("");
          setUsers(null);
          AsyncStorage.clear();
          signOut(auth)
            .then(() => {
              setLoading(false);
              console.log("Sign-out successful");
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        }}
      />
    </SpeedDial>
  );
};

export default SpeedDialComp;
