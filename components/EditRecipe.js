import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, SectionList } from 'react-native';
import firebase from '../util/firebase'

export default function EditRecipe({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            //console.log(data)
            const prods = Object.keys(data).map(key => ({ key, ...data[key] })).filter(i => i.key === item.key)
            //console.log('prod', prods[0])
            //console.log('item', item)
            setRecipe(prods[0])
        })
    }, [])

    const DATA = [
        {
            title: 'Ingredients',
            data: recipe.ingredients
        },
        {
            title: 'Instructions',
            data: recipe.instructions
        },
        {
            title: 'Menu Info',
            data: ['Weekday: ' + recipe.weekday, 'Weeknumber:' + recipe.weeknumber] || null
        },
    ]

    const Item = ({ item }) => (
        <View>
            <Text>{item}</Text>
        </View>
    )


    return (
        <SafeAreaView style={styles.container}>
            {console.log(DATA)}
            <Text>Recipe of {recipe.name}</Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title='EDIT RECIPE'
                    onPress={() => navigation.navigate('Edit Ingredients', { item: recipe })}
                />
                <Button
                    title='GO BACK'
                    onPress={() => navigation.navigate('Menus')}
                />
            </View>
        </SafeAreaView>
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