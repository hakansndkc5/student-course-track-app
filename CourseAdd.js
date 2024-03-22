// CourseAddScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const CourseAddScreen = ({ navigation }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleAddCourse = async () => {
    try {
      if (!courseName || !courseCode) {
        throw new Error('Tüm alanlar doldurulmalıdır.');
      }

      const response = await axios.post('http://localhost:3000/course', {
        courseName,
        courseCode,
      });

      Alert.alert('Başarılı', response.data.id ? 'Ders eklendi' : 'Ders eklenemedi');
    } catch (error) {
      console.error('Ders ekleme hatası:', error);
      Alert.alert('Hata', 'Ders eklerken bir hata oluştu');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>Ders Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Ders Adı"
        value={courseName}
        onChangeText={(text) => setCourseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ders Kodu"
        value={courseCode}
        onChangeText={(text) => setCourseCode(text)}
      />
      <Button title="Ders Ekle" onPress={handleAddCourse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default CourseAddScreen;
