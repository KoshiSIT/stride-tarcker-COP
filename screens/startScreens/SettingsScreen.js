import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStartScreenContext } from '../../contexts/StartScreenContext';
import React, {useContext, useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import translations from "../../translator/languages";
import {TranslationContext} from "../../translator";
export default function SettingsScreen({  }){

    const { translations: { RunSettingsjs: translated } } = useContext(TranslationContext);
    const [withWarmUp, setWithWarmUp] = useState(false);
    const [withCoolDown, setWithCoolDown] = useState(false);
    const navigation = useNavigation();
    const {
        selectedActivity, 
        rroute, 
        withAutoPause, handleWithAutoPause,
        withCountDown, handleWithCountDown,
        stopWatchMode,
        withLiveTracking,
        // trackinng settings
        withPocketTrack,
        // coaching settings
        withAudioGuide, handleWithAudioGuide,
        typeOfAudioGuide, 
        announcementFrequency, 
        announcementInfo,
        volume,
        // display settings
        unitOfDistance,
        unitOfSpeed,
    }= useStartScreenContext();
    const handleCancel = () => {
        navigation.goBack();
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
                <Text style={styles.titleText}>{translated.activitySettings}</Text>
                </View>
                <View style={styles.saveContainer}>
                </View>
            </View>
            <ScrollView>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text style={styles.optionTitleText}>{translated.activity}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('TypeSetting')}}>
                            <View style={styles.optionItem1}>
                                    <Text style={styles.detailItemText}>{translated.type}</Text>
                            </View>
                            <View style={styles.optionItem2}>
                                <Text style={styles.optionText}>{selectedActivity}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>(navigation.navigate('RouteSetting'))}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.route}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{rroute}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text style={styles.optionTitleText}>{translated.tracking}</Text>
                    </View>
                    <View style={styles.optionContent}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailItemText}>{translated.autoPause}</Text>
                            <Switch 
                                value={withAutoPause}
                                onValueChange={handleWithAutoPause}
                                trackColor={{ false: "#767577", true: "#20B2AA" }}
                                thumbColor={withAutoPause ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailItemText}>{translated.countdownSettings}</Text>
                            <Switch 
                                value={withCountDown}
                                onValueChange={handleWithCountDown}
                                trackColor={{ false: "#767577", true: "#20B2AA" }}
                                thumbColor={withCountDown ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('TrackingSetting')}}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.trackingMode}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{stopWatchMode ? translated.stopWatch : translated.gpsMode}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.liveTrackingFunction}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{withLiveTracking}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('PocketTrackingSetting')}}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.pocketTrack}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{withPocketTrack ? translated.on : translated.off}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text style={styles.optionTitleText}>{translated.coaching}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailItemText}>{translated.audioGuide}</Text>
                            <Switch 
                                value={withAudioGuide}
                                onValueChange={handleWithAudioGuide}
                                trackColor={{ false: "#767577", true: "#20B2AA" }}
                                thumbColor={withAudioGuide ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('AudioGuideSetting')}}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.voice}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{typeOfAudioGuide}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem} onPress={()=>{navigation.navigate('AnnoucementFrequencySetting')}}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.announcementFrequency}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}></Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.selectInfoToAnnounce}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}></Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.volume}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{volume.toFixed(0)}%</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text style={styles.optionTitleText}>{translated.display}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.distance}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{unitOfDistance}</Text>
                                <AntDesignIcon name="right" size={20} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem}>
                            <View style = {styles.optionItem1}>
                                <Text style={styles.detailItemText}>{translated.speed}</Text>
                            </View>
                            <View style = {styles.optionItem2}>
                                <Text style={styles.optionText}>{unitOfSpeed}</Text>
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
        right : '100%',
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
    workOutName:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom : 10,
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
    optionText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000033',
    },
    saveButton:{
        backgroundColor: '#3366CC',
        height: 40,
        width: 350,
        borderRadius: 20,
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});