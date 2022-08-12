import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../database/firebase.js";
import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { categorias, formadePago } from "../database/Listas.js";
import { FechaContext } from "../Context/FechaContext.js";
import { useNavigation } from '@react-navigation/native';

const GastoDetalle = (props) => {
  // HOOKS NECESARIOS
  const {Mes, Ano}= useContext(FechaContext)
  const fechaDb= Mes+"-"+Ano
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <Text onPress={() => props.navigation.navigate("CambioColeccion")}> Mes: {fechaDb}</Text>  
    })
},[navigation])

  const [gasto, setGasto] = useState({
    Monto: "",
    Categoria: "",
    FormadePago: "",
    Comentario: "",
    CategoriaIndex: "",
    FormadePagoIndex: "",
  });

  const [loading, setLoading] = useState(true);

  //FUNCIONES

  const getUserById = async (id) => {
    const docRef = doc(db, fechaDb, id);
    await getDoc(docRef).then((doc) => {
      const gasto = doc.data();
      setGasto({ ...gasto, id: doc.id });
      setLoading(false);
    });
  };

  const borrarGasto = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, fechaDb, props.route.params.gastoId);
      await deleteDoc(docRef);
      setLoading(false);
      Alert.alert("", "Borrado");
      props.navigation.navigate("Vergastos");
    } catch (e) {
      alert(e);
    }
  };

  const alertaConfirmacion = () => {
    Alert.alert(
      "Eliminando gasto",
      "Esta seguro?",
      [
        { text: "Confirmar", onPress: () => borrarGasto() },
        { text: "Cancelar", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const actualizarGasto = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, fechaDb, props.route.params.gastoId);
      const data = {
        Monto: gasto.Monto,
        Categoria: gasto.Categoria,
        FormadePago: gasto.FormadePago,
        Comentario: gasto.Comentario,
        CategoriaIndex: gasto.CategoriaIndex,
        FormadePagoIndex: gasto.FormadePagoIndex,
        createdAt: new Date(),
      };
      await setDoc(docRef, data);
      setLoading(false);
      Alert.alert("", "Actualizado");
      props.navigation.navigate("Vergastos");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getUserById(props.route.params.gastoId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLE DEL GASTO</Text>
      <SafeAreaView style={styles.formulario}>
        <Text style={styles.text}> Monto</Text>
        <TextInput
          style={styles.input2}
          keyboardType="numeric"
          name="Monto"
          placeholder="0"
          value={gasto.Monto}
          onChangeText={(value) => setGasto({ ...gasto, Monto: value })}
        ></TextInput>
      </SafeAreaView>
      <SafeAreaView style={styles.formulario}>
        <Text style={styles.text}> Categoría</Text>
        <SelectDropdown
          data={categorias}
          onSelect={(selectedItem, index) => {
            setGasto({
              ...gasto,
              Categoria: selectedItem,
              CategoriaIndex: index,
            });
          }}
          buttonStyle={styles.dropdown}
          defaultValueByIndex={gasto.CategoriaIndex}
          defaultButtonText={"Seleccione una opción"}
          rowTextStyle={{ textAlign: "left" }}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.formulario}>
        <Text style={styles.text}> Forma de pago </Text>
        <SelectDropdown
          data={formadePago}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            setGasto({
              ...gasto,
              FormadePago: selectedItem,
              FormadePagoIndex: index,
            });
          }}
          defaultValueByIndex={gasto.FormadePagoIndex}
          defaultButtonText={"Seleccione una opción"}
          rowTextStyle={{ textAlign: "left" }}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.formulario}>
        <Text style={styles.text}> Comentario</Text>
        <TextInput
          style={styles.input3}
          multiline
          value={gasto.Comentario}
          onChangeText={(value) => setGasto({ ...gasto, Comentario: value })}
        ></TextInput>
      </SafeAreaView>
      <View style={styles.buttton}>
        <Button
          containerStyle={styles.buttton}
          title="Actualizar"
          onPress={() => actualizarGasto()}
        />
      </View>
      <View style={styles.buttton}>
        <Button
          containerStyle={styles.buttton}
          title="Borrar"
          onPress={() => {
            alertaConfirmacion();
          }}
        />
      </View>
      <View style={styles.buttton}>
        <Button
          containerStyle={styles.buttton}
          title="Volver"
          onPress={() => props.navigation.navigate("Vergastos")}
        />
      </View>
      <View style={styles.buttton}>
        <Button
          containerStyle={styles.buttton}
          title="Agregar nuevo gasto"
          onPress={() => props.navigation.navigate("Nuevogasto")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    alignItems: "center",
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    color: "blue",
    marginBottom: 50,
  },
  container: {
    marginTop: 40,
  },
  formulario: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    width: 200,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },

  input2: {
    height: 50,
    borderWidth: 0.5,
    padding: 10,
    minWidth: 200,
    fontSize: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  input3: {
    height: 60,
    borderWidth: 0.5,
    padding: 10,
    minWidth: 200,
    maxWidth: 225,
    fontSize: 15,
    borderRadius: 10,
    marginTop: 10,
    textAlign: "center",
  },
  buttton: {
    width: 320,
    alignContent: "center",
    marginTop: 10,
    marginStart: 25,
  },
  buttton2: {
    alignItems: "center",
    marginTop: 0,
  },
  dropdown: {
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#444",
    borderRadius: 10,
    width: 200,
    alignContent: "center",
    marginTop: 10,
  },
});

export default GastoDetalle;
