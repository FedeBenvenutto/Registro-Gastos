import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
// import { ListItem, Avatar } from "react-native-elements";
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
  const categorias = [
    {key:'1',value:'Salud'},
    {key:'2',value:'Supermercado'},
    {key:'3',value:'Niñera/Limpieza'},
    {key:'4',value:'Colegio'},
    {key:'5',value:'Verdulería'},
    {key:'6',value:'Impuestos'},
    {key:'7',value:'Pago Tarjeta de Crédito'},
    {key:'8',value:'Ropa'},
    {key:'9',value:'Carnicería'},
    {key:'10',value:'Librería'},
    {key:'11',value:'Otros gastos'}
];
const formadePago = [
    {key:'1',value:'Tarjeta de Crédito'},
    {key:'2',value:'Tarjeta de Débito'},
    {key:'3',value:'Efectivo'},
    {key:'4',value:'Billetera Santa Fe con descuesto'},
    {key:'5',value:'Billetera Santa Fe sin descuesto'},
    {key:'6',value:'Personal Pay con descuento '},
    {key:'7',value:'Donaciones'},
    {key:'8',value:'Otros'},
];
// console.log(categorias.find(categoria => categoria.key === gastos.Categoria));

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
              <ListItem.Subtitle>Fecha de carga: {Date(gasto.createdAt)}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default Vergastos;