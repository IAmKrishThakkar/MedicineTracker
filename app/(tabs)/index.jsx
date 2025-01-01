import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { auth } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => router.push('login')} style={styles.buttonLogOut}>
        <Text style={styles.buttonLogOutText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    buttonLogOut: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    buttonLogOutText: {
        fontSize: 17,
        color: Colors.PRIMARY,
        textAlign: 'center',
    },
});
