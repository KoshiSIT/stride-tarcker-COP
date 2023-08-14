import { StyleSheet, Text, View ,Image, FlatList,SafeAreaView} from 'react-native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

export default function ExplorerScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text>ExplorerScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
});