import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { auth } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={{
      padding:25,
      backgroundColor:'white',
      height:'100%',
      width:'100%'
    }}>
      <Header/>
      <EmptyState/>
    </View>
  )
}
