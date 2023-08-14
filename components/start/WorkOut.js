import { StyleSheet, Text, View ,Image, FlatList,SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Switch, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState, useRef} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BeginnerWorkOut = ({handleModaleClose={handleModaleClose}, fadeAnim={fadeAnim}}) => {
    const navigation = useNavigation();
    const handleWithWorkOut = () => {
        navigation.navigate('Interval');
    };
    const handleModaleOpen = () => {
        navigation.navigate('Custom');
    };
    return(
     <Animated.View style={{transform :[{ translateX : fadeAnim}]}}>
        <View style={styles.pageTitleContainer}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={50} color= "#000033" />
          <Text style={styles.pageTitle}>ワークアウト</Text>
        </View>
      <ScrollView style={styles.scrollContainer}>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () => handleWithWorkOut()}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ランニング/ウォーキング/ランニング</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >簡単的なアウト&バック (30分)</Text>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () => handleModaleOpen()}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >インターバル入門</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ランニング/ウォーキング/インターバル混合</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ショートバースト</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ランクアップ&テーパー</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={handleModaleClose} style={styles.okButton}>
          <FontAwesomeIcon name="arrow-left" size={20} color="white"/>
       </TouchableOpacity>
      </Animated.View>
    );
}
const Distance = ({handleModaleClose={handleModaleClose}, fadeAnim={fadeAnim}, distance={distance},setDistance={setDistance}}) => {
    const handleDistanceIncrement = () => {
        setDistance(distance+0.1);
      };

      const handleDistanceDecrement = () => {
        setDistance(distance-0.1);
      };
    return(
     <Animated.View style={{transform :[{ translateX : fadeAnim}]}}>
        <View style={styles.pageTitleContainer}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={50} color= "#000033" />
          <Text style={styles.pageTitle}>ワークアウト</Text>
        </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.distanceContainer}>
            <View style={styles.minusButton}>
                <TouchableOpacity onPress={handleDistanceDecrement}>
                    <AntDesignIcon name = "minuscircleo" size={50} color="gray"/>
                </TouchableOpacity>
            </View>
            <View style={{alignItems : 'center'}}>
                <Text style={styles.dataTitle}>距離</Text>
                <Text style={styles.dataText}>{distance.toFixed(1)}</Text>
                <Text style={styles.unitText}>km</Text>
            </View>
            <View style={styles.plusButton}>
                <TouchableOpacity onPress={handleDistanceIncrement}>
                    <AntDesignIcon name = "pluscircleo" size={50} color="gray"/>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleModaleClose} style={styles.okButton}>
          <FontAwesomeIcon name="arrow-left" size={20} color="white"/>
       </TouchableOpacity>
      </Animated.View>
    );
}
styles = StyleSheet.create({
    pageTitleContainer: {
        top: 0,
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    pageTitle: {
        fontSize: 20,
        color: 'black',
        marginTop: 10,
    },
    scrollContainer: {
        width: '100%',
        height: '66%',
    },
    workOutContainer: {
        width: '100%',
        height: 85,
        borderWidth: 1,
        borderColor: 'gray',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    distanceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pageDescription: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    okButton: {
        bottom: '-2.5%',
        width: '100%',
        height: '10%',
        backgroundColor: '#3366CC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    minusButton: {
        top: '10%',
        right: '35%',
    },
    plusButton: {
        top: '10%',
        left: '35%',
    },
    dataTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
    },
    dataText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
    },
    unitText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
});

export  {BeginnerWorkOut, Distance};