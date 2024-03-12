import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();


const potMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10 * scale,
    borderRadius: 8 * scale,
    marginTop: 8 * scale,
  },
  buttonText: {
    color: 'white',
    fontSize: 20 * scale,
  },
  title: {
    fontSize: 18 * scale,
  },
  largeTitle: {
    fontSize: 22 * scale,
  },
  logo: {
    width: 500,
    height: 350,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
});

export default potMenu;