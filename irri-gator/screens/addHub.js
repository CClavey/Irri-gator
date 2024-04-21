import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useFocusEffect } from '@react-navigation/native';
//CC

const AddHub = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [form, setForm] = useState({
    hubID: '',
    hubName: '',
    email: email,
  });

  const addHubs = async () => {
    try {
      const response = await fetch('https://irri-gator.com/addHubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        navigation.navigate('HubMenu', { email });
      } 
      else {
        console.error('update failed');
      }
    } catch (error) {
      console.error('Error adding hub:', error);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={hubID => {
            const parsedValue = parseInt(hubID);
            setForm({ ...form, hubID});
          }}
          value={form.hubID}
          keyboardType="numeric"
          maxLength={4}
          placeholder="Hub ID"
        />
        <TextInput
          style={styles.input}
          onChangeText={hubName => setForm({ ...form, hubName })}
          value={form.hubName}
          placeholder="Hub Name"
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={addHubs}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorSkyblue,
    padding: 20,
    alignItems: 'center', 
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    borderRadius: Border.br_xl,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.avenir,
    color: Color.colorDarkgray,
    backgroundColor: Color.colorGainsboro,
    width: '100%', 
  },
  button: {
    backgroundColor: Color.colorSteelblue, 
    width: 250,
    height: 60,
    borderRadius: Border.br_xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.avenir,
  },
});

export default AddHub;
