import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { navigation, navigate, Pressable } from "react-native";
import { Border, FontSize, Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();


const Index = ({ navigation }) => {
  return (
    <View style={styles.startingPage}>
      <View style={styles.startingPageChild} />
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.getStarted}>Get Started!</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.startingPageInner, styles.groupItemLayout]}>
        <View style={[styles.groupItem, styles.groupItemLayout]} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.logIn, styles.logInTypo]}>Log In</Text>
      </TouchableOpacity>
      {/* <Text style={[styles.logoInWhite, styles.logInTypo]}>
        (logo in white)
      </Text> */}
      <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('/Users/cole/irri-gator/assets/white_logo.png')} //CHANGE TO YOUR OWN FILEPATH
            />
          </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 61,
    width: 201,
    position: "absolute",
  },
  groupPosition: {
    borderRadius: Border.br_11xl_5,
    left: 0,
    top: 0,
  },
  groupItemLayout: {
    height: 40,
    width: 133,
    position: "absolute",
  },
  logInTypo: {
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  startingPageChild: {
    backgroundColor: Color.colorSkyblue,
    width: 390,
    left: 0,
    top: 0,
    position: "absolute",
    height: 844,
  },
  groupChild: {
    backgroundColor: Color.colorSteelblue,
    height: 61,
    width: 201,
    position: "absolute",
  },
  getStarted: {
    top: 13,
    left: 27,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.gotuRegular,
    color: Color.colorWhite,
    width: 157,
    height: 29,
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: { 
    top: 446,
    left: 95,
  },
  groupItem: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_11xl_5,
    left: 0,
    top: 0,
  },
  startingPageInner: { 
    top: 537,
    left: 129,
  },
  logIn: {
    top: 544,
    left: 165,
    fontWeight: "500",
    fontFamily: FontFamily.avenir,
    color: Color.colorSteelblue,
    textAlign: "left",
  },
  logoInWhite: {
    top: 336,
    left: 131,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    textAlign: "center",
    width: 128,
    height: 23,
  },
  startingPage: {
    backgroundColor: Color.colorSkyblue,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 844,
  },


  container: {
    flex: 1,
    backgroundColor: '#65BEE3',
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
  image:{
    top: 220,
    left: 131,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    textAlign: "center",
    width: 150,
    height: 200,
  }
});

export default Index;