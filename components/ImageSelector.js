import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';

const ImageSelector = props => {
    const [pickedImage, setPickedImage] = useState();
    const [galleryPickedImage, setGalleryPickedImage] = useState();

    const takeImageHandler = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    const galleryImageHandler = async () => {
        const image = await ImagePicker.launchImageLibraryAsync();

        setGalleryPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    let image = pickedImage;

    if (!pickedImage) {
        image = galleryPickedImage;
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!image ? <Text>No image picked yet.</Text>
                    : <Image style={styles.image} source={{ uri: image }} />}
            </View>
            <View style={styles.actions}>
                <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
                <Button title="Choose From Gallery" color={Colors.primary} onPress={galleryImageHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default ImageSelector;
