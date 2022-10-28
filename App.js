import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Vergastos from "./screens/Vergastos";
import Nuevogasto from "./screens/Nuevogasto";
import GastoDetalle from "./screens/GastoDetalle";
import CambioColeccion from "./screens/CambioColeccion";
import Totales from "./screens/Totales";
import { FechaProvider } from "./Context/FechaContext";
import { UserContext, UserProvider } from "./Context/UserContext";
import Login from "./screens/Login";
import { NotificationsProvider } from "./Context/Notifications";

const Stack = createStackNavigator();
function MyStack() {
  const { currentUserId } = useContext(UserContext);
  if (!currentUserId) {
    return <Login />;
  }
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
      <Stack.Screen
        name="Totales"
        component={Totales}
        options={{ title: "Totales" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NotificationsProvider>
        <FechaProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </FechaProvider>
      </NotificationsProvider>
    </UserProvider>
  );
}