import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen'
import AddNewRecipe from './components/AddNewRecipe'
import EditMenus from './components/EditMenus'
import CreateShoppingList from './components/CreateShoppingList'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Recipes' component={AddNewRecipe} />
        <Stack.Screen name='Menus' component={EditMenus} />
        <Stack.Screen name='Shopping list' component={CreateShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
