import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StudentCourses = ({ navigation, route }) => {
  const { id } = route.params;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/courses?studentId=${id}`);
        setCourses(response.data.courses);
        console.log(response.data);
      } catch (error) {
        console.error('Öğrencinin derslerini alma hatası:', error.message);
      }
    };

    fetchStudentCourses();
  }, [id]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Öğrencinin Dersleri</Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.courseId.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={styles.courseName}>{item.CourseName}</Text>
            <Text style={styles.courseCode}>{item.CourseCode}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#3498db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#3498db',
  },
  courseItem: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  courseCode: {
    fontSize: 16,
    color: '#555',
  },
});

export default StudentCourses;
