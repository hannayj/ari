import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SectionList, ImageBackground, Platform, Alert } from 'react-native';
import firebase from '../util/firebase'
import LoadingView from './LoadingView'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function EditRecipe({ route, navigation }) {
    const { item } = route.params
    const [recipe, setRecipe] = useState(item)
    const [loading, setLoading] = useState(false)
    const [imgUri, setImgUri] = useState(Array.isArray(recipe.image) ? recipe.image[0] : recipe.image)

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

    /*change recipe's image. If image picked already from the media library, alert asks 
    if you want to pick another or restore default image*/
    const changeImage = () => {
        if (Array.isArray(recipe.image)) {
            Alert.alert(
                'Change image',
                'What would you like to do?',
                [
                    {
                        text: 'Pick new image',
                        onPress: () => {
                            console.log('Pick new image pressed')
                            pickImage()
                        }
                    },
                    {
                        text: 'Restore default image',
                        onPress: () => {
                            console.log('Restore default image pressed');
                            setRecipe({ ...recipe, image: recipe.image[1] })
                            firebase.database().ref('items/').child(recipe.key).update(
                                {
                                    'image': recipe.image[1],
                                }
                            )
                            setImgUri(recipe.image[1])
                        }
                    }
                ],
            );
        } else {
            pickImage()
        }
    }

    //permission to use media library
    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    //choose picture from the devices media library
    const pickImage = async () => {

        Alert.alert

        getPermissionAsync()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result.uri);

        if (!result.cancelled) {
            let image = result.uri
            let imageArray = []

            /*if image has been picked already from the media library for this item
            then the previous picture is overwritten*/
            if (Array.isArray(recipe.image)) {
                imageArray = [image, recipe.image[1]]
                console.log('imageArray in array', imageArray)

                /* if there is only the default picture, recipe.image is turned into an array and
                the chosen picture form media library is placed first into array*/
            } else {
                imageArray = [image, recipe.image]
                console.log('imageArray in single', imageArray)
            }

            // set recipe and update new picture uri to database
            setRecipe({ ...recipe, image: imageArray })
            firebase.database().ref('items/').child(recipe.key).update(
                {
                    'image': imageArray,
                }
            )

            // show new image
            setImgUri(imageArray[0])
        }
    };

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
                        source={{ uri: imgUri }}
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

                <Button
                    color='#704270'
                    title='CHANGE IMAGE'
                    onPress={changeImage}
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