import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedHeader from '../../components/AddMedHeader'
import AddMedForm from '../../components/AddMedForm'

export default function AddNewMedication() {
  return (
    <ScrollView>
        <AddMedHeader/>
        <AddMedForm/>
    </ScrollView>
  )
}