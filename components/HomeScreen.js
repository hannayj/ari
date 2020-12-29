import React from 'react';
//import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, Button} from 'react-native';
import { color } from 'react-native-reanimated';
//import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Welcome!</Text>
            <View style={styles.containerButtons}>
                <Button
                    color='#704270'
                    title='Add new recipe'
                    onPress={() => navigation.navigate('Recipes')}
                />
                <Button
                    color='#704270'
                    title='Edit menus'
                    onPress={() => navigation.navigate('Menus')}
                />
                <Button
                    color='#704270'
                    title='Create shopping list'
                    onPress={() => navigation.navigate('Shopping list')}
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
        justifyContent: 'flex-start',
    },
    containerButtons: {
        margin: 5,
    },
    h1: {
        fontSize: 24,
        backgroundColor: '#704270',
        color: 'white',
        width: '100%',
        padding: 10,
        textAlign: 'center',
        marginBottom: 10
    }   
});