import { StyleSheet, View, Text, TextInput, onChangeText, email,
  password, TouchableOpacity, Home, Image } from "react-native";

  
  import React, { useState, useEffect } from 'react';
  
  import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
  
  
  
  
  const Login = ({ navigation }) => {
  
    const [form, setForm] = useState({
  
      email: '',
  
      password: '',
  
    });
  
  
  
  
    const handleLogin = async () => {
  
      try {
  
        const response = await fetch('https://irri-gator.com/login', {
  
          method: 'POST',
  
          headers: {
  
            'Content-Type': 'application/json',
  
          },
  
          body: JSON.stringify(form),
  
        });
  
        const data = await response.json();
  
        if (data.success) {
  
          navigation.navigate('HubMenu', { email: form.email});
  
        }
  
        else {
  
          console.error('Login failed');
  
        }
  
      } catch (error) {
  
        console.error('Error during login:', error);
  
      }
  
    };
  
  
  
  
    return (
  
      <View style={styles.logInPage}>
  
        {/*<View style={[styles.logInPageChild, styles.childPosition]} />
  
        <Text style={styles.nameOfApp}>Irri-gator</Text> */}
  
        <Text style={[styles.dontHaveAnContainer,
  styles.rememberInfoTypo]}>
  
          <Text style={styles.dontHaveAn}>{`Don’t have an account? `}</Text>
  
          <TouchableOpacity onPress={() =>
            navigation.navigate('Signup')}>
  
            <Text style={styles.signUp}>Sign Up</Text>
  
          </TouchableOpacity>
  
        </Text>
  
        <Text style={[styles.forgotPassword,
  styles.rememberInfoTypo]}>
  
          Forgot Password?
  
        </Text>
  
        <View style={[styles.email,
  styles.emailLayout]}>
  
          <View style={[styles.emailChild,
  styles.emailLayout]} />
  
          {/* <Text style={[styles.email1, styles.email1FlexBox]}>Email</Text> */}
  
          <TextInput
  
            style={[styles.email1,
  styles.email1FlexBox]}
  
            autoCapitalize="none"
  
            autoCorrect={false}
  
            keyboardType="email-address"
  
            onChangeText={email => setForm({
  ...form, email })}
  
            value={form.email}
  
            placeholder="Email"
  
            onBlur={() => {
  
              
  
              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  
              if (!isValidEmail) {
  
                
  
                setForm({ ...form, email:
  '' });
  
             
  
                alert('Please enter a valid email address');
  
              }
  
            }}
  
          />
  
        </View>
  
        <View style={[styles.password,
  styles.emailLayout]}>
  
          <View style={[styles.emailChild,
  styles.emailLayout]} />
  
          {/* <Text style={[styles.password1, styles.email1FlexBox]}>Password</Text> */}
  
          <TextInput
  
            style={[styles.password1,
  styles.email1FlexBox]}
  
            onChangeText={password => setForm({
  ...form, password })}
  
            value={form.password}
  
            placeholder="Password"
  
            autoCorrect={false}
  
            secureTextEntry={true}
  
          />
  
        </View>
  
        <Image
  
          style={styles.logInPageItem}
  
          contentFit="cover"
  
          source={require("../assets/group-9.png")}
  
        />
  
        <Text style={[styles.rememberInfo,
  styles.rememberInfoTypo]}>
  
          Remember info
  
        </Text>
  
        <Text style={[styles.welcomeBack,
  styles.email1FlexBox]}>
  
          Welcome Back
  
        </Text>
  
        <TouchableOpacity onPress={handleLogin}>
  
          <Image
  
            style={styles.logInPageInner}
  
            contentFit="cover"
  
            source={require("../assets/group-20.png")}
  
          />
  
        </TouchableOpacity>
  
      </View>
  
    );
  
  };
  
  
  
  
  const styles = StyleSheet.create({
  
    childPosition: {
  
      left: 0,
  
      top: 0,
  
    },
  
    buttonIconLayout: {
  
      maxHeight: "100%",
  
      maxWidth: "100%",
  
      position: "absolute",
  
      overflow: "hidden",
  
    },
  
    rememberInfoTypo: {
  
      height: 17,
  
      fontFamily: FontFamily.avenir,
  
      fontWeight: "500",
  
      fontSize: FontSize.size_sm,
  
      textAlign: "center",
  
      position: "absolute",
  
    },
  
    emailLayout: {
  
      height: 65,
  
      width: 306,
  
      position: "absolute",
  
    },
  
    email1FlexBox: {
  
      textAlign: "left",
  
      position: "absolute",
  
    },
  
    logInPageChild: {
  
      backgroundColor: Color.colorSteelblue,
  
      width: 390,
  
      height: 79,
  
      position: "absolute",
  
    },
  
    nameOfApp: {
  
      top: 28,
  
      fontFamily: FontFamily.interRegular,
  
      height: 23,
  
      textAlign: "center",
  
      fontSize: FontSize.size_xl,
  
      width: 128,
  
      color: Color.colorBlack,
  
      left: 131,
  
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
  
    backButtonIcon: {
  
      height: "2.13%",
  
      width: "2.56%",
  
      top: "3.79%",
  
      right: "90.26%",
  
      bottom: "94.08%",
  
      left: "7.18%",
  
    },
  
    dontHaveAn: {
  
      color: Color.colorBlack,
  
    },
  
    signUp: {
  
      top: 6,
  
      color: Color.colorForestgreen,
  
      textDecorationLine: 'underline',
  
    },
  
    dontHaveAnContainer: { 
  
      top: '90%',
  
      left: 85,
  
      width: 219,
  
    },
  
    forgotPassword: { 
  
      top: '56%',
  
      textDecoration: "underline",
  
      width: 128,
  
      left: 131,
  
      fontFamily: FontFamily.avenir,
  
      fontWeight: "500",
  
      fontSize: FontSize.size_sm,
  
      color: Color.colorBlack,
  
    },
  
    emailChild: {
  
      borderRadius: Border.br_xl,
  
      backgroundColor: Color.colorGainsboro,
  
      left: 0,
  
      top: 0,
  
    },
  
    email1: {
  
      width: 255,
  
      color: Color.colorDarkgray,
  
      left: 24,
  
      top: 21,
  
      textAlign: "left",
  
      fontFamily: FontFamily.avenir,
  
      fontWeight: "500",
  
      height: 23,
  
      fontSize: FontSize.size_xl,
  
    },
  
    email: { 
  
      top: 171,
  
      left: 42,
  
      width: 306,
  
    },
  
    password1: {
  
      width: 255,
  
      color: Color.colorDarkgray,
  
      left: 24,
  
      top: 21,
  
      textAlign: "left",
  
      fontFamily: FontFamily.avenir,
  
      fontWeight: "500",
  
      height: 23,
  
      fontSize: FontSize.size_xl,
  
    },
  
    password: { 
  
      top: '42.8%',
  
      left: 42,
  
      width: 306,
  
    },
  
    logInPageItem: { 
  
      top: '64.45%',
  
      left: 66,
  
      width: 25,
  
      height: 25,
  
      position: "absolute",
  
    },
  
    rememberInfo: { 
  
      top: '65%',
  
      left: 104,
  
      width: 112,
  
      color: Color.colorBlack,
  
    },
  
    welcomeBack: { 
  
      top: 99,
  
      left: 43,
  
      fontSize: FontSize.size_11xl,
  
      fontFamily: FontFamily.gotuRegular,
  
      color: Color.colorGray,
  
      width: 337,
  
      height: 50,
  
    },
  
    logInPageInner: { 
  
      marginLeft: -35,
  
      top: 572,
  
      left: "50%",
  
      width: 73,
  
      height: 73,
  
      position: "absolute",
  
    },
  
    logInPage: {
  
      backgroundColor: Color.colorWhite,
  
      flex: 1,
  
      width: "100%",
  
      height: 844,
  
      overflow: "hidden",
  
    },
  
  });
  
  
  
  
  export default Login;
  
