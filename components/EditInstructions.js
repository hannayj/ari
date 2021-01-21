import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../util/firebase'

export default function EditInstructions({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)

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
                'instructions': recipe.instructions,
            }
        )
        Alert.alert('Changes saved')
        
    }
    
    const nextPage = () => {
        navigation.navigate('Edit Menu Info', { item: recipe })
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
                            title='SAVE'
                            onPress={saveItem}
                        />
                        <Button
                            color='#704270'
                            title='NEXT'
                            onPress={nextPage}
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