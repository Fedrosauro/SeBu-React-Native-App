import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import InterestedButton from './InterestedButton'
import ImagesSlider from './ImagesSlider'
import ProfileButton from './ProfileButton'


const Item = ({ item, addFavourite, username, location, deleteItem }) => {
    return (
        <View style={styles.postContainer}>
            {location === 'myItems' &&
                <DeleteButton
                    onPress={() => deleteItem(item.itemIndex)}
                />
            }
            <View style={styles.headerContainer}>
                <ProfileButton item={item}/>
                <View>
                    <Text style={styles.city} >{item.itemCity}</Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row', // Arrange elements horizontally
                }}>
                <ImagesSlider
                    images={item.images}
                />
            </View>

            <Text style={styles.name} >{item.itemName}</Text>
            <View style={styles.textContainer}>
                <Text style={styles.description} >{item.itemDescr}</Text>
                <Text style={styles.price} >{item.itemPrice} $</Text>
            </View>
            {location !== 'myItems' &&
                <View style={styles.buttonSection}>
                    <InterestedButton />
                    <LikeButton
                        onPress={() => addFavourite(item.itemIndex)}
                        favourites={item.favourites}
                        username={username}
                        style={{
                            alignSelf: 'end'
                        }}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff', // White background
        borderRadius: 20, // Rounded corners
        marginBottom: 30,
        shadowRadius: 4, // Add a slight shadow for depth
        borderColor: 'black',
        borderWidth: 1,
    },
    name: {
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 5
    },
    headerContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align items at the top of the container
        justifyContent: 'space-between', // Distribute content evenly with space on both ends
        margin: 10
    },
    textContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align items at the top of the container
        justifyContent: 'space-between', // Distribute content evenly with space on both ends
        margin: 15,
        marginBottom: 0,
        marginTop: 0
    },
    description: {
        fontSize: 15,
        maxWidth: 150,
    },
    price: {
        fontSize: 22,
    },
    city: {
        fontSize: 17,
        color: '#777', // Grey color for city text
    },
    buttonSection: {
        alignSelf: 'stretch',
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align items at the top of the container
        justifyContent: 'space-between', // Distribute content evenly with space on both ends
        margin: 15,
    },
});

export default Item