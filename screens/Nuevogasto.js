import React, { useState,  useContext } from "react";
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
import { db } from "../database/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import SelectDropdown from "react-native-select-dropdown";
import { categorias, formadePago } from "../database/Listas.js";
import { FechaContext } from "../Context/FechaContext.js";


const Nuevogasto = (props) => {
  const {Mes, Ano}= useContext(FechaContext)
  const fechaDb= Mes+"-"+Ano
//   const navigation = useNavigation();
//   useEffect(() => {
//     navigation.setOptions({
//         headerRight: () => <Text onPress={() => props.navigation.navigate("CambioColeccion")}> Mes: {fechaDb}</Text>  
//     })
// },[])
  
  const [gasto, setGasto] = useState({
    Monto: "",
    Categoria: "",
    FormadePago: "",
    Comentario: "",
    CategoriaIndex: "",
    FormadePagoIndex: "",
  });
  const [loading, setLoading] = useState(false);
  const saveNewGasto = async () => {
    if (gasto.Monto === "") {
      Alert.alert("", "Ingrese un monto");
    } else {
      try {
        setLoading(true);
        const docRef = await addDoc(collection(db, fechaDb), {
          Monto: gasto.Monto,
          Categoria: gasto.Categoria,
          FormadePago: gasto.FormadePago,
          Comentario: gasto.Comentario,
          CategoriaIndex: gasto.CategoriaIndex,
          FormadePagoIndex: gasto.FormadePagoIndex,
          createdAt: new Date(),
        });
        setGasto({
          Monto: "",
          Categoria: "",
          FormadePago: "",
          Comentario: "",
          CategoriaIndex: "",
          FormadePagoIndex: "",
        });
        setLoading(false);
        Alert.alert("", "Agregado");
      } catch (e) {
        alert(e);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    
    <View style={styles.container}>
      <Text 
      style={styles.fechaDb} 
      onPress={() => props.navigation.navigate("CambioColeccion")}> 
      Mes: {fechaDb} </Text>
      <Text style={styles.titulo}>INGRESO NUEVO GASTO</Text>
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
          defaultButtonText={"Seleccione una opción"}
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
          defaultButtonText={"Seleccione una opción"}
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
          title="Agregar"
          onPress={() => saveNewGasto()}
        />
      </View>
      <View style={styles.buttton}>
        <Button
          containerStyle={styles.buttton}
          title="Ver gastos"
          onPress={() => props.navigation.navigate("Vergastos")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fechaDb:{
    position: 'absolute',
    marginTop: 0,
    textAlign: 'right',
    width: '100%',
    fontSize: 16
    
    
  },
  titulo: {
    marginTop: 80,
    alignItems: "center",
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    color: "blue",
    marginBottom: 50,
  },
  container: {
    marginTop: 0,
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

export default Nuevogasto;
