import React from 'react'
import { View } from 'react-native'
import Item from './Item'

const ItemsList = ({ items, addFavourite, username, location, deleteItem }) => {
    items = items.map((item) => {
        switch (location) {
            case 'home': {
                return (
                    <Item
                        key={item.itemIndex}
                        item={item}
                        addFavourite={addFavourite}
                        username={username}
                    />
                )
            }
            case 'favourites': {
                if (item.favourites.includes(username))
                    return (
                        <Item
                            key={item.itemIndex}
                            item={item}
                            addFavourite={addFavourite}
                            username={username}
                        />
                    )
            }
            case 'myItems': {
                if (item.username === username)
                    return (
                        <Item
                            key={item.itemIndex}
                            item={item}
                            addFavourite={addFavourite}
                            username={username}
                            location={location}
                            deleteItem={deleteItem}
                        />
                    )
            }
        }
    })

    return (
        <View
            style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {items}
        </View >
    )
}

export default ItemsList
