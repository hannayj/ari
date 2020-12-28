import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function RadioButton(props) {
    const [value, setValue] = useState(props.weekday || props.weeknumber)

    const setStates = (item) => {
        console.log(item)
        setValue(item)
        props.change(item)
    }

    return (
        <View>
            <Text> Selected: {value} </Text>
            {/*console.log('props', props)}
            {console.log('weekday', props.weekday)*/}
            {props.items.map(item => {
                return (
                    <View key={item.value} style={styles.container}>
                        <Text style={styles.radioText}>{item.label}</Text>
                        <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => setStates(item.value)}>
                            {value === item.value && <View style={styles.selectedRb} />}
                        </TouchableOpacity>
                    </View>
                );
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioText: {
        marginRight: 35,
        fontSize: 18,
        color: '#000',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#000',
    },
});