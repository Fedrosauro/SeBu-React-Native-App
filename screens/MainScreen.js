import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import AddItemScreen from './AddItemScreen';
import FavouritesScreen from './FavouritesScreen';
import MyItemsScreen from './MyItemsScreen';

const Tab = createBottomTabNavigator();

const MainScreen = ({ route }) => {
  const { username } = route.params;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#565656',
          tabBarStyle: styles.barStyle,
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 3 },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <MaterialCommunityIcons name="home" color={color} size={30} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <FontAwesome5 name="user-circle" color={color} size={30} />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="AddItemScreen"
          component={AddItemScreen}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <FontAwesome5 name="plus-circle" color={color} size={30} />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesScreen}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <FontAwesome5 name="heart" color={color} size={30} />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="My items"
          component={MyItemsScreen}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <FontAwesome5 name="list" color={color} size={30} />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#fff', // Adjust background color as needed
    borderRadius: 20, // Set corner radius
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute', // Ensure positioning for bottom placement
    padding: 5,
    height: 120,
    marginBottom: -20,
    paddingBottom: 20
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 10,
  },
})

export default MainScreen;