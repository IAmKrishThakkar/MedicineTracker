import { View, Text, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../service/Storage';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserDetails(); 
  }, []); 

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getLocalStorage('userDetail');
      if (userDetails) {
        setUser(userDetails);
      } else {
        Alert.alert('Error', 'No user details found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Unable to load user details.');
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('./../../assets/images/profile.png')} // Replace with dynamic photoURL if available
          style={styles.profilePic}
        />
        <Text style={styles.userName}>{user.displayName || 'No Name Available'}</Text>
        <Text style={styles.userEmail}>{user.email || 'No Email Available'}</Text>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.buttonsContainer}>
        {/* Add Medication Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push('/add-new-medication')} style={styles.button}>
            <Ionicons name="add-circle" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Add Medication</Text>
        </View>

        {/* My Medication Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.button}>
            <Ionicons name="medkit-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>My Medication</Text>
        </View>

        {/* History Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push('/History')} style={styles.button}>
            <Ionicons name="time-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>History</Text>
        </View>

        {/* Logout Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push('/login')} style={[styles.button, styles.logoutButton]}>
            <Ionicons name="exit-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 40, // Adjusted padding for top space
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 20, // Soft rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circle shaped
    borderWidth: 4,
    borderColor: '#6200ea',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 30, // Added margin for better spacing
  },
  buttonContainer: {
    flexDirection: 'row',  // Align the button and text horizontally
    alignItems: 'center', // Vertically center the content
    marginBottom: 15,     // Space between buttons
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 5,
    shadowOpacity: 0.2,
    marginRight: 10,  // Space between the icon and the text
  },
  logoutButton: {
    backgroundColor: '#e53935', // Red for logout
  },
  buttonText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: '500',
  },
});
