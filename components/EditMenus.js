import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: Constants.manifest.extra.dbKey,
    authDomain: "rn-ari.firebaseapp.com",
    databaseURL: "https://rn-ari-default-rtdb.firebaseio.com",
    projectId: "rn-ari",
    storageBucket: "rn-ari.appspot.com",
    messagingSenderId: "746753334312",
}

//Initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function EditMenus({ route, navigation }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            //console.log(data)
            const prods = Object.values(data);
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
                        <Text style={styles.listItemText} onPress={() => navigation.navigate('Edit Recipe', { index: index, item: item })}>Edit recipe</Text>
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