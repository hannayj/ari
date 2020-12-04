import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CreateShoppingList({ route }) {
    return (
        <View style={styles.container}>
            <Text>ShoppingList</Text>
            
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