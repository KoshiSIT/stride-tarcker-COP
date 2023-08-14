import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../../contexts/StartScreenContext';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function AnnoucementFrequencySettingScreen({}){
    const navigation = useNavigation();
    const { typeOfAudioGuide, handleTypeOfAudioGuide } = useStartScreenContext();
    const handleCancel = () => {
        navigation.goBack();
    };
    const handleSelect = (text) => {
        navigation.navigate('Settings');
        handleTypeOfAudioGuide(text);
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
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('kat(デフォルト)')}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>kat(デフォルト)</Text>
                    </View>
                    {typeOfAudioGuide === 'kat(デフォルト)' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('Boston Fan(英語)')}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>Boston Fan(英語)</Text>
                    </View>
                    {typeOfAudioGuide === 'Boston Fan(英語)' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItemContainer} onPress={()=>handleSelect('Drill Instructor(英語)')}>
                    <View style={styles.selectSubContainer}>
                        <Text style={styles.activityText}>Drill Instructor(英語)</Text>
                    </View>
                    {typeOfAudioGuide === 'Drill Instructor(英語)' && <FontAwesomeIcon name="check" size={30} color="#20B2AA" />}
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