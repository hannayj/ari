import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Keyboard, Image, FlatList, SafeAreaView, ScrollView } from 'react-native';
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

export default function AddNewRecipe({ route, navigation }) {

    const emptyRecipe = {
        name: '',
        ingredients: [],
        instructions: [],
        image: 'www'
    }

    const [url, setUrl] = useState('')
    const [recipe, setRecipe] = useState(emptyRecipe)
    //const [modifiedRecipe, setModifiedRecipe] = useState(recipe)
    const [items, setItems] = useState([])
    //const [modifiedIngredient, setModifiedIngredient] = useState('')

    /*useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            //const prods = Object.values(data);
            //console.log(prods)
            //setItems(prods)
        })
    }, [])*/

    const saveItem = () => {
        firebase.database().ref('items/').push(
            {
                'name': recipe.name,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image': recipe.image
            }
        )
        //updateList()
        setRecipe(emptyRecipe)
        setUrl('')
        Alert.alert('Recipe saved')
    }

    const updateList = () => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            const prods = Object.values(data);
            setItems(prods)
        })
    }

    const fetchRecipeInfo = () => {
        fetch('https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi', {
            method: "POST",
            headers: {
                'content-type': 'application/xml',
                'x-rapidapi-key': Constants.manifest.extra.apiKey,
                'x-rapidapi-host': 'mycookbook-io1.p.rapidapi.com'
            },
            body: url
        })
            .then(response => response.json())
            .then(data => {
                console.log('start', data[0].name)
                console.log(data[0].ingredients)
                console.log(data[0].instructions[0].steps)
                console.log(data[0].images[0])

                setRecipe({
                    name: data[0].name,
                    ingredients: data[0].ingredients,
                    instructions: data[0].instructions[0].steps,
                    image: data[0].images[0]
                })
                Keyboard.dismiss()
                //setUrl('')
            })

            .catch(error => {
                Alert.alert('Error', error);
            });
    }

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

    const editInstructions = () => {
    }


    if (recipe.name == '') {
        return (
            <View style={styles.container}>
                <Text>Fetch new recipe by giving the URL of the recipe</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={url => setUrl(url)}
                    value={url}
                />
                <Button
                    title='FETCH'
                    onPress={fetchRecipeInfo}
                />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text>{recipe.name}</Text>
                    <Text>Ingredients:</Text>
                    <FlatList
                        style={styles.flatList}
                        keyExtractor={(item, index) => String(index)}
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
                        keyExtractor={(item, index) => String(index)}
                        data={recipe.instructions}
                        renderItem={({ item, index }) =>
                            <View>
                                <Text style={styles.listItemText}>{index + 1}. {item}</Text>
                            </View>
                        }
                    />
                    <Image source={{ uri: recipe.image }} style={{ width: 200, aspectRatio: 1 }} />
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Edit instuctions'
                            onPress={editInstructions}
                        />
                        <Button
                            title='Save recipe'
                            onPress={saveItem}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
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
        height: 30,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
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