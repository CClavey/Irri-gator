import React, { useEffect, useState, } from 'react';
import { View, Text, Image, Pressable, StyleSheet, } from 'react-native';
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'; // Assuming GlobalStyles contains these constants
import { useNavigation } from '@react-navigation/native';

const AddPlantConfirm = ({ route }) => {
    const { hubID } = route.params;
    const navigation = useNavigation(); // Get navigation object using useNavigation hook

    useEffect(() => {
        // Fetch any necessary data or perform any side effects
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.background} />
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require('../assets/white_logo.png')} //CHANGE TO YOUR OWN FILEPATH
                />
                <Text style={styles.confirmText}>Success, Plant Added!</Text>
            </View>

            <Pressable
                style={styles.button}
                onPress={() => {
                    navigation.navigate('PotMenu', { hubID }); // Navigate to HubMenu
                }}

            >
                <Text style={styles.buttonText}>See Plants</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Color.colorSkyblue,
    },
    content: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    confirmText: {
        fontSize: 33,
        color: 'white',
        fontFamily: FontFamily.avenir,
    },
    button: {
        backgroundColor: Color.colorSteelblue,
        width: 100,
        height: 60,
        borderRadius: Border.br_xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: Color.colorWhite,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.avenir,
    },
});

export default AddPlantConfirm;
