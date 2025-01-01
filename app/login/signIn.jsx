import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from './../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const OnSignInClick = () => {
        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                router.push('(tabs)');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(errorCode);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Let's Sign You In</Text>
            <Text style={styles.subText}>Welcome Back</Text>
            <Text style={styles.subText}>You've been missed!</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email address"
                    style={styles.textInput}
                    accessible
                    accessibilityLabel="Email Input Field"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={(value) => setEmail(value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    style={styles.textInput}
                    secureTextEntry={true}
                    accessible
                    accessibilityLabel="Password Input Field"
                    textContentType="password"
                    onChangeText={(value) => setPassword(value)} 
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={OnSignInClick} accessible accessibilityLabel="Login Button">
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => router.push('login/signUp')}
                accessible
                accessibilityLabel="Create Account Button"
            >
                <Text style={styles.buttonCreateText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        color: Colors.GRAY,
    },
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.PRIMARY,
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        fontSize: 17,
        backgroundColor: 'white',
        marginTop: 5,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 35,
    },
    buttonText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
    buttonCreate: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    buttonCreateText: {
        fontSize: 17,
        color: Colors.PRIMARY,
        textAlign: 'center',
    },
});
