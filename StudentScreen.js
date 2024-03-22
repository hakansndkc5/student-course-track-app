import React, { useState, useEffect } from 'react';
import { Button,View, Text, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const StudentScreen = ({ navigation }) => {
  const [studentCourses, setStudentCourses] = useState([]);
  const route = useRoute();
  const { params } = route;

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/courses?studentId=${params.studentId}`);
        setStudentCourses(response.data.courses || []);
        console.log(response.data.courses);
      } catch (error) {
        // Hata durumunda kullanıcıya bildirim gösterme
        Alert.alert('Hata', 'Dersleri alma sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.', [
          { text: 'Tamam' },
        ]);
      }
    };

    fetchStudentCourses();
  }, [params.studentId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Öğrenci Dersleri</Text>
        {studentCourses.length > 0 ? (
          <FlatList
            data={studentCourses}
            keyExtractor={(item) => item.courseId.toString()}
            renderItem={({ item }) => (
              <View style={styles.courseItem}>
                <Text style={styles.courseName}>{item.CourseName}</Text>
                <Text style={styles.courseCode}>{item.CourseCode}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noCoursesText}>Henüz ders bulunmamaktadır.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
  },
  courseItem: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
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
  noCoursesText: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});

export default StudentScreen;
