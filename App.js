import React, { useContext, useState, useEffect, useRef } from "react";
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
import { NotificationContext, NotificationsProvider } from "./Context/Notifications";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();
function MyStack({expoPushToken}) {
  const { currentUserId } = useContext(UserContext);
  if (!currentUserId) {
    return <Login expoPushToken={expoPushToken} />;
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
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");

  async function registerForPushNotificationsAsync() {
    let token;
    console.log(Platform.OS === "android")
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Hubo un error en los permisos de la notificaciones");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }


    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  return (
    <UserProvider>
      <NotificationsProvider>
        <FechaProvider>
          <NavigationContainer>
            <MyStack expoPushToken={expoPushToken} />
          </NavigationContainer>
        </FechaProvider>
      </NotificationsProvider>
    </UserProvider>
  );
}