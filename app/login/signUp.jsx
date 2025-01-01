import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import {auth} from './../../config/FirebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onCreateAccount = () => {

        if(!email||!password){
            alert('Please fill in all fields');
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if(errorCode=='auth/email-already-in-use'){
                    alert('Email already in use')
                }
                // ..
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Create an Account</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    placeholder="Enter your full name"
                    style={styles.textInput}
                    accessible
                    accessibilityLabel="Name Input Field"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email address"
                    style={styles.textInput}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    accessible
                    accessibilityLabel="Email Input Field"
                    onChangeText={(value)=>setEmail(value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    style={styles.textInput}
                    secureTextEntry={true}
                    textContentType="password"
                    accessible
                    accessibilityLabel="Password Input Field"
                    onChangeText={(value)=>setPassword(value)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={onCreateAccount} >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => router.push('login/signIn')}
                accessible
                accessibilityLabel="Already Have Account Button"
            >
                <Text style={styles.buttonLoginText}>Already have an account? Log In</Text>
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
        color: Colors.GRAY,
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
    buttonLogin: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    buttonLoginText: {
        fontSize: 17,
        color: Colors.PRIMARY,
        textAlign: 'center',
    },
});
