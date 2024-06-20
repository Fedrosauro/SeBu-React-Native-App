import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { getItems, addFavourite } from '../Data';
import ItemsList from '../components/ItemList';

const HomeScreen = ({ route }) => {

  const [items, setItems] = useState([]);
  const { username } = route.params;

  const loadItemsFromStorage = async () => {
    try {
      const items = await getItems();
      const filteredItems = items.filter(item => item.username !== username);
      setItems(filteredItems);
      console.log(filteredItems)
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

  useFocusEffect(
    React.useCallback(() => {
      loadItemsFromStorage();
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Favourites</Text>
        <ItemsList
          items={items}
          addFavourite={addFavouriteToItem}
          username={username}
          location="favourites"
        >
        </ItemsList>
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
  input: {
    width: '70%',
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 60,
    marginTop: 40,
    fontWeight: 'bold',
    marginBottom: 15
  },
})

export default HomeScreen;