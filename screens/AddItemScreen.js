import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addItem } from '../Data';
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';


const AddItemScreen = ({ route }) => {
    const { username } = route.params;

    const [itemName, setItemName] = useState('');
    const [itemDescr, setItemDescr] = useState('');
    const [itemPrice, setItemPrice] = useState(0.0);
    const [itemCity, setItemCity] = useState('');
    const [images, setImages] = useState([]); // Array to store selected image URIs
    const [profilePicture, setProfilePicture] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
            selectionLimit: 3, // Limit selection to 3 images
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            // Handle multiple selections
            const newImages = result.assets.map((asset) => asset.uri);
            setImages([...images, ...newImages]); // Append new URIs to existing array
        }

        let jsonValue = await AsyncStorage.getItem(username);
        let itemParsed = jsonValue != null ? JSON.parse(jsonValue) : null;
        setProfilePicture(itemParsed.profilePicture)
    };

    const takePhoto = async () => {
        let photoCount = 3 - images.length;

        while (photoCount > 0) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
                allowsMultipleSelection: false,
            });

            if (!result.canceled) {
                setImages(prevImages => [...prevImages, result.assets[0].uri].slice(0, 3)); // Append new URI to existing array, limit to 3
                photoCount -= 1;
            } else {
                break; // Exit loop if user cancels
            }
        }

        let jsonValue = await AsyncStorage.getItem(username);
        let itemParsed = jsonValue != null ? JSON.parse(jsonValue) : null;
        setProfilePicture(itemParsed.profilePicture);
    };

    const saveItem = async () => {
        const item = {
            itemIndex: uuid.v4(),
            username: username,
            itemName: itemName,
            itemDescr: itemDescr,
            itemPrice: itemPrice,
            itemCity: itemCity,
            images: images,
            favourites: [],
            profilePicture: profilePicture
        }
        await addItem(item);
    };

    useFocusEffect(
        React.useCallback(() => {
            setItemName('');
            setItemDescr('');
            setItemPrice(0.0);
            setItemCity('');
            setImages([]);
            setProfilePicture('')
        }, [])
    );

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }

            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraStatus.status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
    }, []);

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.title}>New Item</Text>
                <Text style={styles.subTitle}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={itemName}
                    onChangeText={setItemName}
                />
                <Text style={styles.subTitle}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={itemDescr}
                    onChangeText={setItemDescr}
                />
                <Text style={styles.subTitle}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={itemPrice}
                    onChangeText={setItemPrice}
                />
                <Text style={styles.subTitle}>City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={itemCity}
                    onChangeText={setItemCity}
                />
                <View style={{
                    width: '60%',
                    flexDirection: 'row',
                    justifyContent: 'space-between', // Distribute content evenly with space on both ends
                    alignItems: 'center', // Align items at the top of the container
                }}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Pick 3 Images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                        <Text style={styles.buttonText}><MaterialCommunityIcons name='camera' size={25} color='white' /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                }}>
                    {images.length == 0 && (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#CF2027'
                            }}>Images not uploaded </Text>
                            <MaterialCommunityIcons name='alert' size={20} color='#CF2027' />
                        </View>
                    )}
                    {images.length != 0 && (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#1E9A48'
                            }}>Images uploaded </Text>
                            <MaterialCommunityIcons name='check-circle-outline' size={20} color='#1E9A48' />
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    title: {
        fontSize: 60,
        marginTop: 40,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 17,
        marginBottom: 10,
    },
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#e1e1e1',
        borderWidth: 1,
        borderColor: 'black'
    },
    button: {
        width: '70%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10
    },
    saveButton: {
        width: '40%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10
    },
    cameraButton: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25
    },
});

export default AddItemScreen;

