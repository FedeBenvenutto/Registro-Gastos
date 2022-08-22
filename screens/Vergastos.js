import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../database/firebase.js";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FechaContext } from "../Context/FechaContext.js";
import { useNavigation } from "@react-navigation/native";
import { categorias, color } from "../database/Listas.js";
import SpeedDialComp from "../Component/SpeedDial.js";

const Vergastos = (props) => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fechaDb } = useContext(FechaContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={() => props.navigation.navigate("CambioColeccion")}>
          {" "}
          Mes: {fechaDb}
        </Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const collectionRef = collection(db, fechaDb);
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setGastos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Monto: doc.data().Monto,
          Categoria: doc.data().Categoria,
          CategoriaIndex: doc.data().CategoriaIndex,
          FormadePago: doc.data().FormadePago,
          Comentario: doc.data().Comentario,
          createdAt: doc.data().createdAt,
        }))
      );
      setLoading(false);
    });
    return unsuscribe;
  }, []);
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <>
      <View>
        <ScrollView>
          {gastos.map((gasto) => {
            return (
              <ListItem
                key={gasto.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("GastoDetalle", {
                    gastoId: gasto.id,
                  });
                }}
              >
                {/* <ListItem.Chevron /> */}
                <Avatar
                  size={45}
                  rounded
                  title={categorias[gasto.CategoriaIndex][0]}
                  containerStyle={{
                    backgroundColor: color[gasto.CategoriaIndex],
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>Monto: {gasto.Monto}</ListItem.Title>
                  <ListItem.Subtitle>
                    Categoría: {gasto.Categoria}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Forma de pago: {gasto.FormadePago}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Comentario: {gasto.Comentario}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Fecha de carga:{" "}
                    {new Date(gasto.createdAt.toDate())
                      .toString()
                      .slice(0, -15)}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      </View>
      <SpeedDialComp />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Vergastos;
