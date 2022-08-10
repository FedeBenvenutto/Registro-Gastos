import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { db } from '../database/firebase.js';
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';

const Vergastos = (props) => {
  const [gastos, setGastos] = useState([]);
  useEffect(() => {
    const collectionRef = collection (db, 'Agosto');
    const q = query (collectionRef, orderBy ('createdAt', 'desc'))
    const unsuscribe = onSnapshot (q, querySnapshot => {
      setGastos (
      querySnapshot.docs.map (doc => 
        ({
          id: doc.id,
          Monto: doc.data().Monto,
          Categoria: doc.data().Categoria,
          FormadePago: doc.data().FormadePago,
          Comentario: doc.data().Comentario,
          createdAt: doc.data().createdAt
        }))
    ) })
          return unsuscribe
  }, []);

  return (
    <ScrollView>
      { <Button
        onPress={() => props.navigation.navigate("Nuevogasto")}
        title="Añadir nuevo gasto"
      />}
      {gastos.map((gasto) => {
        return (
          <ListItem
            key={gasto.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                gastoId: gasto.id,
              });
            }}
          >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>Monto: {gasto.Monto}</ListItem.Title>
              <ListItem.Subtitle>Categoría: {gasto.Categoria}</ListItem.Subtitle>
              <ListItem.Subtitle>Forma de pago: {gasto.FormadePago}</ListItem.Subtitle>
              <ListItem.Subtitle>Comentario: {gasto.Comentario}</ListItem.Subtitle>
              <ListItem.Subtitle>Fecha de carga: {new Date(gasto.createdAt.toDate()).toString().slice(0,-15)}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default Vergastos;