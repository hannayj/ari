import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Keyboard, Image, FlatList, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function AddNewRecipe({ route }) {
    const [url, setUrl] = useState('')
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        instructions: [],
        image: 'www'
    })
    const key = Constants.manifest.extra.apiKey

    const fetchRecipeInfo = () => {
        fetch('https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi', {
            method: "POST",
            headers: {
                'content-type': 'application/xml',
                'x-rapidapi-key': key,
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

    const editInstructions = () => {

    }

    const saveToDatabase = () => {

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
                        renderItem={({ item }) =>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>{item}</Text>
                                <Text style={styles.listItemText}>Edit</Text>
                            </View>
                        }
                    />
                    <Text>Instructions:</Text>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        data={recipe.instructions}
                        renderItem={({ item }) =>
                            <View>
                                <Text style={styles.listItemText}>{item}</Text>
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
                            onPress={saveToDatabase}
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
    listItem: {
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItemText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

});