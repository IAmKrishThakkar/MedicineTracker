import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({ medicine, selectedDate = '' }) {
  const [status, setStatus] = useState();

  useEffect(() => {
    CheckStatus();
  }, [medicine, selectedDate]);

  const CheckStatus = () => {
    if (Array.isArray(medicine?.action)) {
      const data = medicine?.action.find((item) => item.date === selectedDate);
      console.log(data);
      setStatus(data);
    } else {
      // If medicine?.action is not an array, handle the case here (e.g., setStatus to null)
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{medicine?.name}</Text>
          <Text style={{ fontSize: 17 }}>{medicine?.when}</Text>
          <Text style={{ color: 'white' }}>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{medicine?.reminder}</Text>
      </View>

      {status?.date && (
        <View style={styles.statusContainer}>
          {status?.status === 'Taken' ? (
            <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
          ) : status?.status === 'Missed' ? (
            <Ionicons name="close-circle" size={24} color="red" />
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  statusContainer: {
    position: 'absolute',
    top: 5,
    padding: 7,
  },
});
