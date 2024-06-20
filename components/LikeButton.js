import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo, if not, adjust the import accordingly

const LikeButton = ({ onPress, favourites, username }) => {
    const isFavorited = favourites.includes(username);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {isFavorited ? (
                <FontAwesome name="heart" size={27} color="red" />
            ) : (
                <FontAwesome name="heart-o" size={27} color="red" />
            )}
            <Text style={styles.text}>{favourites.length}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: '#5e5e5e'
    },
});

export default LikeButton;
