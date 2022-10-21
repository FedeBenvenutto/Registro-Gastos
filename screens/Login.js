import { Button, TextInput} from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// import { UserContext } from "../Context/UserContext";
import { UserContext } from "../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  // const [nombre, setNombre] = useState();
  const {setLoading, loading, setUser, loginAsync} = useContext(UserContext);
  useEffect(() => {
    AsyncStorage.getItem("User")
    .then ((value) => {if (value) {
      setLoading(true);
      setUser (JSON.parse(value))}})
      }, []);
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
        <Button
          buttonStyle={{ backgroundColor: "gray" }}
          title="Volver"
          onPress={() => {
            setLoading(false);
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Text style={styles.container}>REGISTRO DE GASTOS</Text>
      {/* <Text style={styles.container}> Por favor seleccione un Usuario: </Text>

      <Text style={styles.container}> Crear nuevo usuario</Text>
      <SafeAreaView style={styles.formulario}>
          <Text style={styles.text}> Nombre: </Text>
          <TextInput
            style={styles.input2}
            value={nombre}
            onChangeText={(value) => setNombre(value)}
          ></TextInput>
        </SafeAreaView> */}
      <Button
        onPress={() => {
          setLoading(true);
          loginAsync();
        }}
        containerStyle={styles.buttton}
      >
        INICIAR SESIÓN CON GOOGLE
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  buttton: {
    width: "88%",
    alignContent: "center",
    marginTop: 80,
    marginStart: 25,
  },
  formulario: {
    flexDirection: "row",
  },
});

export default Login