import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { UserContext } from "../Context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/firebase.js";
import { NotificationContext } from "../Context/Notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const heightY = Dimensions.get("window").height;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const {
    setCurrentUserId,
    loading,
    setLoading,
    setProyectId,
    proyectId,
    setUsers,
    takeUsers,
  } = useContext(UserContext);
  const { expoPushToken } = useContext(NotificationContext);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (data) => {
      if (data) {
        try {
          console.log("DATA OK");
          setCurrentUserId(data.uid);
          await AsyncStorage.getItem("proyectId").then((value) => {
            if (value) {
              setProyectId(JSON.parse(value));
              takeUsers(JSON.parse(value));
            }
          });
        } catch (error) {
          console.log("Error" + error);
        }
      } else {
        console.log("NO DATA");
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    if (!nombre) return Alert.alert("", "Ingrese un nombre");
    if (!email) return Alert.alert("", "Ingrese el e-mail");
    if (!password) return Alert.alert("", "Ingrese la contraseña");
    if (proyectId.length > 0 && proyectId.length < 6)
      return Alert.alert("", "Verifique el Id del proyecto");

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in!");
        const useruid = userCredential.user.uid;
        let currentProyectId;
        proyectId
          ? (currentProyectId = proyectId)
          : (currentProyectId = useruid);
        !proyectId && setProyectId(useruid);
        AsyncStorage.setItem("proyectId", JSON.stringify(currentProyectId));
        setCurrentUserId(useruid);
        setDoc(doc(db, "Registros", currentProyectId, "Users", useruid), {
          Nombre: nombre,
          Uid: useruid,
          Mail: email,
          Token: expoPushToken,
        });
        takeUsers(currentProyectId);
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = error.toString();
        console.log("Error2" + errorMessage);
        if (
          errorMessage == "FirebaseError: Firebase: Error (auth/invalid-email)."
        ) {
          Alert.alert("", "Escriba correctamente el e-mail");
        } else if (
          errorMessage ==
          "FirebaseError: Firebase: Error (auth/user-not-found)."
        ) {
          Alert.alert("", "Usuario no encontrado");
        } else if (
          errorMessage ==
          "FirebaseError: Firebase: Error (auth/wrong-password)."
        ) {
          Alert.alert("", "Contraseña incorrecta");
        } else if (
          errorMessage ==
          "FirebaseError: Firebase: Error (auth/internal-error)."
        ) {
          Alert.alert(
            "",
            "Se encontró un error inesperado. Por favor reintente"
          );
        } else if (
          errorMessage ==
          "FirebaseError: Firebase: Error (auth/network-request-failed)."
        ) {
          Alert.alert(
            "",
            "No se pudo conectar al servidor. Chequee su conexión a internet y reintente"
          );
        } else {
          Alert.alert(errorMessage);
        }
      });
  };
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        {/* <Image source={fondo} style={[styles.image, StyleSheet.absoluteFill]} /> */}
        <View contentContainerStyle={styles.blurview}>
          <View style={styles.login}>
            <View>
              <Text style={styles.titulo}>Registro de Gastos</Text>
            </View>
            <View>
              <Text style={styles.tituloinput}>Nombre</Text>
              <TextInput
                value={nombre}
                onChangeText={(text) => setNombre(text.trim())}
                style={styles.input}
                placeholder="Nombre"
              />
            </View>
            <View>
              <Text style={styles.tituloinput}>E-mail</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                style={styles.input}
                placeholder="E-mail"
                autoCapitalize="none"
              />
            </View>
            <View>
              <Text style={styles.tituloinput}>Contraseña</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <View>
              <Text style={styles.tituloinput}>Id del proyecto</Text>
              <TextInput
                value={proyectId}
                onChangeText={(text) => setProyectId(text)}
                style={styles.input}
                placeholder="Id (opcional)"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={styles.textbutton}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  blurview: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: heightY * 0.06,
    fontWeight: "800",
    color: "#1F4690",
    marginBottom: 30,
    textAlign: "center",
  },
  tituloinput: {
    fontSize: heightY * 0.027,
    fontWeight: "400",
    color: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.3,
  },
  login: {
    height: heightY * 0.8,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
    fontSize: heightY * 0.023,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#1F4690",
    marginTop: 30,
  },
  textbutton: {
    fontSize: heightY * 0.026,
    fontWeight: "400",
    color: "white",
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
