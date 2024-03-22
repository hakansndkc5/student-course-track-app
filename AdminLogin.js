import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import AdminScreen from './AdminScreen';
import AdminPage from './AdminPage';

const AdminLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adminlogin', {
        username,
        password,
      });
  
      console.log(response.data.message,"Admin girişi ");
      navigation.navigate('AdminPage');
    } catch (error) {
      console.error('Giriş hatası:', error.message);
      
      if (error.response) {
        console.error('HTTP Hata Kodu:', error.response.status);
        console.error('HTTP Hata Açıklaması:', error.response.data.message);
  
        if (error.response.status === 401) {
       
          alert('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
        }
      }
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

export default AdminLogin;
