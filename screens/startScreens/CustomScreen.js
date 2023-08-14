import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, TextInput} from 'react-native';
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
                <Text style={styles.titleText}>カスタム</Text>
                </View>
                <View style={styles.saveContainer}>
                <Text style={styles.saveText}>保存</Text>
                </View>
            </View>
            <ScrollView>
                <WorkoutName/>
                <WorkoutDetail/>
                <WorkoutOption/>
                <SavedWorkOut/>
            </ScrollView>
        </View>
    );
};

const WorkoutName = () => {
    const [workOutName, setWorkOutName] = useState('');

    return(
        <View style={styles.workOutNameBox}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>このワークアウトの名前を入力</Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={workOutName}
                    onChangeText={(text)=>{setWorkOutName(text)}}
                    secureTextEntry={false}
                />
            </View>
        </View>
    );
}

const WorkoutDetail = () => {
    return(
        <View style={styles.workOutItemBox}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>ワークアウト詳細</Text>
            </View>
            <View style={styles.content}>
            </View>
        </View>
    );
}

const WorkoutOption = () => {
    return(
        <View style={styles.workOutItemBox}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>ワークアウトオプション</Text>
            </View>
            <View style={styles.content}>
            </View>
        </View>
    );
}

const SavedWorkOut = () => {
    return(
        <View style={styles.workOutItemBox}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>保存済みワークアウト</Text>
            </View>
            <View style={styles.content}>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop: Constants.statusBarHeight,
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
    workOutNameBox : {
        height: 100,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderWidth: 0,
        
    },
    workOutItemBox : {
        height: 70,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        borderWidth: 0,
    },
    headlineBackground: {
        height: 25,
        width: '100%',
        backgroundColor: '#D7EEFF',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headlineText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    content: {
        height: 30,
        backgroundColor: 'white',
    },
    input: {
        fontSize: 40,
      },
});