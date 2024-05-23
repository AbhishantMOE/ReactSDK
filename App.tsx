import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ListScreen from './ListScreen';
import ListScreen2 from './ListScreen2';
import InApp from './InApp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="List2" component={ListScreen2} />

        <Stack.Screen name="InApp" component={InApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
