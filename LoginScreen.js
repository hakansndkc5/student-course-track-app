import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import StudentScreen from './StudentScreen';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
  
      const studentIdResponse = await axios.get(`http://localhost:3000/student/id?username=${username}`);
      const studentId = studentIdResponse.data.studentId;
  
      console.log(response.data.message);
      navigation.navigate('StudentPage', { studentId });
      
    } catch (error) {
      console.error('Giriş hatası:', error.message);
      // TODO: Hata durumunda kullanıcıya bildirim gösterme
    }
  };
  

  return (
    <View style={styles.container}>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
   
      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
      autoCapitalize='none'
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Şifre</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Giriş Yap" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
