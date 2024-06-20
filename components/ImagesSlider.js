import { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, FlatList, useWindowDimensions, Text } from 'react-native';
import uuid from 'react-native-uuid';

const ImagesSlider = ({ images }) => {
    return (
        <View>
            {images.length > 0 && (
                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                    keyExtractor={item => uuid.v4()}
                    horizontal={true}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    image: {
        height: 300,
        width: 300,
        backgroundColor: 'black',
        resizeMode: 'contain',
    },
});

export default ImagesSlider;