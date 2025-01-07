import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from '../constant/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText, formatTime, getDatesRange } from '../service/ConvertDateTime';
import { db } from '../config/FirebaseConfig';
import { getLocalStorage } from '../service/Storage';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function AddMedForm() {
    const [formData, setFormData] = useState({});
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onHandleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = () => {
        const { name, type, dose, startDate, endDate, reminder } = formData;

        if (!name || !type || !dose || !startDate || !endDate || !reminder) {
            Alert.alert('Validation Error', 'Please fill out all fields.');
            return false;
        }

        if (isNaN(dose)) {
            Alert.alert('Validation Error', 'Dose must be a valid number.');
            return false;
        }

        if (new Date(startDate) > new Date(endDate)) {
            Alert.alert('Validation Error', 'Start Date must be earlier than End Date.');
            return false;
        }

        return true;
    };


    const SaveMedication = async () => {
        if (!validateForm()) return;

        const docId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user = await getLocalStorage('userDetail');
        const dates = getDatesRange(formData?.startDate, formData?.endDate);

        setLoading(true);
        try {
            await setDoc(doc(db, 'medication', docId), {
                ...formData,
                userEmail: user?.email,
                docId: docId,
                dates: dates,
            });
            setLoading(false);
            Alert.alert(
                'Medication Added',
                'Your medication has been successfully added.',
                [{ text: 'OK', onPress: () => router.push('/(tabs)') }]
            );
        } catch (e) {
            setLoading(false);
            Alert.alert('Error', 'Failed to save medication. Please try again.');
            console.error(e);
        }
    };

    const DatePicker = ({ label, value, onPress }) => (
        <TouchableOpacity style={[styles.inputGroup, styles.flex1]} onPress={onPress}>
            <Ionicons name="calendar-outline" size={24} style={styles.icon} />
            <Text style={styles.text}>{value ?? label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Medication</Text>
            {/* Medicine Name Input */}
            <View style={styles.inputGroup}>
                <Ionicons name="medkit-outline" size={24} style={styles.icon} />
                <TextInput
                    placeholder="Medicine Name"
                    style={styles.textInput}
                    onChangeText={(value) => onHandleInputChange('name', value)}
                />
            </View>
            {/* Type List */}
            <FlatList
                data={TypeList}
                horizontal
                style={styles.typeList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            {
                                backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white',
                                borderColor: Colors.DARK_GRAY,
                            },
                        ]}
                        onPress={() => onHandleInputChange('type', item)}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                { color: item.name === formData?.type?.name ? 'white' : 'black' },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />
            {/* Dose Input */}
            <View style={styles.inputGroup}>
                <Ionicons name="eyedrop-outline" size={24} style={styles.icon} />
                <TextInput
                    placeholder="Dose (e.g., 2, 5ml)"
                    style={styles.textInput}
                    onChangeText={(value) => onHandleInputChange('dose', value)}
                />
            </View>
            {/* When to Take Picker */}
            <View style={styles.inputGroup}>
                <Ionicons name="time-outline" size={24} style={styles.icon} />
                <Picker
                    selectedValue={formData?.when}
                    onValueChange={(value) => onHandleInputChange('when', value)}
                    style={styles.picker}
                >
                    {WhenToTake.map((item, index) => (
                        <Picker.Item label={item} value={item} key={index} />
                    ))}
                </Picker>
            </View>
            {/* Start and End Dates */}
            <View style={styles.dateGroup}>
                <DatePicker
                    label="Start Date"
                    value={formatDateForText(formData?.startDate)}
                    onPress={() => setShowStartDate(true)}
                />
                {showStartDate && (
                    <RNDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleInputChange('startDate', FormatDate(event.nativeEvent.timestamp));
                            setShowStartDate(false);
                        }}
                        value={formData?.startDate ? new Date(formData.startDate) : new Date()}
                    />
                )}
                <DatePicker
                    label="End Date"
                    value={formatDateForText(formData?.endDate)}
                    onPress={() => setShowEndDate(true)}
                />
                {showEndDate && (
                    <RNDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event) => {
                            onHandleInputChange('endDate', FormatDate(event.nativeEvent.timestamp));
                            setShowEndDate(false);
                        }}
                        value={formData?.endDate ? new Date(formData.endDate) : new Date()}
                    />
                )}
            </View>
            {/* Reminder Time Picker */}
            <View style={styles.dateGroup}>
                <DatePicker
                    label="Select Reminder Time"
                    value={formData?.reminder}
                    onPress={() => setShowTimePicker(true)}
                />
                {showTimePicker && (
                    <RNDateTimePicker
                        mode="time"
                        onChange={(event) => {
                            onHandleInputChange('reminder', formatTime(event.nativeEvent.timestamp));
                            setShowTimePicker(false);
                        }}
                        value={new Date()}
                    />
                )}
            </View>
            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={SaveMedication}>
                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <Text style={styles.buttonText}>Add New Medication</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        backgroundColor: 'white',
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        color: Colors.PRIMARY,
    },
    typeList: {
        marginTop: 5,
    },
    typeButton: {
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
    },
    typeText: {
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    dateGroup: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    picker: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        width: '100%',
        marginTop: 25,
    },
    buttonText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
});
