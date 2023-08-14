import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, ScrollView} from 'react-native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import Data from '../components/user/Data';
import Achivements from '../components/user/Achievements';
import Activity from '../components/user/Activity';
import ShoeTracker from '../components/user/ShoeTracker';
import Goal from '../components/user/Goal';
import Insite from '../components/user/Insite';
import WeeklyWorkout from '../components/user/WeeklyWorkout';
import { Pedometer } from 'expo-sensors';



export default function NewsScreen({navigation}){
    const [stepCount,setStepCount] = useState(0);

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
    return(
        <SafeAreaView style={styles.container}>
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
});