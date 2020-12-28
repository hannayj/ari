import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen'
import AddNewRecipe from './components/AddNewRecipe'
import EditMenus from './components/EditMenus'
import CreateShoppingList from './components/CreateShoppingList'
import EditRecipe from './components/EditRecipe'
import EditIngredients from './components/EditIngredienst'
import EditInstructions from './components/EditInstructions'
import EditMenuInfo from './components/EditMenuInfo'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Recipes' component={AddNewRecipe} />
        <Stack.Screen name='Menus' component={EditMenus} />
        <Stack.Screen name='Edit Recipe' component={EditRecipe} />
        <Stack.Screen name='Edit Ingredients' component={EditIngredients} />
        <Stack.Screen name='Edit Instructions' component={EditInstructions} />
        <Stack.Screen name='Edit Menu Info' component={EditMenuInfo} />
        <Stack.Screen name='Shopping list' component={CreateShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
