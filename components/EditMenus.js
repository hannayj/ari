import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import firebase from '../util/firebase'

export default function EditMenus({ route, navigation }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            //console.log(data)
            //const newData = Object.keys(data).map( key => ({ key, ...data[key]}))
            //console.log(newData)
            //const prods = Object.values(data);
            const prods = Object.keys(data).map( key => ({ key, ...data[key]}))
            console.log(prods)
            setItems(prods)
        })
    }, [])

    const editItem = () => {
        console.log('Hello')
    }

    return (
        <View style={styles.container}>
            <Text>Menus</Text>
            <FlatList 
                keyExtractor={(item, index) => String(index)}
                data={items}
                renderItem={({ item, index }) =>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>{item.name}</Text>
                        <Text style={styles.listItemText} onPress={() => navigation.navigate('Edit Recipe', { item: item })}>Edit recipe</Text>
                    </View>
                }
            />
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
    containerButtons: {
        margin: 5,
    },
    listItem: {
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItemText: {
        fontSize: 18,
    },
});