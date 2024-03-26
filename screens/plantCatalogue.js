import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const plantCatalogue = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('./images/cactus.jpg')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>
            <Text style={styles.plantName}>Plant Name{"\n"}</Text>
            <Text>Pot #{"\n"}</Text>
            <Text>Scientific Name{"\n"}</Text>
            <Text>Direct Sunlight{"\n"}</Text>
          </Text>
            <TouchableOpacity
                  onPress={() => {
                    // handle editingz
                  }}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Edit Info</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('./images/plant1.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>
            <Text style={styles.plantName}>Plant Name{"\n"}</Text>
            <Text>Pot #{"\n"}</Text>
            <Text>Scientific Name{"\n"}</Text>
            <Text>Direct Sunlight{"\n"}</Text>
          </Text>
            <TouchableOpacity
                  onPress={() => {
                    // handle editing
                  }}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Edit Info</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('./images/plant2.jpg')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>
            <Text style={styles.plantName}>Plant Name{"\n"}</Text>
            <Text>Pot #{"\n"}</Text>
            <Text>Scientific Name{"\n"}</Text>
            <Text>Direct Sunlight{"\n"}</Text>
          </Text>
            <TouchableOpacity
                  onPress={() => {
                    // handle editingz
                  }}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Edit Info</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('./images/plant3.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>
            <Text style={styles.plantName}>Plant Name{"\n"}</Text>
            <Text>Pot #{"\n"}</Text>
            <Text>Scientific Name{"\n"}</Text>
            <Text>Direct Sunlight{"\n"}</Text>
          </Text>
          <TouchableOpacity
                onPress={() => {
                  // handle editingz
                }}
                style={styles.btn}>
                <Text style={styles.btnText}>Edit Info</Text>
           </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'contain',
  },
  textCenter: {
    textAlign: 'center',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'green',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#00FF00',
    marginTop: -20,
    marginLeft: -20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  plantName:{
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default plantCatalogue;
