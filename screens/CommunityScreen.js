import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

export default function CommunityScreen({navigation}){
    const [selectedTab, setSelectedTab] = useState('feed');

    const handleTabChange = (tabName) => {
        setSelectedTab(tabName);
    };

    return(
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'feed' && styles.selectedTabButton]}
                    onPress={() => handleTabChange('feed')}
                    >
                    <Text style={styles.tabText}>フィード</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'group' && styles.selectedTabButton]}
                    onPress={() => handleTabChange('group')}
                >
                    <Text style={styles.tabText}>グループ</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.feedContainer}>
                    <Text>アクティビティ名</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    tabContainer:{
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    tabButton:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTabButton:{
        borderBottomWidth: 4,
        borderColor: '#000055',
    },
    tabText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
});