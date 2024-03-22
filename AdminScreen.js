// AdminScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import CourseAddScreen from './CourseAdd';

const AdminScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [sinif, setSinif] = useState('');

  const handleAddStudent = async () => {
    try {
      if (!ad || !soyad || !sinif) {
        throw new Error('Tüm alanlar doldurulmalıdır.');
      }
      console.log('Request data:', { username, password, ad, soyad, sinif });

      const response = await axios.post('http://localhost:3000/ogrenci', {
        username,
        password,
        ad,
        soyad,
        sinif,
      });

      Alert.alert('Başarılı', response.data.id ? 'Öğrenci eklendi' : 'Öğrenci eklenemedi');
    } catch (error) {
      console.error('Öğrenci ekleme hatası:', error);
      Alert.alert('Hata', 'Öğrenci eklerken bir hata oluştu');
    }
  };

  return (
    <View style={styles.container}>
            <Button title="Geri Dön" onPress={() => navigation.goBack()} />

      <Text style={styles.headerText}>Admin paneline hoşgeldiniz.</Text>
      <Text style={styles.headerText}>Öğrenci Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Öğrenci Adı"
        value={ad}
        onChangeText={(text) => setAd(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Öğrenci Soyadı"
        value={soyad}
        onChangeText={(text) => setSoyad(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sınıf"
        value={sinif}
        onChangeText={(text) => setSinif(text)}
      />
      <Button title="Öğrenci Ekle" onPress={handleAddStudent} />
      <Button title="COURSE EKLE" onPress={() => navigation.navigate('CourseAddScreen')} />



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
    marginBottom: 70,
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

export default AdminScreen;
