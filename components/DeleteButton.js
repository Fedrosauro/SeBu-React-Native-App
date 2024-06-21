import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DeleteButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FontAwesome name="trash-o" size={25} color="#848484"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        marginTop: -25,
        borderRadius: 50,
        borderWidth: 1,
        borderBlockColor: 'black',
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default DeleteButton;
