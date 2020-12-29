import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList, Pressable } from 'react-native';
import firebase from '../util/firebase'

export default function EditMenus({ route, navigation }) {
    const [items, setItems] = useState([])
    const [week1, setWeek1] = useState([])
    const [week2, setWeek2] = useState([])
    const [week3, setWeek3] = useState([])
    const [week4, setWeek4] = useState([])
    const [week5, setWeek5] = useState([])
    const [week6, setWeek6] = useState([])
    const days = {'Monday': 0, 'Tuesday': 1,'Wednesday' : 2, 'Thursday': 3, 'Friday': 4, 'Saturday' : 5, 'Sunday': 6}

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val()
            //console.log(data)
            //const prods = Object.values(data);
            const prods = Object.keys(data).map(key => ({ key, ...data[key] }))
            //console.log(prods)
            setItems(prods)
            setWeek1(filterAndSortWeeks(prods.filter(i => i.weeknumber == 1).map(i => i.weekday + ': ' + i.name)))
            setWeek2(filterAndSortWeeks(prods.filter(i => i.weeknumber == 2).map(i => i.weekday + ': ' + i.name)))
            setWeek3(filterAndSortWeeks(prods.filter(i => i.weeknumber == 3).map(i => i.weekday + ': ' + i.name)))
            setWeek4(filterAndSortWeeks(prods.filter(i => i.weeknumber == 4).map(i => i.weekday + ': ' + i.name)))
            setWeek5(filterAndSortWeeks(prods.filter(i => i.weeknumber == 5).map(i => i.weekday + ': ' + i.name)))
            setWeek6(filterAndSortWeeks(prods.filter(i => i.weeknumber == 6).map(i => i.weekday + ': ' + i.name)))
        })
    }, [])

    const filterAndSortWeeks = (list) => {
        // temporary array holds objects with position and sort-value
        var mapped = list.map(function (el, i) {
            return { index: i, value: el };
        })

        // sorting the mapped array containing the reduced values
        mapped.sort(function (a, b) {
            let x = a.value.split(': ')
            let y = b.value.split(': ')
            //console.log(x[0])
            return days[x[0]] - days[y[0]];
        });

        // container for the resulting order
        var result = mapped.map(function (el) {
            return list[el.index];
        });

        return result
    }

    const DATA = [
        {
            title: 'Week 1',
            data: week1
        },
        {
            title: 'Week 2',
            data: week2
        },
        {
            title: 'Week 3',
            data: week3
        },
        {
            title: 'Week 4',
            data: week4
        },
        {
            title: 'Week 5',
            data: week5
        },
        {
            title: 'Week 6',
            data: week6
        },
    ]

    const Item = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('Edit Recipe', { item: items.find(i => i.weekday + ': ' + i.name == item) })}>
            <View style={styles.listItem}>
                {/*console.log('item', item)*/}
                <Text style={styles.listItem}>{item}</Text>
            </View>
        </Pressable>
    )

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '95%',
                    backgroundColor: '#CED0CE'
                }}
            />
        )
    }

    return (

        <View style={styles.container}>
            {/*console.log('data', DATA)}
        {console.log('week1', week1)*/}

            <Text>Menus</Text>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={listSeparator}
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
        justifyContent: 'space-between',
        margin: 5,
    },
    listItemText: {
        fontSize: 18,
    },
});