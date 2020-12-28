import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import firebase from '../util/firebase'

export default function EditIngredients({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [weekday, setWeekday] = useState(item.weekday || null)
    const [weeknumber, setWeeknumber] = useState(item.weeknumber || null)
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
        if (item.weekday == null || item.weeknumber == null) {
            firebase.database().ref('items/').child(recipe.key).set({
                'name': name,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image': recipe.image,
                'weekday': weekday,
                'weeknumber': weeknumber
            })
        } else {
            firebase.database().ref('items/').child(recipe.key).update(
                {
                    'name': name,
                    'ingredients': recipe.ingredients,
                    'instructions': recipe.instructions,
                    'image': recipe.image,
                    'weekday': weekday,
                    'weeknumber': weeknumber
                }
            )
        }
        Alert.alert('Changes saved to database')
        navigation.navigate('Edit Instructions', { item: recipe })
    }

    const cancel = () => {
        setRecipe(recipe)
        navigation.navigate('Edit Recipe', { item: recipe })
    }

    return (
        <View style={styles.container}>
                
                <TextInput
                    style={styles.listInput}
                    onChangeText={name => setName(name)}
                    defaultValue={recipe.name}  
                />
                <Text>Ingredients:</Text>
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
                    title='SAVE CHANGES'
                    onPress={saveItem}
                />
                <Button
                    title='CANCEL'
                    onPress={cancel}
                />
            </View>

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