import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import API from '../config/api';
export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    try {

     await API.post('/auth/register', {
  name,
  password,
});
      Alert.alert('Success', 'Account Created');

      navigation.navigate('Login');

    } catch (err) {

      console.log(err.response?.data || err.message);

      Alert.alert(
        'Error',
        JSON.stringify(err.response?.data || err.message)
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>NOTES.COM</Text>

      <View style={styles.card}>

        <Text style={styles.heading}>Create Account</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}>

          <Text style={styles.btn}>Register</Text>

        </TouchableOpacity>

        <Text style={styles.text}>
          Already have account?
        </Text>

        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('Login')}>

          <Text style={styles.outlineText}>
            Login
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#081229',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    color: '#3b82f6',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    width: '85%',
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 20,
  },

  heading: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#374151',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  btn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  text: {
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: '#4b5563',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  outlineText: {
    color: '#60a5fa',
    fontSize: 18,
  },
});