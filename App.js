import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import AdminLogin from './AdminLogin';
import AdminScreen from './AdminScreen';
import StudentScreen from './StudentScreen';
import CourseAddScreen from './CourseAdd';
import AdminPage from './AdminPage';
import AllCoursesList from './CourseSelect';
import StudentPage from './StudentPage';
import AdminStudentList from './AdminStudentList';
import StudentCourses from './StudentCourses';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="StudentScreen" component={StudentScreen} />
        <Stack.Screen name="CourseAddScreen" component={CourseAddScreen} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="AllCoursesList" component={AllCoursesList} />
        <Stack.Screen name="StudentPage" component={StudentPage} />
        <Stack.Screen name="AdminStudentList" component={AdminStudentList} />
        <Stack.Screen name="StudentCourses" component={StudentCourses} />






      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { borderRightWidth: 1, borderColor: '#ccc' }]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Öğrenci Girişi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={styles.buttonText}>Admin Girişi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
