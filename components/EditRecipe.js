import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: Constants.manifest.extra.dbKey,
    authDomain: "rn-ari.firebaseapp.com",
    databaseURL: "https://rn-ari-default-rtdb.firebaseio.com",
    projectId: "rn-ari",
    storageBucket: "rn-ari.appspot.com",
    messagingSenderId: "746753334312",
}

//Initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default function EditRecipe({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)

    const editItem = (index, item) => {
        //console.log(index)
        let ingredientsArray = [...recipe.ingredients]
        console.log(ingredientsArray)
        //console.log(...modifiedRecipe)
        //console.log(ingredientsArray[index])
        ingredientsArray[index] = item
        console.log({ ...recipe, ingredients: ingredientsArray })
        setRecipe({ ...recipe, ingredients: ingredientsArray })
    }
    
    const editInstructions = (index, item) => {
        let instructionsArray = [...recipe.instructions]
        console.log(instructionsArray)
        instructionsArray[index] = item
        console.log({ ...recipe, instructions: instructionsArray })
        setRecipe({ ...recipe, instructions: instructionsArray })
    }
    
    const saveItem = () => {
        firebase.database().ref('items/').child(recipe.key).update(
            {
                'name': recipe.name,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image': recipe.image,
            }
        )
        Alert.alert('Changes saved to database')
        navigation.navigate('Menus')
    }

    const cancel = () => {
        setRecipe(item)
        navigation.navigate('Menus')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {console.log('recipe', recipe.name)}
                {console.log('key', recipe.key)}
               
                <Text>{recipe.name}</Text>
                <Text>Ingredients:</Text>
                <FlatList
                    data={recipe.ingredients}
                    renderItem={({ item, index }) =>
                        <View style={styles.listItem}>
                            <TextInput
                                style={styles.listInput}
                                onChangeText={modifiedIngredient => editItem(index, modifiedIngredient)}
                                defaultValue={item}
                            />
                        </View>
                    }
                />
                <Text>Instructions:</Text>
                <FlatList
                    data={recipe.instructions}
                    renderItem={({ item, index }) =>
                        <View style={styles.listItem}>
                            <TextInput
                                style={styles.listInput}
                                multiline={true}
                                onChangeText={modifiedInstructions => editInstructions(index, modifiedInstructions)}
                                defaultValue={item}
                            />
                        </View>
                    }
                />

                <View style={styles.buttonContainer}>
                <Button 
                    title='SAVE CHANGES'
                    onPress={saveItem}
                />
                <Button
                    title='CANCEL'
                    onPress={cancel}
                />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: '95%',
    },
    containerButtons: {
        margin: 5,
    },
    input: {
        width: '95%',
        height: 30,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
    },
    listInput: {
        width: '95%',
        minHeight: 30,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
    },
    listItem: {
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listItemText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});