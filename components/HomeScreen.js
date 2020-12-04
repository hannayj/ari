import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <View>
                <Button
                    title='Add new recipe'
                    onPress={() => navigation.navigate('Recipes')}
                />
                <Button
                    title='Edit menus'
                    onPress={() => navigation.navigate('Menus')}
                />
                <Button
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
        justifyContent: 'center',
    },
    containerButtons: {
        margin: 5,
    }
});