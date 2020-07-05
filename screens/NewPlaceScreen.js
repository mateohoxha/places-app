import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', 'Please try again.', [{ text: 'Okay' }]);
        }
    }, [error])

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const imageTakenHander = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = async () => {
        setError(null);
        try {
            await dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImageSelector onImageTaken={imageTakenHander} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
