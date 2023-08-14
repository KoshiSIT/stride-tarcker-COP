import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../../contexts/StartScreenContext';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function AnnoucementFrequencySettingScreen({}){
    const navigation = useNavigation();
    const {
        withAnnouncement, handleWithAnnouncement,
        withIntervalTime, handleWithIntervalTime,
        withIntervalDistance, handleWithIntervalDistance,
        intervalTime, handleIntervalTime,
        intervalDistance, handleIntervalDistance,
    } = useStartScreenContext();

    const handleCancel = () => {
        navigation.goBack();
    };
    const setAnnouncementOn = () => {
        if(withAnnouncement === false){
            handleWithAnnouncement();
        }
    };
    const setAnnouncementOff = () => {
        if(withAnnouncement === true){
            handleWithAnnouncement();
        }
    };
    const setIntervalTimeOff = () => {
        if(withIntervalTime === true){
            handleWithIntervalTime();
        }
    };
    const setIntervalDistanceOff = () => {
        if(withIntervalDistance === true){
            handleWithIntervalDistance();
        }
    };

    const handleAnnouncement = () => {
        if(withAnnouncement === false){
            setAnnouncementOn();
            setIntervalTimeOff();
            setIntervalDistanceOff();
        }
    };
    const handleIntervalTimeAnnouncement = () => {
        handleWithIntervalTime();
        setAnnouncementOff();
    };

    const handleIntervalDistanceAnnouncement = () => {
        handleWithIntervalDistance();
        setAnnouncementOff();
    };

    useEffect(()=>{
        if(withIntervalDistance === false && withIntervalTime === false){
            handleAnnouncement();
        }
    },[withIntervalTime, withIntervalDistance]);
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
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleAnnouncement()}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>オンデマンドのみ</Text>
                    </View>
                    {withAnnouncement === true && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleIntervalTimeAnnouncement()}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>タイム</Text>
                    </View>
                    {withIntervalTime === true && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleIntervalDistanceAnnouncement()}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>距離</Text>
                    </View>
                    {withIntervalDistance === true && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                {withAnnouncement === false && 
                    <View>
                        <View style={styles.subContainer}>
                            <Text style={styles.optionTitleText}>詳細設定</Text>
                        </View>
                        {withIntervalTime === true &&
                            <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('IntervalTimeSetting')}}>
                                <View style={styles.optionItem1}>
                                        <Text style={styles.activityText}>タイム</Text>
                                </View>
                                <View style={styles.optionItem2}>
                                    <Text style={styles.optionText}>{intervalTime}分</Text>
                                    <AntDesignIcon name="right" size={20} color="lightgray" />
                                </View>
                            </TouchableOpacity>
                        }
                        {withIntervalDistance === true &&
                            <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('IntervalDistanceSetting')}}>
                                <View style={styles.optionItem1}>
                                        <Text style={styles.activityText}>距離</Text>
                                </View>
                                <View style={styles.optionItem2}>
                                    <Text style={styles.optionText}>{intervalDistance.toFixed(2)}km</Text>
                                    <AntDesignIcon name="right" size={20} color="lightgray" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                }
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
    subContainer:{
        height : 35,
        justifyContent : 'center',
    },
    activityText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
    detailItem:{
        height : 60,
        borderWidth : 1,
        borderColor : 'lightgray',
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : 'white',
    },
    optionItem1:{
    },
    optionItem2:{
        flexDirection : 'row',
    }, 
    detailItemText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    optionText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000033',
    },
    optionTitleText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },

});