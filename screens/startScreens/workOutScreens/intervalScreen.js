import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

export default function IntervalScreen({}){
    const [withWarmUp, setWithWarmUp] = useState(false);
    const [withCoolDown, setWithCoolDown] = useState(false);
    const navigation = useNavigation();
    const handleCancel = () => {
        navigation.goBack();
    };
    const handleSlectWorkOut = () => {
        navigation.navigate('Start');
    };
    const handleWithWarmUp = () => {
        setWithWarmUp(!withWarmUp);
    };
    const handleWithCoolDown = () => {
        setWithCoolDown(!withCoolDown);
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
                <Text style={styles.titleText}>インターバルランニング</Text>
                </View>
                <View style={styles.saveContainer}>
                </View>
            </View>
            <ScrollView>
                <View style={styles.workOutContainer}>
                    <Text style={styles.workOutName}>ランニング/ウォーキング/ランニング</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSlectWorkOut()}>
                        <Text style={styles.saveButtonText}>このワークアウトを選択</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.subContainer}>
                        <Text>ワークアウトの詳細</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <TouchableOpacity style={styles.detailItem}>
                            <Text style={styles.detailItemText}>2:00 一定のペース</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailItem}>
                            <Text style={styles.detailItemText}>2:00 遅いペース</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.subContainer}>
                        <Text>ワークアウトオプション</Text>
                    </View>
                    <View style={styles.optionContent}>
                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={styles.optionItemText}>繰り返す</Text>
                            <Text style={{fontSize : 17, fontWeight : 'bold', color : '#000033'}}>あと6回</Text>
                        </TouchableOpacity>
                        <View style={styles.optionItem}>
                            <Text style={styles.optionItemText}>ウォームアップ(5分)</Text>
                            <Switch 
                                value={withWarmUp}
                                onValueChange={handleWithWarmUp}
                                trackColor={{ false: "#767577", true: "#20B2AA" }}
                                thumbColor={withWarmUp ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>
                        <View style={styles.optionItem}>
                            <Text style={styles.optionItemText}>クールダウン(5分)</Text>
                            <Switch 
                                value={withCoolDown}
                                onValueChange={handleWithCoolDown}
                                trackColor={{ false: "#767577", true: "#20B2AA" }}
                                thumbColor={withCoolDown ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>
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
        height : 150,
    },
    optionContainer:{
        height : 225,
    },
    subContainer:{
        height : 20,
    },
    detailContent:{
        flex : 4,
        backgroundColor: 'white',
    },
    optionContent:{
        flex : 4,
        backgroundColor: 'white',
    },
    detailItem:{
        flex : 1,
        borderWidth : 1,
        borderColor : 'lightgray',
        justifyContent : 'center',
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