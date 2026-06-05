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

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {

      const res = await API.post('/auth/login', {
        name: username,
        password,
      });

      console.log(res.data);

      navigation.replace('Dashboard');

    } catch (err) {

      console.log(err.response?.data || err.message);
  console.log("MESSAGE:", err.message);
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);

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

        <Text style={styles.heading}>Login</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
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
          onPress={handleLogin}>

          <Text style={styles.btn}>
            Login
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}>

          <Text style={styles.link}>
            Create Account
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
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#374151',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  btn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  link: {
    color: '#60a5fa',
    textAlign: 'center',
    marginTop: 20,
  },
});