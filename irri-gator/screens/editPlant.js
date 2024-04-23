import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, View, TextInput, Button, Pressable, Text, Alert} from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useFocusEffect } from '@react-navigation/native';
//CC

const EditPlant = ({ route }) => {

  const convertTimeDelta = (timeDeltaString) => {
    const secondsMatch = timeDeltaString.match(/seconds=(\d+)/);
    if (secondsMatch && secondsMatch[1]) {
      const seconds = parseInt(secondsMatch[1]);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds % 60).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return '00:00:00'; 
    }
  };

  const navigation = useNavigation();
  const { plantID, plantSpecies, plantDesc, daySchedule, dayTime, hubID } = route.params;
  const formattedDayTime = convertTimeDelta(dayTime);
  const [form, setForm] = useState({
    plantID: plantID,
    plantSpecies: plantSpecies,
    plantDesc: plantDesc,
    daySchedule: daySchedule.toString(), 
    dayTime: convertTimeDelta(dayTime) || '', 
    hubID: hubID,
  });

  const [scheduleForm, setScheduleForm] = useState({
    day_interval: daySchedule.toString(),
    watering_time: convertTimeDelta(dayTime) || '',
  });

 
  const formatTime = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{2})(?=\d)/g, '$1:');
    setForm({ ...form, dayTime: formattedValue });
  };

  const updateSchedule = async () => {
    try {
      const schedForm = new FormData();
      schedForm.append('day_interval', scheduleForm.day_interval);
      schedForm.append('watering_time', scheduleForm.watering_time);
      console.log(scheduleForm.watering_time)
      console.log(scheduleForm.day_interval)
      //body: JSON.stringify({'day_interval': 11, 'watering_time': `(06:00:00)`}),
      const response = await fetch(`https://irri-gator.com/update_sched/777/irrigator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'day_interval': scheduleForm.day_interval, 'watering_time': `(${scheduleForm.watering_time})`}),
      });
      const data = await response.text();
      if (data === "success") {
        console.log('Schedule updated successfully');
      } else {
        console.error('Schedule update failed');
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };  
  const editPlants = async () => {
    try {
      const response = await fetch('https://irri-gator.com/updatePlants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        updateSchedule()
        navigation.navigate('PotMenu', { hubID });
      } 
      else {
        console.error('update failed');
      }
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };  

  const deletePlant = async () => {
    try {
      const response = await fetch('https://irri-gator.com/deletePlant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantID, hubID }),
      });
      const data = await response.json();
      if (data.success) {
        navigation.navigate('PotMenu', { hubID });
      } else {
        console.error('delete failed');
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const waterPlant = async () => {
    try {
      const response = await fetch('https://irri-gator.com/test_water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Plant Manually Watered!");
        Alert.alert('Plant Watered!', '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        console.error('Watering failed');
      }
    } catch (error) {
      console.error('Error watering plant:', error);
    }
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
    const updatedForm = { ...form, daySchedule: !isNaN(parsedValue) ? parsedValue.toString() : '' };
    setForm(updatedForm);
    setScheduleForm({
      ...scheduleForm,
      day_interval: updatedForm.daySchedule,
    });
  }}
  value={form.daySchedule}
  placeholder="Plant Schedule (Days)"
  maxLength={2}
  keyboardType="numeric"
/>

<TextInput
  style={[styles.input, styles.largeInput]}
  onChangeText={dayTime => { formatTime(dayTime);
    const formattedValue = formatTime(dayTime);
    setScheduleForm({
      ...scheduleForm,
      watering_time: formattedValue, 
    });
  }}
  value={form.dayTime}
  maxLength={8}
  keyboardType="numeric"
  placeholder="Time of Day (HH:MM:SS)"
/>
      <Pressable
        style={styles.button}
        onPress={async () => {
          editPlants();
        }}
      >
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.waterButton]} 
        onPress={waterPlant} 
      >
        <Text style={styles.buttonText}>Water Plant</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={deletePlant}
      >
        <Text style={styles.buttonText}>Delete</Text>
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
    justifyContent: 'center',
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
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.avenir,
  },
  waterButton: {
    backgroundColor: 'green', 
  },
});

export default EditPlant;
