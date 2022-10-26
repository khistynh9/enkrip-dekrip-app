import React from 'react';
import { TouchableOpacity } from 'react-native';
//
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dekrip, Enkrip, Info } from './src/screens';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
MaterialCommunityIcons.loadFont();

const Screen = () => {
  return (
    <>
      <Tab.Navigator
       tabBarOptions={{
         labelStyle:{fontSize:12},
         indicatorStyle:{
           backfroundColor:'#1E3264',
         },
         activeTintColor:'#1E3264',
         inactiveTintColor:'black'
       }}
      >
        <Tab.Screen name="Encrypt" component={Enkrip}/>
        <Tab.Screen name="Decrypt" component={Dekrip}/>
      </Tab.Navigator>
    </>
  );
};

const CustomMenu = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('App Info')}
      style={{ marginHorizontal: 20 }}
    >
    <MaterialCommunityIcons name="information" size={30} style={{ color: 'grey' }} />
    </TouchableOpacity>
  );
};

export default function App(){
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen 
         name="Screen"
         component={Screen}
         options={{
           headerTitle: "Encrypt and Decrypt App",
           headerStyle:{
             elevation:0,
           },
           headerRight: () => (<CustomMenu />)
           
         }}
        />
        <Stack.Screen name="App Info" component={Info} />
      </Stack.Navigator>
    </>

  );
};
