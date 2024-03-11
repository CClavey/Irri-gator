import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import signup from './signup.js';

const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();


const Index = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('signup')}
      >
        <Text style={styles.buttonText}>Get Started!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.buttonText}>Login!</Text>
      </TouchableOpacity>
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

export default Index;