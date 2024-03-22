// AdminPage.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AdminScreen from './AdminScreen';
import CourseAddScreen from './CourseAdd';

const AdminPage = ({ navigation }) => {
  const navigateToStudentAdd = () => {
    navigation.navigate('AdminScreen'); // Öğrenci ekleme sayfasına yönlendir
  };

  const navigateToCourseAdd = () => {
    navigation.navigate('CourseAddScreen'); // Ders ekleme sayfasına yönlendir
  };
  const navigateToList = () => {
    navigation.navigate('AdminStudentList'); // Ders ekleme sayfasına yönlendir
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={navigateToStudentAdd}>
        <Text style={styles.cardText}>Öğrenci Ekleme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={navigateToCourseAdd}>
        <Text style={styles.cardText}>Ders Ekleme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={navigateToList}>
        <Text style={styles.cardText}>Öğrencileri Listele</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminPage;
