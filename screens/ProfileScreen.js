import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ route }) => {

  const { username } = route.params;

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getUserInfos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(username);
      const itemParsed = jsonValue != null ? JSON.parse(jsonValue) : null;

      setPassword(itemParsed.password);
      setName(itemParsed.name);
      setSurname(itemParsed.surname);
      setEmail(itemParsed.email);
      setProfilePicture(itemParsed.profilePicture)
    } catch (e) {
      console.log('Error in reading data:', e);
    }
  };

  const saveUserInfos = async () => {
    try {
      const updatedInfo = { password, name, surname, email, profilePicture }; // Create a new object with updated fields (excluding password)
      const jsonValue = JSON.stringify(updatedInfo);
      await AsyncStorage.setItem(username, jsonValue);
      console.log("Modifications for user: " + username + " done" + "\n" + jsonValue);
    } catch (e) {
      console.error('Error in modify user:', e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets.map((asset) => asset.uri);
      setProfilePicture(newImage[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri
      setProfilePicture(newImage);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfos();
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
        <Text style={styles.title}>Profile</Text>
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        )}
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
              borderColor: '#e1e1e1',
            })}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            onPress={toggleShowPassword}
          />
        </View>
        <Text style={styles.subTitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.subTitle}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
        />
        <Text style={styles.subTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{
          width: '75%',
          flexDirection: 'row',
          justifyContent: 'space-between', // Distribute content evenly with space on both ends
          alignItems: 'center', // Align items at the top of the container
          marginBottom: 20
        }}>
          <TouchableOpacity style={styles.profileButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Change profile picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <Text style={styles.buttonText}><MaterialCommunityIcons name='camera' size={25} color='black' /></Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={saveUserInfos}>
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
    marginBottom: 115
  },
  title: {
    fontSize: 60,
    marginTop: 20,
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

  passContainer: {
    width: '70%',
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e1e1e1',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    width: '40%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  profileButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  cameraButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    lineHeight: 25
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black'
  }
});

export default ProfileScreen;