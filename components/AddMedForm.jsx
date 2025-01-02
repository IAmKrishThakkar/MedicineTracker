import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from '../constant/Options'
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText } from '../service/ConvertDateTime';

export default function AddMedForm() {
    const [formData, setFormData] = useState();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker,setShowTimePicker]=useState(false);
    const onHandleinputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        console.log(formData);
    }
    return (
        <View style={{
            padding: 25,
        }}>
            <Text style={styles.header}>Add New Medication</Text>
            <View style={styles.inputGroup}>
                <Ionicons name="medkit-outline" size={24} color="black" style={styles.icon} />
                <TextInput placeholder='Medicine Name' style={styles.textInput}
                    onChangeText={(value) => onHandleinputChange('name', value)}
                />
            </View>
            {/* Type List */}
            <FlatList
                data={TypeList}
                horizontal
                style={{
                    marginTop: 5
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.inputGroup, { marginLeft: 10 }, { borderRadius: 30 }, { borderColor: Colors.DARK_GRAY }
                        , { backgroundColor: item.name == formData?.type?.name ? Colors.PRIMARY : 'white' }
                    ]}
                        onPress={() => onHandleinputChange('type', item)}
                    >
                        <Text style={[styles.typeText,
                        { color: item.name == formData?.type?.name ? 'white' : 'black' }
                        ]}>
                            {item?.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            {/* Dose Input */}
            <View style={styles.inputGroup}>
                <Ionicons name="eyedrop-outline" size={24} color="black" style={styles.icon} />
                <TextInput placeholder='Dose Ex. 2 , 5ml' style={styles.textInput}
                    onChangeText={(value) => onHandleinputChange('dose', value)}
                />
            </View>
            {/* When to tack DropDown */}
            <View style={styles.inputGroup}>
                <Ionicons name="time-outline" size={24} color="black" style={styles.icon} />
                <Picker
                    selectedValue={formData?.when}
                    onValueChange={(value, index) => onHandleinputChange('when', value)}
                    style={{
                        width: '90%',
                    }}
                >
                    {WhenToTake.map((item, index) => (
                        <Picker.Item label={item} value={item} key={index} />
                    ))}
                </Picker>
            </View>
            {/* Start and end date  */}
            <View style={styles.dateGroup}>
                <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]}
                    onPress={()=>setShowStartDate(true)}
                >
                    <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>{formatDateForText(formData?.startDate) ?? 'Start Date'}</Text>
                </TouchableOpacity>
                {showStartDate && <RNDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleinputChange('startDate', FormatDate(event.nativeEvent.timestamp))
                            setShowStartDate(false);
                        }}
                        value={formData?.startDate ? new Date(formData.startDate) : new Date()}
                    />}
                <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} 
                    onPress={()=>setShowEndDate(true)}
                >
                    <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>{formatDateForText(formData?.endDate) ?? 'End Date'}</Text>
                </TouchableOpacity>
                {showEndDate && <RNDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleinputChange('endDate', FormatDate(event.nativeEvent.timestamp))
                            setShowEndDate(false);
                        }}
                        value={new Date(formData?.endDate)??new Date()}
                    />}
            </View>
            {/* Set remainder Input */}

            <View style={styles.dateGroup}>
            <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]}
                    onPress={()=>setShowTimePicker(true)}
                >
                    <Ionicons name="time-outline" size={24} color="black" style={styles.icon} />
                    <Text style={styles.text}>{'Select Reminder Time'}</Text>
                </TouchableOpacity>
            </View>
            {showTimePicker&&<RNDateTimePicker 
                mode='time'
                onChange={(event) => {
                    setShowTimePicker(false);
                }}
                value={formData?.reminder??new Date()}
            />}

        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        backgroundColor: 'white',
        marginTop: 10
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 12,
        borderColor: Colors.GRAY
    },
    typeText: {
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        padding: 5,
        flex: 1,
        marginLeft: 10
    },
    dateGroup: {
        flexDirection: 'row',
        gap: 10
    }
})