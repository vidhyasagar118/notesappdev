import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { pick } from '@react-native-documents/picker';
import API from '../config/api';
export default function DashboardScreen({ navigation }) {

  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [files, setFiles] = useState({});
  const [groupCode, setGroupCode] = useState('');
  const [sharedFiles, setSharedFiles] = useState(null);

  // LOAD FILES
  const loadFiles = async () => {
    try {
      const res = await API.get('/files/myfiles');
      setFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const pickFiles = async () => {

  try {

    const results = await pick({
      allowMultiSelection: true,
    });

    setFilesToUpload(results);

  } catch (err) {
    console.log(err);
  }
};

  // UPLOAD FILE
  const uploadFile = async () => {
    if (!semester || !subject || filesToUpload.length === 0) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    const formData = new FormData();
    formData.append('semester', semester);
    formData.append('subject', subject);

    filesToUpload.forEach(file => {
      formData.append('files', {
        uri: file.uri,
        type: file.mimeType || 'application/octet-stream',
        name: file.name,
      });
    });

    try {
      await API.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Files Uploaded');

      setSemester('');
      setSubject('');
      setFilesToUpload([]);

      loadFiles();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Upload Failed');
    }
  };

  // OPEN SHARED FILES
  const openShared = async () => {
    try {
      const res = await API.get(`/files/shared/${groupCode}`);
      setSharedFiles(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert('Wrong Group Code');
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>NOTES.COM</Text>

        <View style={styles.userBox}>
          <Text style={styles.userText}>User: abhi</Text>
          <Text style={styles.groupText}>Group Code: 7J3C0W</Text>
        </View>
      </View>

      {/* UPLOAD */}
      <Text style={styles.heading}>Upload File</Text>

      {/* Semester Select */}
      <View style={styles.semesterWrap}>
        {[
          'Semester 1','Semester 2','Semester 3','Semester 4',
          'Semester 5','Semester 6','Semester 7','Semester 8',
        ].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.semBtn,
              semester === item && { backgroundColor: '#1d4ed8' }
            ]}
            onPress={() => setSemester(item)}
          >
            <Text style={styles.semBtnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Enter Subject"
        placeholderTextColor="#fff"
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      {/* FILE PICKER */}
      <TouchableOpacity style={styles.inputBox} onPress={pickFiles}>
        <Text style={styles.inputText}>
          {filesToUpload.length > 0
            ? `${filesToUpload.length} files selected`
            : 'Choose Files'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBtn} onPress={uploadFile}>
        <Text style={styles.btnText}>Upload</Text>
      </TouchableOpacity>

      {/* MY SEMESTERS */}
      <Text style={styles.heading}>My Semesters</Text>

      <View style={styles.grid}>
        {Object.keys(files).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.semesterCard}
            onPress={() =>
              navigation.navigate('Subjects', { semester: item })
            }
          >
            <Text style={styles.semesterText}>{item}</Text>
            <Text style={styles.click}>click</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SHARED */}
      <Text style={styles.heading}>Open Shared Files</Text>

      <TextInput
        placeholder="Enter Group Code"
        placeholderTextColor="#fff"
        style={styles.input}
        value={groupCode}
        onChangeText={setGroupCode}
      />

      <TouchableOpacity style={styles.uploadBtn} onPress={openShared}>
        <Text style={styles.btnText}>Open</Text>
      </TouchableOpacity>

      {/* SHARED RESULT */}
      {sharedFiles && (
        <View>
          <Text style={styles.heading}>
            Shared By: {sharedFiles.owner}
          </Text>

          <View style={styles.grid}>
            {Object.keys(sharedFiles.grouped).map((sem, i) => (
              <TouchableOpacity
                key={i}
                style={styles.semesterCard}
                onPress={() =>
                  navigation.navigate('SharedSubjects', {
                    semester: sem,
groupCode: groupCode
                  })
                }
              >
                <Text style={styles.semesterText}>{sem}</Text>
                <Text style={styles.click}>click</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },

  header: {
    backgroundColor: '#081229',
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: { color: '#3b82f6', fontSize: 28, fontWeight: 'bold' },

  userBox: { backgroundColor: '#1e293b', padding: 10, borderRadius: 12 },

  userText: { color: '#fff', fontWeight: 'bold' },

  groupText: { color: '#60a5fa', fontSize: 12 },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },

  input: {
    backgroundColor: '#000',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 14,
    padding: 15,
  },

  inputBox: {
    backgroundColor: '#000',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 14,
    padding: 15,
  },

  inputText: { color: '#fff' },

  uploadBtn: {
    backgroundColor: '#2563eb',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    width: 140,
    alignItems: 'center',
    marginBottom: 20,
  },

  btnText: { color: '#fff', fontWeight: 'bold' },

  semesterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },

  semBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },

  semBtnText: { color: '#fff' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  semesterCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },

  semesterText: { fontSize: 20, fontWeight: 'bold' },

  click: { color: '#2563eb', marginTop: 5 },
});