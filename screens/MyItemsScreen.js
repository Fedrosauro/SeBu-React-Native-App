import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { getItems, addFavourite, deleteItem } from '../Data';
import ItemsList from '../components/ItemList';


const HomeScreen = ({ route }) => {

  const [items, setItems] = useState([]);
  const { username } = route.params;

  const loadItemsFromStorage = async () => {
    try {
      const items = await getItems();
      const filteredItems = items.filter(item => item.username === username);
      setItems(filteredItems);
    } catch (error) {
      console.error('Error loading TODOs:', error);
    }
  };

  const addFavouriteToItem = async (itemIndex) => {
    try {
      await addFavourite(itemIndex, username);
      loadItemsFromStorage();
    } catch (error) {
      console.error('Error adding favourite:', error);
    }
  }

  const deleteItemFromStorage = async (itemIndex) => {
    try {
      await deleteItem(itemIndex);
      loadItemsFromStorage();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadItemsFromStorage();
    }, [])
  );

  return (
    <ImageBackground source={require('../assets/images/background_image.jpg')}>
      <ScrollView>
        <View
          style={styles.container}
        >
          <Text style={styles.title}>My Items</Text>

          <ItemsList
            items={items}
            addFavourite={addFavouriteToItem}
            username={username}
            location="myItems"
            deleteItem={deleteItemFromStorage}
          >
          </ItemsList>
        </View>
      </ScrollView>
    </ImageBackground>
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
    fontWeight: 'bold',
    marginBottom: 30
  }
})

export default HomeScreen;