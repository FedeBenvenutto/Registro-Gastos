import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { FechaContext } from "../Context/FechaContext";
import { useNavigation } from "@react-navigation/native";

const CambioColeccion = (props) => {
  const FechaActual = new Date();
  const AnoActual = FechaActual.getFullYear().toString();
  const Meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const MesActual = FechaActual.getMonth();
  const { fechaDb, setMes, setAno } = useContext(FechaContext);

  const navigation = useNavigation();
  var mesSeleccionado;
  var anoSeleccionado = AnoActual;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text> Mes actual: {fechaDb}</Text>,
    });
  }, [navigation]);

  const ConfirmarCambio = () => {
    if (
      anoSeleccionado.length != 4 ||
      anoSeleccionado < 2000 ||
      anoSeleccionado > 3000 ||
      isNaN(anoSeleccionado)
    ) {
      Alert.alert("", "Ingrese correctamente el año");
    } else {
      anoSeleccionado ? setAno(anoSeleccionado) : setAno(AnoActual);
      mesSeleccionado ? setMes(mesSeleccionado) : setMes(Meses[MesActual]);
      props.navigation.navigate("Nuevogasto");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titulo}>CAMBIO DE MES Y AÑO</Text>
        <SafeAreaView style={styles.formulario}>
          <Text style={styles.text}> Mes</Text>
          <SelectDropdown
            data={Meses}
            onSelect={(selected) => {
              mesSeleccionado = selected;
            }}
            buttonStyle={styles.dropdown}
            defaultButtonText={"Seleccione una opción"}
            defaultValueByIndex={MesActual}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.formulario}>
          <Text style={styles.text}>Año</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input2}
            defaultValue={AnoActual}
            onChangeText={(value) => (anoSeleccionado = value)}
          ></TextInput>
        </SafeAreaView>
        <View style={styles.buttton}>
          <Button
            containerStyle={styles.buttton}
            title="Confirmar"
            onPress={() => ConfirmarCambio()}
          />
        </View>
        <View style={styles.buttton}>
          <Button
            containerStyle={styles.buttton}
            title="Cancelar"
            onPress={() => props.navigation.navigate("Nuevogasto")}
          />
        </View>
      </View>
      <SpeedDialComp />
    </>
  );
};

const styles = StyleSheet.create({
  titulo: {
    alignItems: "center",
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    color: "blue",
    marginBottom: 50,
  },
  container: {
    marginTop: 80,
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
    marginTop: 15,
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
  hidden: {
    hidden: false,
    height: 0,
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
    marginTop: 10,
  },
});

export default CambioColeccion;
