import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Vergastos from './screens/Ver gastos';
import Nuevogasto from './screens/Nuevogasto';

const Stack = createStackNavigator()
function MyStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name= "Nuevogasto" 
      component={Nuevogasto} />
      <Stack.Screen 
      name= "Vergastos" 
      component={Vergastos}/>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
