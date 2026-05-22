import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import API from '../api';

export default function SharedSubjectsScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const { groupCode, semester } = route.params;

  const [subjects, setSubjects] = useState({});

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const res = await API.get(`/files/shared/${groupCode}`);
      setSubjects(res.data.grouped[semester]);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.inner}>

        <Text style={styles.semesterTitle}>
          {semester}
        </Text>

        <View style={styles.grid}>

          {
            subjects &&
            Object.keys(subjects).map((subject, index) => (

              <TouchableOpacity
                key={subject}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('SharedSubjectFiles', {
                    groupCode,
                    semester,
                    subject
                  })
                }
              >

                <View style={styles.cardTop}>

                  <Text style={styles.subjectName}>
                    {subject}
                  </Text>

                  <Text style={styles.fileCount}>
                    {subjects[subject].length} Files
                  </Text>

                </View>

              </TouchableOpacity>
            ))
          }

        </View>

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

  semesterTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  grid: {
    gap: 15,
  },

  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subjectName: {
    fontSize: 18,
    fontWeight: '600',
  },

  fileCount: {
    fontSize: 14,
    color: 'gray',
  },

});