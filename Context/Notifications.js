import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useContext,
} from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { UserContext } from "../Context/UserContext";


export const NotificationContext = createContext();
export const NotificationsProvider = ({ children }) => {
  
  
  const { currentUserId, users } = useContext(UserContext);

  async function sendPushNotification({ gasto, monto }) {
    const currentUser = users.filter((user) => user.Uid === currentUserId);
    const nocurrentUser = users.filter((user) => user.Uid !== currentUserId);
    nocurrentUser.map(async (user) => {
      const message = {
        to: user.Token,
        sound: "default",
        title: `${currentUser[0].Nombre} actualizó los gastos`,
        body: `en ${gasto.Categoria} por ${monto}`,
        data: { someData: "goes here" },
      };
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    });
  }

  
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       // console.log(response);
  //     });
  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <NotificationContext.Provider
      value={{
        // expoPushToken,
        // notification,
        sendPushNotification,
        // setExpoPushToken,
        // registerForPushNotificationsAsync
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
