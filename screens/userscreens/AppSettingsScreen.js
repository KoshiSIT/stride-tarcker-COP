import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_AUTH } from '../../firebase';
import { signOut } from 'firebase/auth';
import {TranslationContext} from "../../translator";

export default function AppSettingsScreen({  }){

    const { translations: { AppSettingsjs: translated } } = useContext(TranslationContext);

    const navigation = useNavigation();
    const handleCancel = () => {
        navigation.goBack();
    };
    const handleSignOut = () => {
        signOut(FIREBASE_AUTH);
        console.log('sign out');
    };
    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.cancelContainer}>
                <TouchableOpacity onPress={() => handleCancel()}>
                    <FontAwesomeIcon name='chevron-left' size={30} color = 'black'/>
                </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{translated.settings}</Text>
                </View>
                <View style={styles.saveContainer}>
                </View>
            </View>
            <ScrollView>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text style={styles.optionTitleText}>{translated.display}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.profile}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>handleSignOut()}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.logout}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        height : '5%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor: 'white',
    },
    cancelContainer:{
    },
    titleContainer:{
        right : 20,
    },
    saveContainer:{
    },
    workOutContainer:{
        height : 100,
        backgroundColor: '#F0F8FF',
        justifyContent : 'center',
        alignItems : 'center',
    },
    detailContainer:{
    },
    subContainer:{
        height : 35,
        justifyContent : 'center',
    },
    optionItem1:{
    },
    optionItem2:{
        flexDirection : 'row',
    }, 
    detailContent:{
        backgroundColor: 'white',
    },
    optionContent:{
        flex : 4,
        backgroundColor: 'white',
    },
    detailItem:{
        height : 60,
        borderWidth : 1,
        borderColor : 'lightgray',
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
    },
    optionItem:{
        flex : 1,
        borderWidth : 1,
        borderColor : 'lightgray',
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
    },
    cancelText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000033',
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    optionItemText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    detailItemText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    optionTitleText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
});