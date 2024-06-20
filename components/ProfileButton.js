import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';

const ProfileButton = ({ item }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const getUserInfos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(item.username);
            const itemParsed = jsonValue != null ? JSON.parse(jsonValue) : null;

            setName(itemParsed.name);
            setSurname(itemParsed.surname);
            setEmail(itemParsed.email);
            setProfilePicture(itemParsed.profilePicture)
        } catch (e) {
            console.log('Error in reading data:', e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUserInfos();
        }, [])
    );

    return (
        <View>
            <TouchableOpacity onPress={toggleModal}>
                <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
            </TouchableOpacity>
            <Modal style={styles.container} isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: profilePicture }} style={styles.profilePictureIn} />
                    <Text style={styles.subTitle} >Name</Text>
                    <Text style={styles.value} >{name}</Text>
                    <Text style={styles.subTitle} >Surname</Text>
                    <Text style={styles.value} >{surname}</Text>
                    <Text style={styles.subTitle} >Email</Text>
                    <Text style={styles.value} >{email}</Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 5
    },
    modalContent: {
        width: '70%',
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black'
    },
    profilePictureIn: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },  
    value: {
        color: 'gray',
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ProfileButton;
