import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Vergastos from "./screens/Vergastos";
import Nuevogasto from "./screens/Nuevogasto";
import GastoDetalle from "./screens/GastoDetalle";
import CambioColeccion from "./screens/CambioColeccion";
import {FechaProvider} from "./Context/FechaContext";

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nuevogasto"
        component={Nuevogasto}
        options={{ title: "Nuevo Gasto" }}
      />
      <Stack.Screen
        name="Vergastos"
        component={Vergastos}
        options={{ title: "Ver gastos" }}
      />
      <Stack.Screen
        name="GastoDetalle"
        component={GastoDetalle}
        options={{ title: "Detalle del Gasto" }}
      />
      <Stack.Screen
        name="CambioColeccion"
        component={CambioColeccion}
        options={{ title: "Cambio de fecha" }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <FechaProvider>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </FechaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
