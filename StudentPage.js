import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const StudentPage = ({ navigation }) => {
  const route = useRoute();
  const { params } = route;
  
  const navigateToCourses = () => {
    navigation.navigate('StudentScreen', { studentId: params.studentId }); // Ders seçim sayfasına yönlendir
  };

  const navigateToCourseAdd = () => {
    navigation.navigate('AllCoursesList',{ studentId: params.studentId }); // Ders ekleme sayfasına yönlendir
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={navigateToCourses}>
        <Text style={styles.cardText}>Dersler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={navigateToCourseAdd}>
        <Text style={styles.cardText}>Ders Ekleme</Text>
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

export default StudentPage;
