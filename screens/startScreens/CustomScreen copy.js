import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

export default function CustomScreen({}){
    const navigation = useNavigation();
    const handleCancel = () => {
        navigation.goBack();
    };

    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.cancelContainer}>
                <TouchableOpacity onPress={() => handleCancel()}>
                        <Text style={styles.cancelText}>キャンセル</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                <Text style={styles.titleText}>タイトル</Text>
                </View>
                <View style={styles.saveContainer}>
                <Text style={styles.saveText}>保存</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    topContainer:{
        top : '0%',
        height : '5%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    cancelContainer:{
        left : '0%',
    },
    titleContainer:{
        position : 'absolute',
        left : '42%',
        justifyContent:'flex-start',
    },
    saveContainer:{
        right : '-0%',
    },

    cancelText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3366CC',
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    saveText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3366CC',
    },
});