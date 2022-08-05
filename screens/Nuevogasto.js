import React, {useState} from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';
import SelectList from 'react-native-dropdown-select-list';
import { db } from '../database/firebase.js';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';

const Nuevogasto = () => {
    const [selected1, setSelected1] = useState("");
    const [selected2, setSelected2] = useState("");
    const [gasto, setGasto]= useState({
      Monto: "",
      Categoria: "",
      FormadePago: "",
      Comentario: "",
    });
    const saveNewGasto = async () => {
      alert("hoola")
      if (gasto.Monto === "") {
        alert("Ingrese un monto");
      } else {
        try {
          const docRef = await addDoc(collection(db, "Agosto"),
          {
            Monto: gasto.Monto,
            Categoria: gasto.Categoria,
            FormadePago: gasto.FormadePago,
            Comentario: gasto.Comentario,
          });
          alert("Agregado");
        } catch (e) {
          console.log(e)
          alert(e)} } };
        
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
  return (
    
    <View style={styles.container}>
      <Text style={styles.titulo}>INGRESO NUEVO GASTO</Text>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Monto</Text>
        <TextInput
          style={styles.input2}
          keyboardType= "numeric"
          name="Monto"
          placeholder="0"
          onChangeText={(value) => setGasto({...gasto, "Monto": value}) }
        ></TextInput>
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Categoría</Text>
        <SelectList 
        search={false}
        setSelected={setSelected1} 
        data={categorias} 
        onSelect={() => setGasto({...gasto, "Categoria": selected1})} 
        boxStyles={{marginStart: 65}}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Forma de pago </Text>
        <SelectList 
        search={false}
        setSelected={setSelected2} 
        data={formadePago} 
        onSelect={() => setGasto({...gasto, "FormadePago": selected2})}
        boxStyles={{marginStart: 5, marginTop: 5}}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Comentario</Text>
        <TextInput
          style={styles.input3}
          multiline
          name="precioHora"
          // placeholder="0"
          onChangeText={(value) => setGasto({...gasto, "Comentario": value})}
        ></TextInput>
      </SafeAreaView>
      <View style={styles.buttton}>
      <Button 
      containerStyle={{width: 320, marginHorizontal: 0, marginVertical: 30, alignContent: "center"}}
      title="Agregar"
      onPress={()=> saveNewGasto()} 
      // onPress={()=> {saveNewGasto}} 
      /> 
      </View>
    </View>
  )
}

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
      flex: 1,
      // backgroundColor: "#fff",
      marginTop: 80,
    },
    diasyhorarios: {
      flexDirection: "row",
      // backgroundColor: "#fff",
    //   alignItems: "center",
      justifyContent: "flex-start",
    //   flex: 1,
    },
    textdias: {
      fontSize: 20,
    },
    textdiaserror: {
      fontSize: 17,
      color: "red",
      textAlign: "right",
    },
    input: {
        height: 50,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        minWidth: 170,
        maxWidth: 1000,
        fontSize: 15,
      //   justifyContent: "flex-end",
        marginStart: 0
  
      },
    input2: {
      height: 50,
      margin: 5,
      borderWidth: 0.5,
      padding: 10,
      minWidth: 155,
      // maxWidth: 1000,
      fontSize: 15,
    //   justifyContent: "flex-end",
      marginStart: 100,
      borderRadius: 10,
    },
    input3: {
      height: 60,
      margin: 5,
      borderWidth: 0.5,
      padding: 10,
      minWidth: 155,
      maxWidth: 225,
      fontSize: 15,
    //   justifyContent: "flex-end",
      marginStart: 44.5,
      borderRadius: 10,
    },
    hidden: {
     hidden: false,
     height: 0
    },
    buttton: {
      flexDirection: 'row',
      justifyContent: "center",
  
    },
    buttton2: {
      alignItems:"center",
      marginTop: 10
    },
  });

export default Nuevogasto