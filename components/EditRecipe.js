import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SectionList, ImageBackground } from 'react-native';
import firebase from '../util/firebase'
import LoadingView from './LoadingView'

export default function EditRecipe({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [loading, setLoading] = useState(false)

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
            //data: recipe.ingredients
            data: recipe.ingredients !== undefined ? recipe.ingredients : []
        },
        {
            title: 'Instructions',
            //data: recipe.instructions
            data: recipe.instructions !== undefined ? recipe.instructions : []
        },
        {
            title: 'Menu Info',
            data: ['Weekday: ' + (recipe.weekday !== undefined ? recipe.weekday : ''), 'Weeknumber: ' + (recipe.weeknumber !== undefined ? recipe.weeknumber : '')]
        },
    ]

    const Item = ({ item }) => (
        <View>
            <Text style={styles.listItemText}>{item}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {/*console.log(DATA)*/}


            <SectionList
                ListHeaderComponent={<Text style={styles.h1}>{recipe.name}</Text>}
                ListFooterComponent={
                    <ImageBackground
                        style={styles.image}
                        source={{ uri: item.image, }}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    >
                        {loading && <LoadingView />}
                    </ImageBackground>
                }
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.h2}>{title}</Text>
                )}
                stickySectionHeadersEnabled={false}
            />

            <View style={styles.buttonContainer}>
                <Button
                    color='#704270'
                    title='EDIT RECIPE'
                    onPress={() => navigation.navigate('Edit Ingredients', { item: recipe })}
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
        //marginLeft: 5
    },
    listItemText: {
        fontSize: 18,
        marginBottom: 3,
        marginLeft: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    h1: {
        fontSize: 24,
        backgroundColor: '#704270',
        color: 'white',
        width: '100%',
        padding: 10,
        marginTop: 10
    },
    h2: {
        fontSize: 20,
        color: '#704270',
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 5
    },
    image: {
        minHeight: 300,
        marginTop: 10
    }
});