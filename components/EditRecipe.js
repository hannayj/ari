import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, ScrollView } from 'react-native';
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
    const { index } = route.params
    const { item } = route.params

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
        console.log('Hep')
    }
    
    const saveItem = () => {
        
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text>{item.name}</Text>
                <Text>Ingredients:</Text>
                <FlatList
                    //keyExtractor={index}
                    data={item.ingredients}
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
                    //keyExtractor={index}
                    data={item.instructions}
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
                    onPress={() => navigation.navigate('Menus')}
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