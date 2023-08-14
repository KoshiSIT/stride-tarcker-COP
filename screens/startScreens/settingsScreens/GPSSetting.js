import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../../contexts/StartScreenContext';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
export default function TrackingSettingScreen({}){
    const navigation = useNavigation();
    const { stopWatchMode, handleStopWatchMode } = useStartScreenContext();
    const handleCancel = () => {
        navigation.goBack();
    };
    const stopWatchModeOn = () => {
        navigation.navigate('Settings');
        if(stopWatchMode === false){
            handleStopWatchMode(true);
        }
    };
    const stopWatchModeOff = () => {
        navigation.navigate('Settings');
        if(stopWatchMode === true){
            handleStopWatchMode(false);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={() => handleCancel()}>
                        <FontAwesomeIcon name='chevron-left' size={20} color = 'black'/>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={{marginTop : 30}}>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>stopWatchModeOff()}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>GPSモード</Text>
                    </View>
                    {stopWatchMode === false && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>stopWatchModeOn()}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>ストップウォッチモード</Text>
                    </View>
                    {stopWatchMode === true && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F0F8FF', 
        marginTop: Constants.statusBarHeight,
    },
    topContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
    },
    cancelContainer:{
    },
    titleContainer:{
        right: '100%',
    },
    selectItemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    selectSubContainer:{
        flexDirection: 'row',
        justifyContent: 'cneter',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
});