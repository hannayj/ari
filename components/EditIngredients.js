import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../util/firebase'

export default function EditIngredients({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [name, setName] = useState(item.name)

    const editIngredients = (index, item) => {
        //console.log(index)
        console.log(item)
        let ingredientsArray = [...recipe.ingredients]
        console.log(ingredientsArray)
        //console.log(...modifiedRecipe)
        //console.log(ingredientsArray[index])
        ingredientsArray[index] = item
        console.log({ ...recipe, ingredients: ingredientsArray })
        setRecipe({ ...recipe, ingredients: ingredientsArray })
    }

    const saveItem = () => {
            firebase.database().ref('items/').child(recipe.key).update(
                {
                    'name': name,
                    'ingredients': recipe.ingredients,
                }
            )
        //Alert.alert('Changes saved to database')
        navigation.navigate('Edit Instructions', { item: recipe })
    }

    const cancel = () => {
        setRecipe(recipe)
        navigation.navigate('Recipe', { item: recipe })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.h2}>Name:</Text>
                    <TextInput
                        style={styles.listInput}
                        onChangeText={name => setName(name)}
                        defaultValue={recipe.name}
                    />
                    <Text style={styles.h2}>Ingredients:</Text>
                    <FlatList
                        data={recipe.ingredients}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) =>
                            <View style={styles.listItem}>
                                <TextInput
                                    style={styles.listInput}
                                    onChangeText={modifiedIngredient => editIngredients(index, modifiedIngredient)}
                                    defaultValue={item}
                                />
                            </View>
                        }
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            color='#704270'
                            title='SAVE CHANGES'
                            onPress={saveItem}
                        />
                        <Button
                            color='#704270'
                            title='BACK TO RECIPE'
                            onPress={cancel}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    h2: {
        fontSize: 20,
        color: '#704270',
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 5
    }
});