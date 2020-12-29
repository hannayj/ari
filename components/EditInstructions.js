import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import firebase from '../util/firebase'

export default function EditInstructions({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [weekday, setWeekday] = useState(item.weekday || null)
    const [weeknumber, setWeeknumber] = useState(item.weeknumber || null)

    const editInstructions = (index, item) => {
        let instructionsArray = [...recipe.instructions]
        console.log(instructionsArray)
        instructionsArray[index] = item
        console.log({ ...recipe, instructions: instructionsArray })
        setRecipe({ ...recipe, instructions: instructionsArray })
    }

    const saveItem = () => {
        if (item.weekday == null || item.weeknumber == null) {
            firebase.database().ref('items/').child(recipe.key).set({
                'name': recipe.name,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image': recipe.image,
                'weekday': weekday,
                'weeknumber': weeknumber
            })
        } else {
            firebase.database().ref('items/').child(recipe.key).update(
                {
                    'name': recipe.name,
                    'ingredients': recipe.ingredients,
                    'instructions': recipe.instructions,
                    'image': recipe.image,
                    'weekday': weekday,
                    'weeknumber': weeknumber
                }
            )
        }
        Alert.alert('Changes saved to database')
        navigation.navigate('Edit Menu Info', { item: recipe })
    }

    const cancel = () => {
        setRecipe(recipe)
        navigation.navigate('Edit Recipe', { item: recipe })
    }

    return (

        <View style={styles.container}>

            <Text style={styles.h2}>Instructions:</Text>
            <FlatList
                data={recipe.instructions}
                keyExtractor={(item, index) => String(index)}
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
                    color='#704270'
                    title='SAVE CHANGES'
                    onPress={saveItem}
                />
                <Button
                    color='#704270'
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