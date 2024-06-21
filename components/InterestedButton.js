import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Linking } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const InterestedButton = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const openApp = (app) => {
        let url = '';
        switch (app) {
            case 'whatsapp':
                url = 'whatsapp://send?text=Hello';
                break;
            case 'telegram':
                url = 'https://telegram.me/';
                break;
            case 'instagram':
                url = 'instagram://user?username=';
                break;
            default:
                break;
        }
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={toggleModal}>
                <Text style={styles.text}>Interested</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Text style={{
                        marginBottom: 15,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>Contacts</Text>
                    <View style={styles.modalContentIcons}>
                        <TouchableOpacity onPress={() => openApp('whatsapp')}>
                            <FontAwesome5 name="whatsapp" size={50} color="#24CC63" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openApp('telegram')}>
                            <FontAwesome5 name="telegram" size={50} color="#26A3E2" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openApp('instagram')}>
                            <FontAwesome5 name="instagram" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        padding: 3,
        fontWeight: 'bold'
    },
    modalContent: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch'
    }
});

export default InterestedButton;
