import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInForm from './screens/SignInForm'
import MainScreen from './screens/MainScreen'
import { addItem } from './Data';

import belt1 from './assets/images/belt1.png'
import belt2 from './assets/images/belt2.png'
import book1 from './assets/images/book1.png'
import book2 from './assets/images/book2.png'
import dress1 from './assets/images/dress1.png'
import dress2 from './assets/images/dress2.png'
import dress3 from './assets/images/dress3.png'
import shoes1 from './assets/images/shoes1.png'
import shoes2 from './assets/images/shoes2.png'
import trousers1 from './assets/images/trousers1.png'
import prof1 from './assets/images/prof_1.png'
import prof2 from './assets/images/prof_2.png'
import prof3 from './assets/images/prof_3.png'
import prof4 from './assets/images/prof_4.png'
import prof5 from './assets/images/prof_5.png'
import prof6 from './assets/images/prof_6.png'


const Stack = createStackNavigator();

const App = () => {

  AsyncStorage.clear();

  const loadUsers = async () => {
    users = ["mario", "matteo", "anna", "monica", "andrea", "giulia"]
    imageProf = ''
    for (user of users) {
      try {
        switch (user) {
          case "mario": {
            imageProf = Image.resolveAssetSource(prof1).uri;
            break;
          } case "matteo": {
            imageProf = Image.resolveAssetSource(prof2).uri;
            break;
          } case "anna": {
            imageProf = Image.resolveAssetSource(prof3).uri;
            break;
          } case "monica": {
            imageProf = Image.resolveAssetSource(prof4).uri;
            break;
          } case "andrea": {
            imageProf = Image.resolveAssetSource(prof5).uri;
            break;
          } case "giulia": {
            imageProf = Image.resolveAssetSource(prof6).uri;
            break;
          }
        }

        const profileIdentity = {
          username: user,
          password: user,
          name: '',
          surname: '',
          email: '',
          favourites: {},
          myItems: {},
          profilePicture: imageProf,
        }
        const jsonValue = JSON.stringify(profileIdentity)
        await AsyncStorage.setItem(user, jsonValue);
      } catch (e) {
        console.log('Error in storing data:', e);
      }
    }
  };

  const loadPosts = async () => {
    itemUsers = ["matteo", "anna", "mario", "matteo", "giulia"]
    itemNames = ["Leather Belt", "Trousers", "American Sniper Book", "Asics Shoes", "Summer Dress"]
    itemDescr = []
    itemPrice = []
    itemCity = []
    images = []
    favourites = []
    profilePictures = []

    for (let i = 0; i < itemNames.length; i++) {
      const itemName = itemNames[i];
      let description;
      let price;
      let city;
      let image = [];
      let profilePicture;
      switch (itemName) {
        case "Leather Belt":
          description = "Genuine brown leather belt, size M.";
          price = 29.99;
          city = "London";
          image = [Image.resolveAssetSource(belt1).uri, Image.resolveAssetSource(belt2).uri]
          favourite = ["anna", "mario", "giulia"]
          profilePicture = Image.resolveAssetSource(prof2).uri
          break;
        case "Trousers":
          description = "Gray cotton trousers, size 32.";
          price = 49.95;
          city = "Paris";
          image = [Image.resolveAssetSource(trousers1).uri]
          favourite = ["matteo", "monica"]
          profilePicture = Image.resolveAssetSource(prof3).uri
          break;
        case "American Sniper Book":
          description = "Hardcover book by Chris Kyle.";
          price = 12.50;
          city = "New York";
          image = [Image.resolveAssetSource(book1).uri, Image.resolveAssetSource(book2).uri]
          favourite = ["monica", "giulia"]
          profilePicture = Image.resolveAssetSource(prof1).uri
          break;
        case "Asics Shoes":
          description = "Running shoes, available in various colors.";
          price = 89.99;
          city = "Tokyo";
          image = [Image.resolveAssetSource(shoes1).uri, Image.resolveAssetSource(shoes2).uri]
          favourite = ["mario"]
          profilePicture = Image.resolveAssetSource(prof2).uri
          break;
        case "Summer Dress":
          description = "Floral print dress, perfect for warm weather.";
          price = 34.99;
          city = "Rome";
          image = [Image.resolveAssetSource(dress1).uri, Image.resolveAssetSource(dress2).uri, Image.resolveAssetSource(dress3).uri]
          favourite = ["monica", "anna"]
          profilePicture = Image.resolveAssetSource(prof6).uri
          break;
        default:
          description = "No description available.";
          price = 0.00;
          city = "";
      }

      itemDescr.push(description);
      itemPrice.push(price);
      itemCity.push(city);
      images.push(image);
      favourites.push(favourite);
      profilePictures.push(profilePicture);
    }


    for (let i = 0; i < itemNames.length; i++) {
      const item = {
        itemIndex: uuid.v4(),
        username: itemUsers[i],
        itemName: itemNames[i],
        itemDescr: itemDescr[i],
        itemPrice: itemPrice[i],
        itemCity: itemCity[i],
        images: images[i],
        favourites: favourites[i],
        profilePicture: profilePictures[i]
      }
      try {
        await addItem(item);
        console.log("item added");
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  }

  loadUsers();
  loadPosts();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInForm"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}>
        <Stack.Screen name="SignInForm" component={SignInForm} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;