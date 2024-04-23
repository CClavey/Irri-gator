import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
//CC

const { width, height } = Dimensions.get('window');

import Plant1 from '../assets/plant1.png';
import Plant2 from '../assets/plant2.png';
import Plant3 from '../assets/plant3.png';
import Plant4 from '../assets/plant4.png';
import Plant5 from '../assets/plant5.png';

const PotMenu = ({ navigation, route }) => {
  const battery = 0;
  const reservoir = 0;
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hubID } = route.params;

  useEffect(() => {
    fetchPots();
  }, []);

  const fetchPots = async () => {
    try {
      const response = await fetch('https://irri-gator.com/plantData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hubID }), 
      });
      const responseData = await response.text(); 

      if (!responseData) {
        setPlants([]);
        setLoading(false);
        return;
      }

      const parsedData = responseData.match(/\(([^)]+)\)/g).map(tuple => {
        let values = tuple.match(/\(([^)]+)\)/)[1].split(',').map(value => value.trim());
        //I hate strings and splitting strings
        if (values.length > 4) {
          // Handle case where plantID has multiple parentheses because for some reason the first plantID has two
          values = values.slice(0, 5); 
          values[0] = values[0].replace(/\(/g, ''); // Remove any remaining parentheses because the first ID has two and it sucks
        }
        return {
          plantID: parseInt(values[0]), 
          plantSpecies: values[1].slice(1, -1), 
          plantDesc: values[2],
          daySchedule: parseInt(values[3]), 
          dayTime: values[4],
        };
      });      
      setPlants(parsedData); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setPlants([]); 
      setLoading(false); 
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchPots();
    }, [])
  );
  
  const Battery = () => {
    const level = Math.floor(Math.random() * 101); // Remove for actual implementation
    //const level = getBattery("777", "irrigator")//{"pot_data": [75, 55]}
    //const level = battery;
    const batteryColor = level >= 50 ? 'green' : level >= 20 ? 'orange' : 'red';
    return (
      <View style={[styles.symbolContainer, { backgroundColor: 'grey' }]}>
        <View style={styles.batteryTop} />
        <View style={[styles.batteryFill, { height: `${level}%`, backgroundColor: batteryColor }]} />
      </View>
    );
  };
  
  
  const Reservoir = () => {
    const level = Math.floor(Math.random() * 101); //Remove for actual implementation
    //const level = getReservoir("777", "irrigator")
    //const level = reservoir;
    const reservoirColor = 'grey'; 
    let waterColor;
    if (level >= 50) {
      waterColor = 'blue'; 
    } else if (level >= 20) {
      waterColor = 'blue'; 
    } else {
      waterColor = 'blue';
    }
    return (
      <View style={[styles.reservoirContainer, { backgroundColor: reservoirColor }]}>
        <View style={[styles.reservoirLevel, { height: `${level}%`, backgroundColor: waterColor }]} />
        <View style={[styles.bottleLine, { top: '25%' }]} />
        <View style={[styles.bottleLine, { top: '50%' }]} />
        <View style={[styles.bottleLine, { top: '75%' }]} />
      </View>
    );
  };

  const getRandomImage = () => {
    const imageNames = [Plant1, Plant2, Plant3, Plant4, Plant5]; 
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return imageNames[randomIndex];
  };

  const getBattery = async (hubID, plantID) => {
    try {
        const response = await fetch(`https://irri-gator.com/get_pot_data/${hubID}/${plantID}`);
        const data = await response.json();
        console.log("RAW DATA ", data)
        //battery = data.pot_data[0]; 
        //reservoir = data.pot_data[1];
        return data.pot_data[0];
    } catch (error) {
        console.error('Error fetching battery data:', error);
        return;
    }
};

const getReservoir = async (hubID, plantID) => {
    try {
        const response = await fetch(`https://irri-gator.com/get_pot_data/${hubID}/${plantID}`);
        const data = await response.json();
        return data.pot_data[1]; 
    } catch (error) {
        console.error('Error fetching reservoir data:', error);
        return 0;
    }
};
//<Battery level={getBattery(hubID, item.plantID)}/> //hubID is 777 for testing so just hard set it to that
//<Reservoir level = {getReservoir(hubID, item.plantID)}/>
//<Battery /> 
//<Reservoir/>
  const renderItem = ({ item }) => {
    const randomImage = getRandomImage();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('EditPlant', { plantID: item.plantID, plantSpecies: item.plantSpecies, plantDesc: item.plantDesc, daySchedule: item.daySchedule, dayTime: item.dayTime, hubID })}>
        <View style={styles.item}>
          <Image source={randomImage} style={styles.image} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.plantName}>{item.plantSpecies}</Text>
            <Text>Watering Schedule: {item.daySchedule} days</Text>
          </View>
          <Battery level={getBattery}/> 
          <Reservoir />
        </View>
      </TouchableOpacity>
    );
  };  
  

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : plants.length === 0 ? (
        <Text>No plants, add one below</Text>
      ) : (
        <FlatList
          data={plants}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('AddPlant', { hubID })} style={styles.addButton}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorSkyblue,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  batteryContainer: {
    width: 30,
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'flex-end',
  },
  batteryLevel: {
    flex: 1,
    borderRadius: 3,
  },
  reservoirContainer: {
    width: 40,
    height: 40, // Adjust the height to make it more rectangular
    borderRadius: 10, // Adjust the borderRadius to make it rounded
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden', 
  },
  bottleLine: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: 2,
  },
  reservoirLevel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue', 
  },
  symbolContainer: {
    width: 20,
    height: 40, 
    //borderRadius: 5,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  batteryFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green', 
    //borderRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  itemTextContainer: {
    flex: 1,
  },
  plantName: {
    fontWeight: 'bold',
    fontSize: FontSize.size_18,
    marginBottom: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Color.colorSteelblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSign: {
    color: Color.colorWhite,
    fontSize: FontSize.size_24,
    fontWeight: 'bold',
  },
  battery: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  reservoir: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  batteryTop: {
    width: 13,
    height: 5,
    backgroundColor: 'grey',
    position: 'absolute',
    borderRadius: 0,
    borderColor: 'black', 
    borderWidth: 1, 
    top: -5,
    left: 2,
  },
  
});

export default PotMenu;
