import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../../../contexts/StartScreenContext';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function IntervalDistanceSettingScreen({}){
    const navigation = useNavigation();
    const { 
        intervalDistance, handleIntervalDistance,
    } = useStartScreenContext();

    const intervalDistanceItems = [];
    for (let i = 1; i <= 16; i++) {
        intervalDistanceItems.push({lable: `${(i*0.25).toFixed(2)}km`, value: i*0.25});
    }
    const handleCancel = () => {
        navigation.goBack();
    };
    const handleSelect = (text) => {
        navigation.navigate('AnnoucementFrequencySetting');
        handleIntervalDistance(text);
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
                {intervalDistanceItems.map((item) => (
                    <TouchableOpacity 
                        style={styles.selectItemContainer} 
                        kwy={item.value}
                        onPress={()=>handleSelect(item.value)}
                    >
                        <View style={styles.selectSubContainer}>
                            <Text style={styles.activityText}>{item.lable}</Text>
                        </View>
                        {intervalDistance === item.value && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                    </TouchableOpacity>
                ))}
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