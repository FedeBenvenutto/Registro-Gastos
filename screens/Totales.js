import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Button, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { ListItem, SpeedDial} from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../database/firebase.js";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FechaContext } from "../Context/FechaContext.js";
import { useNavigation } from '@react-navigation/native';
import { categorias, formadePago } from "../database/Listas.js";

const Vergastos = (props) => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const {fechaDb}= useContext(FechaContext)
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <Text onPress={() => props.navigation.navigate("CambioColeccion")}> Mes: {fechaDb}</Text>  
    })
},[navigation])

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
          FormadePagoIndex: doc.data().FormadePagoIndex,
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
  var sumaTotal=0;
  var sumaCat= {0:0, 1:0, 2:0, 3:0, 4:0,5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
  var sumaFp= {0:0, 1:0, 2:0, 3:0, 4:0,5:0, 6:0}
  gastos.forEach((gasto) => {
    sumaTotal += Number(gasto.Monto);
    sumaCat[gasto.CategoriaIndex] += Number(gasto.Monto);
    sumaFp[gasto.FormadePagoIndex] += Number(gasto.Monto)
})
  
  return (
    <>
    <View style={styles.container}>
      <ScrollView>
{/* <Button
  onPress={() => props.navigation.navigate("Nuevogasto")}
  title="Añadir nuevo gasto"
/> */}
<ListItem.Accordion
  content={
    <>
      <ListItem.Content >
        <ListItem.Title style={styles.text}>TOTAL DEL MES</ListItem.Title>
      </ListItem.Content>
    </>
  }
  isExpanded={expanded}
  onPress={() => {
    setExpanded(!expanded);
  }}
  
>
<ListItem.Content>
        <ListItem.Title style={styles.text3}>$ {sumaTotal}</ListItem.Title>
      </ListItem.Content>
</ListItem.Accordion >
<ListItem.Accordion
  content={
    <>
      <ListItem.Content >
        <ListItem.Title style={styles.text}>TOTAL POR CATEGORIA</ListItem.Title>
      </ListItem.Content>
    </>
  }
  isExpanded={expanded2}
  onPress={() => {
    setExpanded2(!expanded2);
  }}
>
<ListItem.Content>
{categorias.map((gasto, i) =>
         <ListItem.Title style={styles.text2} key={i}> {categorias[i]} : $ {sumaCat[i]}</ListItem.Title>)}
</ListItem.Content>
</ListItem.Accordion>
<ListItem.Accordion
  content={
    <>
      <ListItem.Content >
        <ListItem.Title style={styles.text}>TOTAL POR FORMA DE PAGO</ListItem.Title>
      </ListItem.Content>
    </>
  }
  isExpanded={expanded3}
  onPress={() => {
    setExpanded3(!expanded3);
  }}
>
<ListItem.Content>
{formadePago.map((gasto, i) =>
           <ListItem.Title style={styles.text2} key={i}> {formadePago[i]} : $ {sumaFp[i]}</ListItem.Title>)}
</ListItem.Content>
</ListItem.Accordion>
</ScrollView>
    </View>
    <SpeedDial
          style={styles.speedDial}
          color={'#606e8c'}
          isOpen={open}
          icon={{ name: 'add', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
        >
          <SpeedDial.Action
            icon={{ name: 'add', color: '#fff' }}
            title="Añadir nuevo gasto"
            onPress={() => props.navigation.navigate("Nuevogasto")}
          />
          <SpeedDial.Action
            icon={{ name: 'add-chart', color: '#fff' }}
            title="Ver gastos"
            onPress={() => props.navigation.navigate("Vergastos")}
          />
        </SpeedDial>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'blue',
  
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
  header: {
    backgroundColor: "#68E9FF", 
    padding: 30, 
    // marginBottom: 10, 
    borderRadius: 5,
    marginTop: 19
},
text: {
    fontSize: 20, 
    opacity: 0.6,
    textAlign: 'center', 
    fontWeight: 'bold',
    marginStart: 10,

},
text2: {
  fontSize: 18, 
  opacity: 0.6,
  textAlign: 'center', 
  fontWeight: 'bold',
  backgroundColor: 'darkkhaki',
  width: 400
},
text3: {
  fontSize:20, 
  opacity: 0.6,
  textAlign: 'center', 
  fontWeight: 'bold',
  backgroundColor: 'darkkhaki',
  width: 400
},
content: {
    width: "90%", 
    padding: 50, 
    backgroundColor: "#E85F53"
},
speedDial: {
  // flex: 1,
  // position: 'relative',
  // minWidth: 800
  // backgroundColor: 'blue'
},
Accordion:{
// backgroundColor: 'red'

}

});

export default Vergastos;
