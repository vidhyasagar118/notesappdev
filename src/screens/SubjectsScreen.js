import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import API from '../config/api';

export default function SubjectsScreen({ route }) {

  const { semester, subject } = route.params;

  const [files, setFiles] = useState([]);

  // LOAD FILES
  const loadFiles = async () => {
    try {
      const res = await API.get('/files/myfiles');

      // same as web: res.data[semester][subject]
      setFiles(res.data[semester][subject] || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // DELETE FILE
  const deleteFile = async (id) => {
    try {
      await API.delete(`/files/${id}`);
      loadFiles();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Delete failed');
    }
  };

  // RENDER FILE CARD (same as SubjectCard component)
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.fileName}>
        {item.originalname || 'File'}
      </Text>

      <View style={styles.actions}>
        
        {/* OPEN / DOWNLOAD */}
        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => {
            Alert.alert('Open File', item.originalname);
            // yaha linking ya download logic laga sakte ho
          }}
        >
          <Text style={styles.btnText}>Open</Text>
        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteFile(item._id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.semester}>{semester}</Text>
      </View>

      {/* FILE LIST */}
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Files Found
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  header: {
    backgroundColor: '#081229',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },

  subject: {
    color: '#3b82f6',
    fontSize: 26,
    fontWeight: 'bold',
  },

  semester: {
    color: '#fff',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
  },

  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  openBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
  },

  deleteBtn: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 10,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
});