import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Dimensions } from "react-native";
import { ListItem } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../database/firebase.js";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FechaContext } from "../Context/FechaContext.js";
import { useNavigation } from "@react-navigation/native";
import { categorias, formadePago } from "../database/Listas.js";
import SpeedDialComp from "../Component/SpeedDial.js";
import GraficoTorta from "../Component/GraficoTorta.js";
import { UserContext } from "../Context/UserContext";

var heightY = Dimensions.get("window").height;
const Totales = (props) => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fechaDb, Meses, MesActual, Mes, DiaActual, AnoActual } =
    useContext(FechaContext);
  const { proyectId } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
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
    const collectionRef = collection(db, "Registros", proyectId,  fechaDb);
    const q = query(collectionRef);
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
  var sumaTotal = 0;
  var sumaCat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var sumaFp = [0, 0, 0, 0, 0, 0, 0];
  var promedioDiario;
  gastos.forEach((gasto) => {
    sumaTotal += Number(gasto.Monto);
    sumaCat[gasto.CategoriaIndex] += Number(gasto.Monto);
    sumaFp[gasto.FormadePagoIndex] += Number(gasto.Monto);
  });
  if (Mes === Meses[MesActual]) {
    promedioDiario = sumaTotal / DiaActual;
  } else {
    let mesbase = Meses.indexOf(Mes) + 1;
    let indice = new Date(Number(AnoActual), mesbase, 0).getDate();
    promedioDiario = sumaTotal / indice;
  }
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    TOTAL DEL MES
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.text3}>
                $ {sumaTotal.toFixed(2)}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    PROMEDIO DIARIO
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded4}
            onPress={() => {
              setExpanded4(!expanded4);
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.text3}>
                $ {promedioDiario.toFixed(2)}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    TOTAL POR CATEGORIA
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded2}
            onPress={() => {
              setExpanded2(!expanded2);
            }}
          >
            <ListItem.Content>
              {categorias.map((gasto, i) => (
                <ListItem.Title style={styles.text2} key={i}>
                  {" "}
                  {categorias[i]} : $ {sumaCat[i].toFixed(2)}
                </ListItem.Title>
              ))}
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    TOTAL POR FORMA DE PAGO
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded3}
            onPress={() => {
              setExpanded3(!expanded3);
            }}
          >
            <ListItem.Content>
              {formadePago.map((gasto, i) => (
                <ListItem.Title style={styles.text2} key={i}>
                  {" "}
                  {formadePago[i]} : $ {sumaFp[i].toFixed(2)}
                </ListItem.Title>
              ))}
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    GRAFICO Y PORCENTAJE
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded5}
            onPress={() => {
              setExpanded5(!expanded5);
            }}
          >
            <ListItem.Content>
              <GraficoTorta sumaCat={sumaCat} sumaTotal={sumaTotal} />
            </ListItem.Content>
          </ListItem.Accordion>
        </ScrollView>
      </View>
      <SpeedDialComp />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: heightY * 0.026,
    opacity: 0.6,
    textAlign: "center",
    fontWeight: "bold",
    marginStart: 10,
  },
  text2: {
    fontSize: heightY * 0.024,
    opacity: 0.6,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "darkkhaki",
    width: '100%',
  },
  text3: {
    fontSize: heightY * 0.026,
    opacity: 0.6,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "darkkhaki",
    width: '100%',
  },
});

export default Totales;
