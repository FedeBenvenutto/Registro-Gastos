import React, {useState} from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import { Button } from '@rneui/themed';
import { db } from '../database/firebase.js';
import { addDoc, collection} from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown'

const Nuevogasto = (props) => {
    const [gasto, setGasto]= useState({
      Monto: "",
      Categoria: "",
      FormadePago: "",
      Comentario: "",
      CategoriaIndex: "",
      FormadePagoIndex: ""

    });
    const saveNewGasto = async () => {
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
            CategoriaIndex: gasto.CategoriaIndex,
            FormadePagoIndex: gasto.FormadePagoIndex,
            createdAt: new Date()
          });
          setGasto({
            Monto: "",
            Categoria: "",
            FormadePago: "",
            Comentario: "",
            CategoriaIndex: "",
            FormadePagoIndex: ""
           })
          alert("Agregado");
        } catch (e) {
          console.log(e)
          alert(e)} } };

      const categorias = [
            'Salud',
            'Supermercado',
            'Niñera/Limpieza',
            'Colegio',
            'Verdulería',
            'Impuestos',
            'Pago Tarjeta de Crédito',
            'Ropa',
            'Carnicería',
            'Librería',
            'Otros gastos'
        ];
        
    // const categorias = [
    //     {key:'1',value:'Salud'},
    //     {key:'2',value:'Supermercado'},
    //     {key:'3',value:'Niñera/Limpieza'},
    //     {key:'4',value:'Colegio'},
    //     {key:'5',value:'Verdulería'},
    //     {key:'6',value:'Impuestos'},
    //     {key:'7',value:'Pago Tarjeta de Crédito'},
    //     {key:'8',value:'Ropa'},
    //     {key:'9',value:'Carnicería'},
    //     {key:'10',value:'Librería'},
    //     {key:'11',value:'Otros gastos'}
    // ];
  //   const formadePago = [
  //     {key:'1',value:'Tarjeta de Crédito'},
  //     {key:'2',value:'Tarjeta de Débito'},
  //     {key:'3',value:'Efectivo'},
  //     {key:'4',value:'Billetera Santa Fe con descuesto'},
  //     {key:'5',value:'Billetera Santa Fe sin descuesto'},
  //     {key:'6',value:'Personal Pay con descuento '},
  //     {key:'7',value:'Donaciones'},
  //     {key:'8',value:'Otros'},
  // ]
    const formadePago = [
        'Tarjeta de Crédito',
        'Tarjeta de Débito',
        'Efectivo',
        'Billetera Santa Fe',
        'Personal Pay con descuento ',
        'Donaciones',
        'Otros',
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
          value={gasto.Monto}
          onChangeText={(value) => setGasto({...gasto, "Monto": value}) }
        ></TextInput>
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Categoría</Text>
        <SelectDropdown 
        data={categorias}
        onSelect={(selectedItem, index) => {
          setGasto({...gasto, "Categoria": selectedItem, "CategoriaIndex": index})
        }}
        buttonStyle={styles.dropdown}
        defaultValueByIndex={gasto.CategoriaIndex}
        // boxStyles={{marginStart: 65}}
        // defaultValueByIndex= {""}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Forma de pago </Text>
        <SelectDropdown
        data={formadePago}
        buttonStyle={styles.dropdown}
        onSelect={(selectedItem, index) => {
          setGasto({...gasto, "FormadePago": selectedItem, "FormadePagoIndex": index})
        }}
        // defaultValueByIndex= "2"
        // {gasto.FormadePagoIndex}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.diasyhorarios}>
        <Text style={styles.textdias}> Comentario</Text>
        <TextInput
          style={styles.input3}
          multiline
          name="precioHora"
          value={gasto.Comentario}
          onChangeText={(value) => setGasto({...gasto, "Comentario": value})}
        ></TextInput>
      </SafeAreaView>
      <View style={styles.buttton}>
      <Button 
      containerStyle={styles.buttton}
      title="Agregar"
      onPress={()=> saveNewGasto()} 
      /> 
      </View>
      <View style={styles.buttton}>
      <Button 
      containerStyle={styles.buttton}
      // containerStyle={{width: 320, marginHorizontal: 0, marginVertical: 30, alignContent: "center"}}
      title="Ver gastos"
      onPress={()=> props.navigation.navigate("Vergastos")} 
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
      // flex: 1,
      // backgroundColor: "#fff",
      marginTop: 80,
    },
    diasyhorarios: {
      flexDirection: "row",
      // backgroundColor: "#fff",
    //   alignItems: "center",
      // justifyContent: "flex-start",
    //   flex: 1,
    },
    textdias: {
      fontSize: 20,
      // backgroundColor: 'blue',
      width: 200,
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    textdiaserror: {
      fontSize: 17,
      color: "red",
      textAlign: "right",
      width: 200

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
      // margin: 5,
      borderWidth: 0.5,
      padding: 10,
      minWidth: 200,
      // maxWidth: 1000,
      fontSize: 15,
    //   justifyContent: "flex-end",
      // marginStart: 100,
      borderRadius: 10,
    },
    input3: {
      height: 60,
      // margin: 5,
      borderWidth: 0.5,
      padding: 10,
      minWidth: 200,
      maxWidth: 225,
      fontSize: 15,
    //   justifyContent: "flex-end",
      // marginStart: 44.5,
      borderRadius: 10,
      marginTop: 10
    },
    hidden: {
     hidden: false,
     height: 0
    },
    buttton: {
      width: 320, 
      // marginHorizontal: 0, 
      // marginVertical: 30, 
      alignContent: "center",
      marginTop: 10,
      marginStart: 25
      
      // alignItems: 'center'
      // flexDirection: 'row',
      //  justifyContent: "center",
    // justifyContent: 'center',
    //  alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#444',
    },
    buttton2: {
      alignItems:"center",
      marginTop: 0
    },
    dropdown: {
    // flexShrink: 1000,
    // justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#444',
    borderRadius: 10,
    width: 200,
    // position: 'relative',
    // marginEnd: 10,
    alignContent: 'center',
    marginTop: 10
    

    }
  });

export default Nuevogasto