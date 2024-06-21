import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import emptyProfilePic from '../assets/images/black_profile_picture.png'

const SignInForm = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (user) => {
        try {
            const jsonValue = await AsyncStorage.getItem(user);
            const itemParsed = jsonValue != null ? JSON.parse(jsonValue) : null;

            if (itemParsed.password === password) {
                navigation.navigate('MainScreen', {
                    username: user,
                });
            }
        } catch (e) {
            console.log('Error in reading data:', e);
        }
    };

    const handleRegistration = async (username, psw) => {
        profimage = Image.resolveAssetSource(emptyProfilePic).uri
        try {
            const profileIdentity = {
                username: username,
                password: psw,
                name: '',
                surname: '',
                email: '',
                favourites: {},
                myItems: {},
                profilePicture: profimage
            }
            const jsonValue = JSON.stringify(profileIdentity)
            await AsyncStorage.setItem(username, jsonValue);
            setUsername('');
            setPassword('');
        } catch (e) {
            console.log('Error in storing data:', e);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ImageBackground
            source={require('../assets/images/background_image.jpg')}
            style={styles.container}
            >
            <Text style={styles.title}>¡Sebu!</Text>
            <Text style={styles.subTitle}>Username</Text>
            <TextInput style={styles.input}
                placeholder="Username"
                placeholderTextColor="#6d6d6d"
                value={username} onChangeText={setUsername}
            />
            <Text style={styles.subTitle}>Password</Text>
            <View style={styles.passContainer}>
                <TextInput style={{
                    width: '90%',
                    height: '100%',
                }}
                    placeholder="Password"
                    placeholderTextColor="#6d6d6d"
                    secureTextEntry={!showPassword}
                    value={password} onChangeText={setPassword}
                    onFocus={() => ({
                        borderColor: '#white',
                    })}
                />
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    onPress={toggleShowPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleSignIn(username)}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleRegistration(username, password)}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    passContainer: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginBottom: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 120,
        marginBottom: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 15,
        marginBottom: 10,
    },
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    button: {
        width: '40%',
        height: 40,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25
    }
});

export default SignInForm;