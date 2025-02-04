import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AddMedHeader() {
  const router = useRouter();
  return (
    <View>
      <Image source={require('./../assets/images/consult.png')}
        style={{
          height: 280,
          width: '100%',
        }}
      />
      <TouchableOpacity style={{
        position: 'absolute',
        padding: 25
      }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}