import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../../contexts/StartScreenContext';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function TypeSettingScreen({}){
    const navigation = useNavigation();
    const { selectedActivity, handleSelectActivity } = useStartScreenContext();
    const handleCancel = () => {
        navigation.goBack();
    };
    const handleSelect = (text) => {
        navigation.navigate('Settings');
        handleSelectActivity(text);
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
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('ランニング')}>
                    <View style={styles.selectSubContainer}>
                        <FontAwesome5Icon name="running" size={30} color= "black" />
                        <Text style={styles.activityText}>ランニング</Text>
                    </View>
                    {selectedActivity === 'ランニング' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('ウォーキング')}>
                    <View style={styles.selectSubContainer}>
                        <FontAwesome5Icon name="walking" size={30} color= "black" />
                        <Text style={styles.activityText}>ウォーキング</Text>
                    </View>
                    {selectedActivity === 'ウォーキング' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('サイクリング')}>
                    <View style={styles.selectSubContainer}>
                        <IoniconsIcon name="bicycle" size={30} color= "black" />
                        <Text style={styles.activityText}>サイクリング</Text>
                    </View>
                    {selectedActivity === 'サイクリング' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
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