import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect} from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, } from "firebase/auth";
// web 219792520946-8abe2k768qnlqc4irg4um4rogutct6tk.apps.googleusercontent.com
// iOS 219792520946-a050ue2f44vheboe0dsj18m5p4lhqljc.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();
export default function UserScreen() {
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '219792520946-8abe2k768qnlqc4irg4um4rogutct6tk.apps.googleusercontent.com',
    });

    useEffect(() => {
        if(response?.type === 'success'){
            setAccessToken(response.authentication.accessToken);
        }
    }, [response, accessToken]);

    const fetchUserInfo = async() => {
        let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}`},
        });
        let userInfo = await response.json();
        setUser(userInfo);
    }

    const signInWithGoogle = async() => {
        try{
            await promptAsync();
        }catch(e){
            console.log(e);
        }
        
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                disabled={!request}
                onPress={signInWithGoogle}
                style={styles.loginWighGoogleButton}
            >
                <Image source ={require('../assets/google-icon.png')} style={{width: 50, height: 50}}/>
                <Text style={styles.loginButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loginWighGoogleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    loginButtonText: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    
});