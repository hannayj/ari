import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import firebase from '../util/firebase'
import RadioButton from './RadioButton'

export default function EditMenuInfo({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [weekday, setWeekday] = useState(item.weekday || null)
    const [weeknumber, setWeeknumber] = useState(item.weeknumber || null)

    const days = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' }
    ]

    const weeks = [
        { label: 'Week 1', value: 1 },
        { label: 'Week 2', value: 2 },
        { label: 'Week 3', value: 3 },
        { label: 'Week 4', value: 4 },
        { label: 'Week 5', value: 5 },
        { label: 'Week 6', value: 6 },
    ]

    const change = (e) => {
        //console.log('e', e)
        if (typeof e === 'string' || e instanceof String) {
            setWeekday(e)
            //console.log('weekday', e)
        } else {
            setWeeknumber(e)
            //console.log('weeknumber', e)
        }
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
        navigation.navigate('Edit Recipe', { item: recipe })
    }

    const cancel = () => {
        setRecipe(recipe)
        navigation.navigate('Edit Recipe', { item: recipe })
    }

    return (

        <View style={styles.container}>

            <Text>Choose weekday</Text>
            <RadioButton items={days} weekday={weekday} change={change} />
            <Text>Choose weeknumber</Text>
            <RadioButton items={weeks} weeknumber={weeknumber} change={change} />

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