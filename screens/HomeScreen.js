import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useState } from 'react';

import { getItems, addFavourite } from '../Data';
import ItemsList from '../components/ItemList';

const HomeScreen = ({ route }) => {

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const { username } = route.params;

  const loadItemsFromStorage = async () => {
    try {
      const items = await getItems();
      const filteredItems = items.filter(item => item.username !== username);
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

  const filterItems = () => {
    if (query) {
      setItems(items.filter(item => item.itemName.includes(query) ||
        item.itemDescr.includes(query) ||
        item.itemCity.includes(query)
      ))
    } else {
      loadItemsFromStorage();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadItemsFromStorage();
    }, [])
  );

  return (

    <ScrollView>
      <View
        style={styles.container}
      >
        <Text style={styles.title}>Home</Text>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 20
        }}>
          <TextInput style={styles.input}
            placeholder="Query"
            value={query} onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={filterItems}>
            <FontAwesome5 name="search" color={"black"} size={20} />
          </TouchableOpacity>
        </View>
        <ItemsList
          items={items}
          addFavourite={addFavouriteToItem}
          username={username}
          location='home'
          deleteItem={null}
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
  title: {
    fontSize: 60,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '70%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#e1e1e1',
  },
  searchButton: {
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    marginLeft: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default HomeScreen;