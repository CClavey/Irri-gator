import * as React from "react";

import { StyleSheet, View, TextInput, text, Text, onChangeText,
Pressable, TouchableOpacity, SafeAreaView, ScrollView, form, useState, Image, password
} from "react-native";

import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';







const Signup = ({navigation}) => {


  const [form, setForm] = React.useState({

    username: '',

    email: '',

    password: '',

  });




  const handleSignUp = async () => {

    try {

      const response = await fetch('https://irri-gator.com/signup', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(form),

      });

      const data = await response.json();

      if (data.success) {

        navigation.navigate('Login'); 

      } 

      else {

        console.error('Signup failed');

      }

    } catch (error) {

      console.error('Error during signup:', error);

    }

  };




  return (

    <View style={styles.signUpPage}>

      <ScrollView>

      <Text style={[styles.alreadyHaveAnContainer,
styles.signUpForTypo]}>

        <Text style={styles.alreadyHaveAn}>{`Already have an account? `}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>

          <Text style={styles.logIn}>Log  In</Text>

        </TouchableOpacity>

      </Text>

      <Text style={styles.createAccount}>Create
Account</Text>

      <View style={[styles.signUpPageItem,
styles.signLayout]} />

      <View style={[styles.signUpPageInner,
styles.signLayout]} />

      <View style={[styles.rectangleView,
styles.signLayout]} />

      <TextInput

        style={[styles.signUpPageItem,
styles.name, styles.nameTypo]}

        onChangeText={(username) =>
setForm({...form, username})}

        value={form.username}

        placeholder="Name"

      />

      <TextInput

        style={[styles.signUpPageItem,
styles.email, styles.nameTypo]}

        onChangeText={(email) =>
setForm({...form, email})}

        value={form.email}

        placeholder="email@example.com"

      />




      <TextInput

        style={[styles.signUpPageItem,
styles.password, styles.signLayout,]}

        onChangeText={(password) =>
setForm({...form, password})}

        value={form.password}

        placeholder="Password"

      />




      <Image

        style={[styles.groupIcon,
styles.groupIconLayout]}

        contentFit="cover"

        source={require("../assets/group-9.png")}

      />

      <Image

        style={[styles.signUpPageChild1,
styles.groupIconLayout]}

        contentFit="cover"

        source={require("../assets/group-10.png")}

      />

      <Text style={[styles.rememberInfo,
styles.signUpForTypo]}>

        Remember info

      </Text>

      <Text style={[styles.signUpFor,
styles.signUpForTypo]}>

        Sign up for discounts

      </Text>

      <TouchableOpacity onPress={handleSignUp}>

        <Image

          style={styles.signUpPageChild2}

          contentFit="cover"

          source={require("../assets/group-20.png")}

        />

      </TouchableOpacity>

      </ScrollView>

    </View>

  );

};




const styles = StyleSheet.create({

  buttonIconLayout: {

    maxHeight: "100%",

    maxWidth: "100%",

    position: "absolute",

    overflow: "hidden",

  },

  signUpForTypo: {

    height: 17,

    fontFamily: FontFamily.avenir,

    fontWeight: "500",

    fontSize: FontSize.size_sm,

    textAlign: "center",

    position: "absolute",

  },

  signLayout: {

    height: 65,

    width: 306,

    backgroundColor: Color.colorGainsboro,

    borderRadius: Border.br_xl,

    left: 42,

    position: "absolute",

  },

  nameTypo: {

    width: 255,

    color: Color.colorDarkgray,

    left: 66,

    textAlign: "left",

    fontFamily: FontFamily.avenir,

    fontWeight: "500",

    height: 23,

    fontSize: FontSize.size_xl,

    position: "absolute",

  },

  groupIconLayout: {

    height: 25,

    width: 25,

    left: 66,

    position: "absolute",

  },

  signUpPageChild: {

    top: 0,

    left: 0,

    backgroundColor: Color.colorSteelblue,

    width: 390,

    height: 79,

    position: "absolute",

  },

  nameOfApp: {

    top: 28,

    left: 133,

    fontFamily: FontFamily.interRegular,

    width: 125,

    height: 23,

    textAlign: "center",

    fontSize: FontSize.size_xl,

    color: Color.colorBlack,

    position: "absolute",

  },

  settingsButtonIcon: {

    height: "1.73%",

    width: "6.15%",

    top: "4.03%",

    right: "5.9%",

    bottom: "94.24%",

    left: "87.95%",

  },

  alreadyHaveAn: {

    color: Color.colorBlack,

  },

  logIn: {

    top: 6,

    color: Color.colorForestgreen,

    textDecorationLine: 'underline',

  },

  alreadyHaveAnContainer: {

    top: 610,

    left: 85,

    width: 219,

  },

  createAccount: {

    top: 99,

    left: 43,

    fontSize: FontSize.size_11xl,

    fontFamily: FontFamily.gotuRegular,

    color: Color.colorGray,

    width: 337,

    height: 50,

    textAlign: "left",

    position: "absolute",

  },

  signUpPageItem: {

    top: 171, 

  },

  signUpPageInner: {

    top: 171, 

  },

  rectangleView: {

    top: 260, 

  },

  name: {

    top: 190,

  },

  email: {

    top: 282,

  },

  password: { 

    top: 351,

    width: 94,

    color: Color.colorDarkgray,

    left: 66,

    textAlign: "left",

    fontFamily: FontFamily.avenir,

    fontWeight: "500",

    height: 23,

    fontSize: FontSize.size_xl,

    position: "absolute",

  },

  backButtonIcon: {

    height: "2.13%",

    width: "2.56%",

    top: "3.79%",

    right: "90.26%",

    bottom: "94.08%",

    left: "7.18%",

  },

  groupIcon: { 

    top: 439,

  },

  signUpPageChild1: {

    top: 474, 

  },

  rememberInfo: {

    top: 443,

    left: 104,

    width: 112,

    color: Color.colorBlack,

  },

  signUpFor: {

    top: 478,

    left: 109,

    width: 143,

    color: Color.colorBlack,

  },

  signUpPageChild2: {

    marginLeft: -35,

    top: 525,

    left: "50%",

    width: 73,

    height: 73,

    position: "absolute",

  },

  signUpPage: {

    backgroundColor: Color.colorWhite,

    flex: 1,

    width: "100%",

    height: 844,

    overflow: "hidden",

  },

});




export default Signup;
