
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function SubjectsScreen({ route, navigation }) {
  const { semester } = route.params;

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Programming',
    'English',
    'DBMS',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{semester}</Text>

      {subjects.map((subject, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            navigation.navigate('SubjectFiles', {
              subject,
            })
          }
        >
          <Text style={styles.cardText}>{subject}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 15,
    marginBottom: 15,
  },

  cardText: {
    color: 'white',
    fontSize: 20,
  },
});
