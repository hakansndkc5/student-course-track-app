import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';



const AllCoursesList = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);


  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  console.log('Route params:', params);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Dersleri alma hatası:', error.message);
        // Hata durumunda kullanıcıya bildirim gösterme
      }
    };

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
    fetchCourses();
    fetchStudentCourses();
  }, []);
  const updateStudentCourses = async () => {
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
  const handleCourseSelect = async (courseId) => {
    try {
      const courseName = courses.find(course => course.courseId === courseId).CourseName;
      await updateStudentCourses();

      const isCourseAlreadyAdded = studentCourses.some(course => course.courseId === courseId);
      
      if (isCourseAlreadyAdded) {
        // Ders zaten eklenmiş, kullanıcıya uyarı ver
        Alert.alert(
          'Ders Ekleme Hatası',
          `Bu ders zaten eklenmiş: ${courseName}`,
          [
            {
              text: 'Tamam',
              onPress: () => console.log('Kullanıcı uyarıyı onayladı'),
            },
          ],
          { cancelable: false }
        );
      } else {
        // Ders henüz eklenmemiş, ekleme işlemi yap
        const confirmation = await new Promise((resolve) => {
          Alert.alert(
            'Ders Ekleme Onayı',
            `Bu dersi eklemek istiyor musunuz: ${courseName}`,
            [
              {
                text: 'Vazgeç',
                onPress: () => resolve(false),
                style: 'cancel',
              },
              {
                text: 'Ekle',
                onPress: () => resolve(true),
              },
            ],
            { cancelable: false }
          );
        });
  
        if (confirmation) {
          const response = await axios.post('http://localhost:3000/enroll', { courseId, studentId: params.studentId });
          console.log('Enrollment response:', response.data);
        }
      }
    } catch (error) {
      console.error('Ders kaydı alma hatası:', error.message);
      // Hata durumunda kullanıcıya bildirim gösterme
    }
  };
  
  
  
  

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tüm Dersler</Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.courseId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCourseSelect(item.courseId)} style={styles.courseItem}>
  <Text style={styles.courseName}>{item.CourseName}</Text>
  <Text style={styles.courseCode}>{item.CourseCode}</Text>
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
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

export default AllCoursesList;
