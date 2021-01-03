import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Keyboard } from 'react-native';
import firebase from '../util/firebase'
import Constants from 'expo-constants';

export default function AddNewRecipe({ route, navigation }) {
    const [url, setUrl] = useState('')

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
                /*console.log('start', data[0].name)
                console.log(data[0].ingredients)
                console.log(data[0].instructions[0].steps)
                console.log(data[0].images[0])*/

                const recipe = {
                    name: data[0].name,
                    ingredients: data[0].ingredients,
                    instructions: data[0].instructions[0].steps,
                    image: data[0].images[0],
                    weekday: null,
                    weeknumber: null
                }
                Keyboard.dismiss()
                saveItem(recipe)
            })

            .catch(error => {
                Alert.alert('Error', error);
            });
    }

    const saveItem = (recipe) => {
        //console.log(recipe)
        firebase.database().ref('items/').push(
            {
                'name': recipe.name,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image': recipe.image,
                'weekday': null,
                'weeknumber': null
            }
        )
        getKey()
    }

    const getKey = () => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            //console.log(data)
            const prods = Object.keys(data).map(key => ({ key, ...data[key] }))
            //console.log('prod', prods[prods.length - 1])

            Alert.alert('Recipe saved')
            navigation.navigate('Recipe', { item: prods[prods.length - 1] })
        }
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add new recipe by giving the URL of the recipe</Text>
            <TextInput
                style={styles.input}
                onChangeText={url => setUrl(url)}
                value={url}
            />
            <Button
                color='#704270'
                title='ADD'
                onPress={fetchRecipeInfo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        width: '95%',
        height: 30,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
    },
    text: {
        fontSize: 18,
    }
});