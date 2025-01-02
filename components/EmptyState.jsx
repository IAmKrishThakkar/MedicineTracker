import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ConstantString from '../constant/ConstantString'
import Colors from '../constant/Colors'

export default function EmptyState() {
  return (
    <View style={{
        marginTop:80,
        display:'flex',
        alignItems:'center'
    }}>
      <Image source={require('./../assets/images/medicine.png')}
        style={{
            width: 150,
            height: 150,
        }}
      />
      <Text style={{
        fontSize: 35,
        fontWeight:'bold',
        marginTop:30
      }}>{ConstantString.NoMedication}</Text>
      <Text style={{
        fontSize:16,
        color:Colors.DARK_GRAY,
        textAlign:'center',
        marginTop:20
      }}>{ConstantString.MedicationSubText}</Text>
      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        width:'100%',
        marginTop:30
      }}>
        <Text style={{
            textAlign:'center',
            fontSize:17,
            color:'white'
        }}>{ConstantString.AddNewMedication}</Text>
      </TouchableOpacity>
    </View>
  )
}