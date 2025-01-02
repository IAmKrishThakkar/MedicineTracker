import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const userInfo = await getLocalStorage('userDetail');
            if (userInfo) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                router.push('/login');
            }
        };

        checkUserAuthentication();

        // Optionally, use Firebase Auth listener for real-time auth state updates
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                router.push('/login');
            }
        });

        return () => unsubscribe(); // Cleanup the auth listener on unmount
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AddNew"
                options={{
                    tabBarLabel: 'Add New',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="plus-square" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
