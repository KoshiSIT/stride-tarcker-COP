import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity , Animated, ScrollView, Dimensions, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState, useRef} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FonttistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Constants from 'expo-constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
export default function ResultReviewScreen({}){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('コミュニティ');}}>
                    <FontAwesomeIcon name='chevron-left' size={30} color = 'black'/>
                </TouchableOpacity>
                <Text style={{fontWeight : 'bold', fontSize : '16'}}>結果</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('StartRun');}}>
                    <FontAwesomeIcon name='trash' size={30} color = 'black'/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.activityContainer}>
                    <View style={styles.resultItem1}>
                        <FontAwesome5Icon name="walking" size={30} color= "black" />
                        <Text style={styles.activityText}>現在時刻</Text>
                    </View>
                </View>
                <View style={styles.pictureContainer}>
                    <Text style={styles.activityText}>結果写真</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.activityText}>データ</Text>
                </View>
                <View style={styles.splitContainer}>
                    <View style={styles.resultItem1}>
                        <FonttistoIcon name="clock" size={30} color= "black" />
                        <Text style={styles.activityText}>スプリット</Text>
                    </View>
                    <View style={styles.resultItem2}>
                        <AntDesignIcon name="right" size={20} color="gray" />
                    </View>
                </View>
                <View style={styles.analysisContainer}>
                    <View style={styles.resultItem1}>
                        <FoundationIcon name="graph-trend" size={30} color= "black" />
                        <Text style={styles.activityText}>分析データ</Text>
                    </View>
                    <View style={styles.resultItem2}>
                        <AntDesignIcon name="right" size={20} color="gray" />
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <Text style={styles.activityText}>更に詳しく</Text>
                </View>
                <View style={styles.memoContainer}>
                    <View style={styles.resultItem1}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={30} color= "black" />
                        <Text style={styles.activityText}>メモ</Text>
                    </View>
                </View>
                <View style={styles.weatherContainer}>
                    <View style={styles.resultItem1}>
                        <FeatherIcon name="sun" size={30} color= "black" />
                        <Text style={styles.activityText}>天気はいかがでしたか?</Text>
                    </View>
                    <View style={styles.resultItem2}>
                        <AntDesignIcon name="right" size={20} color="gray" />
                    </View>
                </View>
                <View style={styles.shoeTrackerContainer}>
                    <View style={styles.resultItem1}>
                        <MaterialCommunityIcons name="shoe-sneaker" size={30} color= "black" />
                        <Text style={styles.activityText}>シューズトラッカーをご使用ください</Text>
                    </View>
                    <View style={styles.resultItem2}>
                        <AntDesignIcon name="right" size={20} color="gray" />
                    </View>
                </View>
                <View style={styles.workTogetherContainer}>
                    <View style={styles.resultItem1}>
                        <MaterialCommunityIcons name="account-group-outline" size={30} color= "black" />
                        <Text style={styles.activityText}>一緒にウォーキングした人</Text>
                    </View>
                    <View style={styles.resultItem2}>
                        <AntDesignIcon name="right" size={20} color="gray" />
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={()=>{navigation.navigate('Result')}}>
                    <Text style={styles.editButtonText}>編集</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight,
    },
    mainContainer: {
        flex: 1,
    },
    resultItem1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resultItem2: {
    },
    titleContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
    },
    dataContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
    },
    activityContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
    },
    pictureContainer: {
        height: 300,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
    },
    splitContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    analysisContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
    },
    memoContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },
    weatherContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shoeTrackerContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    workTogetherContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
    editButton:{
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#3366CC',
    },
    editButtonText: {
        color: '#3366CC',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      
});
