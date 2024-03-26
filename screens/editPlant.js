import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Square = ({ backgroundColor }) => {
  const [height, setHeight] = useState(0);
  return (
    <View
      onLayout={(e) => setHeight(e.nativeEvent.layout.width)}
      style={{ flex: 1, height, backgroundColor }}
    />
  );
};

const editPlant = () => {
   const [form, setForm] = useState({
    nickname: '',
    sci_name: '',
    sunlight: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>

          <View style={styles.header}>
            <Text style={styles.title}>
              Edit Plant
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={nickname => setForm({ ...form, nickname })}
                placeholder="Nickname"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.nickname} />
            </View>

            <View style={styles.input}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={sci_name => setForm({ ...form, sci_name })}
                placeholder="Scientific Name(auto fill)"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.sci_name} />
            </View>

            <View>
              <Text style={styles.weather}>Suggested sunlight exposure (auto fill)</Text>
              <Text style={styles.weather}>Suggested climate exposure (auto fill)</Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Square backgroundColor="red" />
                <Square backgroundColor="pink" />
                <Square backgroundColor="orange" />
              </View>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Direct</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Partial</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Shade</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAwareScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    fontSize: 40,
    fontFamily: 'Gotu',
    alignItems: 'left',
    justifyContent: 'center',
    marginVertical: 2,
    paddingHorizontal: 33,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
    borderColor: '#ffffff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  weather: {
    fontSize: '14px',
    fontFamily: 'Avenir',
    fontWeight: 500,
    lineHeight: '19.12px',
    color: '#7EBF38',
  }
});

export default editPlant;

