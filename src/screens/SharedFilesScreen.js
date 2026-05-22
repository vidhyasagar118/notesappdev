import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import API from '../api';
import SubjectCard from '../components/SubjectCard';

export default function SharedSubjectFilesScreen() {

  const route = useRoute();

  const { groupCode, semester, subject } = route.params;

  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const res = await API.get(`/files/shared/${groupCode}`);

      setFiles(
        res.data.grouped[semester][subject]
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.inner}>

        <View style={styles.header}>

          <Text style={styles.title}>
            {subject}
          </Text>

          <Text style={styles.semester}>
            {semester}
          </Text>

        </View>

        <SubjectCard
          files={files}
        />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inner: {
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  semester: {
    fontSize: 16,
    color: 'gray',
  },

});