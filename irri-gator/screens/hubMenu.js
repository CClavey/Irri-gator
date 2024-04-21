import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
//CC

const HubMenu = ({ navigation, route }) => {
  const { email } = route.params;
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHubs();
  }, []);

  const fetchHubs = async () => {
    try {
      const response = await fetch('https://irri-gator.com/hubData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });
      const responseData = await response.text();
      if (!responseData) {
        setHubs([]);
        setLoading(false);
        return;
      }
      const parsedData = responseData.match(/\(([^)]+)\)/g).map(tuple => {
        const values = tuple.split(',').map(value => value.trim());
        return {
          hubID: parseInt(values[1]),
          hubName: values[2].slice(1, -1),
        };
      });

      setHubs(parsedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setHubs([]); 
      setLoading(false); 
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchHubs();
    }, [])
  );
  
  const deleteHub = async (hubID) => {
    try {
      const response = await fetch('https://irri-gator.com/deleteHub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hubID }), 
      });
      const data = await response.json();
      if (data.success) {
        
        fetchHubs();
        navigation.navigate('HubMenu', { email }); 
      } else {
        console.error('delete failed');
      }
    } catch (error) {
      console.error('Error deleting hub:', error);
    }
  };
  

  const handleHubPress = (hubID) => {
    navigation.navigate('PotMenu', { hubID });
  };

  const renderHubImage = () => {
    return <Image source={require('../assets/hub.png')} style={styles.hubImage} />;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : hubs.length === 0 ? (
        <Text>No hubs found, add one below</Text>
      ) : (
        <View>
          {hubs.map((item) => (
            <TouchableOpacity key={item.hubID} onPress={() => handleHubPress(item.hubID)}>
            <View style={styles.item}>
              <View style={styles.imageContainer}>{renderHubImage()}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>Hub ID: {item.hubID}</Text>
                <Text style={styles.itemText}>Hub Name: {item.hubName}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteHub(item.hubID)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('AddHub', { email })} style={styles.addButton}>
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
  imageContainer: {
    marginRight: 20,
  },
  hubImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  itemText: {
    fontSize: FontSize.size_20,
  },
  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HubMenu;
