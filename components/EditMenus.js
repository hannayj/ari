import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, Button, SectionList } from 'react-native';
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

    const DATA = [
        {
            title: 'Week 1',
            data: items.filter(i => i.weeknumber == 1).map(i => i.weekday + ': ' + i.name)
        },
        {
            title: 'Week 2',
            data: items.filter(i => i.weeknumber == 2).map(i => i.weekday + ': ' + i.name)
        },
        {
            title: 'Week 3',
            data: items.filter(i => i.weeknumber == 3).map(i => i.weekday + ': ' + i.name)
        },
        {
            title: 'Week 4',
            data: items.filter(i => i.weeknumber == 4).map(i => i.weekday + ': ' + i.name)
        },
        {
            title: 'Week 5',
            data: items.filter(i => i.weeknumber == 5).map(i => i.weekday + ': ' + i.name)
        },
        {
            title: 'Week 6',
            data: items.filter(i => i.weeknumber == 6).map(i => i.weekday + ': ' + i.name)
        },
    ]

    const Item = ({ item }) => (
        <View style={styles.listItem}>
            {console.log('item', item)}
            <Text style={styles.listItem}>{item}</Text>
            <Text style={styles.listItemText} onPress={() => navigation.navigate('Edit Recipe', { item: items.find(i => i.weekday + ': ' + i.name == item) })}>Edit recipe</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {/*console.log('data', DATA)}
            {console.log('week1', week1)*/}
            
            <Text>Menus</Text>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                )}
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