import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import API from '../config/api';

export default function SubjectsScreen({
  route,
  navigation,
}) {

  const { semester } = route.params;

  const [subjects, setSubjects] = useState({});

  const loadSubjects = async () => {

    try {

      const res = await API.get('/files/myfiles');

      setSubjects(
        res.data?.[semester] || {}
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        {semester}
      </Text>

      <View style={styles.grid}>

        {
          Object.keys(subjects).map((subject) => (

            <TouchableOpacity
              key={subject}
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  'SubjectFiles',
                  {
                    semester,
                    subject,
                  }
                )
              }
            >

              <Text style={styles.subject}>
                {subject}
              </Text>

              <Text style={styles.count}>
                {subjects[subject].length} Files
              </Text>

            </TouchableOpacity>
          ))
        }

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#081229',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  grid: {
    gap: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
  },

  subject: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },

  count: {
    marginTop: 10,
    color: '#2563eb',
    fontWeight: 'bold',
  },
});