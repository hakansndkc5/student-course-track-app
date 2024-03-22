import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ogrenci');
        //console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Öğrencileri alma hatası:', error.message);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentSelect = (id) => {
    console.log(id,"id değeri alınıd");
    navigation.navigate('StudentCourses', { id  });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tüm Öğrenciler</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStudentSelect(item.id)} style={styles.studentItem}>
            <Text style={styles.studentName}>{item.ad} {item.soyad}</Text>
            <Text style={styles.studentDetails}>{item.sinif }.sınıf</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
  },
  studentItem: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  studentDetails: {
    fontSize: 16,
    color: '#555',
  },
});

export default AdminStudentList;
