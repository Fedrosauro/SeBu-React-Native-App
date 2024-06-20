import AsyncStorage from '@react-native-async-storage/async-storage';

const items_key = '@items_';

export const getItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(items_key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error retrieving items:', error);
    return [];
  }
};

export const saveItems = async (items) => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(items_key, jsonValue);
  } catch (error) {
    console.error('Error saving items:', error);
  }
};

export const addItem = async (item) => {
  try {
    const items = await getItems();
    items.push(item);
    await saveItems(items);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

export const addFavourite = async (itemIndex, username) => {
  try {
    const items = await getItems();
    const itemToUpdate = items.find(item => item.itemIndex === itemIndex);
    if (itemToUpdate) {
      if (itemToUpdate.favourites.includes(username)) {
        const index = itemToUpdate.favourites.indexOf(username);
        if (index !== -1) {
          itemToUpdate.favourites.splice(index, 1);
        }
      } else {
        itemToUpdate.favourites.push(username);
      }
    }

    await saveItems(items);
  } catch (error) {
    console.error('Error in modifying item:', error);
  }
};

export const deleteItem = async (itemIndex) => {
  try {
    const items = await getItems();

    const indexToDelete = items.findIndex(item => item.itemIndex === itemIndex);

    if (indexToDelete !== -1) {
      // If item found, remove it from the array
      items.splice(indexToDelete, 1);
    }
    await saveItems(items);
  } catch (error) {
    console.error('Error in modifying item:', error);
  }
}