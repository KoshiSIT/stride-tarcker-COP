import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect} from "react";
import { useAppContext } from '../../contexts/AppContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase'
import Loading from "../../components/Loading";
export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  auth = FIREBASE_AUTH;

    const signIn = async() => {
        setLoading(true);
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('User');
        }catch(error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    const signUp = async() => {
        setLoading(true);
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('User');
        }catch(error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/Stridetracker.png')}
                    resizeMode="contain"
                    style={{
                        width: 400,
                        height: 200,
                    }}
                />
            </View>
            <View style={styles.authInputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                >
                </TextInput>
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                >
                </TextInput>
            </View>

            {loading ? (
                <Loading/>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={signIn}
                        style={styles.loginWighGoogleButton}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={signUp}
                        style={styles.loginWighGoogleButton}
                    >
                        <Text style={styles.loginButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    authInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 10,
    },
    loginWighGoogleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    loginButtonText: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    
});