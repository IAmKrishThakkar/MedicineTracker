import { View, Text } from 'react-native'
import React from 'react'
import AddMedHeader from '../../components/AddMedHeader'
import AddMedForm from '../../components/AddMedForm'

export default function AddNewMedication() {
  return (
    <View>
        <AddMedHeader/>
        <AddMedForm/>
    </View>
  )
}