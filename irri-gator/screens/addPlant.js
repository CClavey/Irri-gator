import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, View, TextInput, Button, Pressable, Text } from "react-native";
import { Color, FontSize, FontFamily, Border} from "../GlobalStyles";
//CC

const AddPlant = ({ route }) => {
  const navigation = useNavigation();
  const { hubID } = route.params;
  const [form, setForm] = useState({
    plantSpecies: '',
    plantDesc: '',
    daySchedule: '',
    dayTime: '',
    hubID: hubID,
  });

  const addPlants = async () => {
    try {
      const response = await fetch('https://irri-gator.com/addPlants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        navigation.navigate('AddPlantConfirm', { hubID });
      } 
      else {
        console.error('update failed');
      }
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };  

  const formatTime = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{2})(?=\d)/g, '$1:');
    setForm({ ...form, dayTime: formattedValue });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.largeInput]}
        onChangeText={plantSpecies => setForm({ ...form, plantSpecies })}
        value={form.plantSpecies}
        placeholder="Plant Name"
      />
      <TextInput
        style={[styles.input, styles.largeInput]}
        onChangeText={plantDesc => setForm({ ...form, plantDesc })}
        value={form.plantDesc}
        placeholder="Plant Description"
      />
      <TextInput
        style={[styles.input, styles.largeInput]}
        onChangeText={daySchedule => {
          const parsedValue = parseInt(daySchedule);
          setForm({ ...form, daySchedule: !isNaN(parsedValue) ? parsedValue.toString() : '' });
        }}
        value={form.daySchedule}
        placeholder="Plant Schedule (Days)"
        maxLength={2}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.largeInput]}
        onChangeText={dayTime => formatTime(dayTime)}
        value={form.dayTime}
        keyboardType="numeric"
        maxLength={8}
        placeholder="Time of Day (HH:MM:SS)"
      />
      <Pressable
        style={styles.button}
        onPress={addPlants}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    borderRadius: Border.br_xl,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.avenir,
    color: Color.colorDarkgray,
    backgroundColor: Color.colorGainsboro, 
  },
  largeInput: {
    height: 60,
    fontSize: FontSize.size_xl,
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

export default AddPlant;
