import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function LoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='small' color='#704270' />
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
});