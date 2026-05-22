
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SubjectFilesScreen({ route }) {
  const { subject } = route.params;

  const files = [
    'Unit 1 Notes.pdf',
    'Assignment.docx',
    'Important Questions.pdf',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{subject}</Text>

      {files.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.fileName}>{item}</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.btnText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.btnText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  fileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  downloadBtn: {
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  deleteBtn: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
