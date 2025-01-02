import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        GetUserDetail();
    }, []);

    const GetUserDetail = async () => {
        try {
            const userInfo = await getLocalStorage('userDetail');
            console.log(userInfo);
            setUser(userInfo);
        } catch (error) {
            console.error('Error retrieving user details:', error);
        }
    };

    return (
        <View style={{
            marginTop: 20
        }}>
            <View style={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width:'100%'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <Image
                        source={require('./../assets/images/smiley.png')}
                        style={{
                            width: 45,
                            height: 45,
                        }}
                    />
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}>Hello {user?.displayName} 👋</Text>
                </View>
                <Ionicons name="settings-outline" size={34} color={Colors.DARK_GRAY} />
            </View>
        </View>
    );
}
