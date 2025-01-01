import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const router=useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./../../assets/images/login.png')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Stay on Track, Stay Healthy!</Text>
        <Text style={styles.subtitle}>
          Take control of your medication with us. Stay consistent, Stay confident
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>router.push('login/signIn')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Note: By Clicking Continue Button, You agree to our terms and conditions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 350,
    height: 450,
    borderRadius: 23,
  },
  contentContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 23,
    marginTop: 25,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  note: {
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
});
