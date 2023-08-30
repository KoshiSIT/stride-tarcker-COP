import { StyleSheet, Text, View , Image, FlatList, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Data from '../components/user/Data';
import Achivements from '../components/user/Achievements';
import Activity from '../components/user/Activity';
import ShoeTracker from '../components/user/ShoeTracker';
import Goal from '../components/user/Goal';
import Insite from '../components/user/Insite';
import WeeklyWorkout from '../components/user/WeeklyWorkout';
import FeatherIcon from 'react-native-vector-icons/Feather';



export default function UserScreen({}){
    const [stepCount,setStepCount] = useState(0);
    const navigation = useNavigation();
    useEffect(()=>{
        getStepCount();
    },[]);

    const getStepCount= async()=>{
        const isAvailable = await Pedometer.isAvailableAsync();
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        if(isAvailable){
            try {
                const stepResult = await Pedometer.getStepCountAsync(start, end);
                console.log(stepResult.steps);
                setStepCount(stepResult.steps);
            }catch(e){
                console.log(e);
            }
        }
        
    };
    const goAppSettings = () => {
        navigation.navigate('AppSettings');
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={()=> goAppSettings()}>
                    <FeatherIcon name="settings" size={30} color= "black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Data/>
                <Achivements/>
                <Activity/>
                <ShoeTracker/>
                <Goal/>
                <Insite/>
                <WeeklyWorkout/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 0,
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
});