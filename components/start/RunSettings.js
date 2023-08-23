import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Switch, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {BeginnerWorkOut, Distance} from './WorkOut';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Page1 = ({ handleClosePopup, handleStopWatchMode, handleSelectActivity, stopWatchMode, selectedActivity}) => {
  const activites = [
    {label: 'ランニング', value: 'ランニング'},
    {label: 'サイクリング', value: 'サイクリング'},
    {label: 'ウォーキング', value: 'ウォーキング'},
    {label: 'マウンテンバイキング', value: 'マウンテンバイキング'},
    {label: 'バイキング', value: 'バイキング'},
    {label: 'ダウンヒルスキー', value: 'ダウンヒルスキー'},
    {label: 'スノーボード', value: 'スノーボード'},
    {label: 'スイミング', value: 'スイミング'},
    {label: '車椅子', value: '車椅子'},
    {label: 'ローイング', value: 'ローイング'},
  ]
  
  return(
    <View style={styles.pageContainer}>
      <View>
      <View style={styles.pageTitleContainer}>
        <MaterialCommunityIcons name="shoe-sneaker" size={50} color= "#000033" />
        <Text style={styles.pageTitle}>アクティビティ</Text>
      </View>
      {stopWatchMode ?(
      <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
          <Text style={styles.pageDescription}>ストップウォッチモード</Text>
          <Switch 
            value={stopWatchMode} 
            onValueChange={handleStopWatchMode}
            trackColor={{ false: "#767577", true: "#20B2AA" }}
            thumbColor={stopWatchMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            />
          </View>
        {activites.map((activity) => (

                  <TouchableOpacity 
                    style={styles.choiceContainerOn} 
                    kwy={activity.value}
                    onPress = {() => handleSelectActivity(activity.value)}
                  >
                  <View style={styles.rowContainer}>
                   <Text style={styles.pageDescription} >{activity.label}</Text>
                   {selectedActivity === activity.value && <Icon name="check" size={30} color="#20B2AA" />}
                  </View>
                  </TouchableOpacity>
                
        ))}
      </ScrollView>
      ):(
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
          <Text style={styles.pageDescription}>ストップウォッチモード</Text>
          <Switch 
            value={stopWatchMode} 
            onValueChange={handleStopWatchMode}
            trackColor={{ false: "#767577", true: "#20B2AA" }}
            thumbColor={stopWatchMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            />
          </View>
        {activites.map((activity) => (
          <TouchableOpacity 
            style={styles.choiceContainerOff} 
            kwy={activity.value}
            onPress = {() => handleSelectActivity(activity.value)}
            >
            <View style={styles.rowContainer}>
                  <Text style={styles.pageDescription} >{activity.label}</Text>
                  {selectedActivity === activity.value && <Icon name="check" size={30} color="#20B2AA" />}
                </View>
                </TouchableOpacity>
        ))}
      </ScrollView>
      )}
       <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
       </TouchableOpacity>
       </View>
    </View>
  );
};

const Page2 = ({ handleClosePopup }) => {
  const [withWorkOut, setWithWorkOut] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [distance, setDistance] = useState(50);
  const fadeAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();
  const handleWithWorkOut = () => {
    setWithWorkOut(true);
  };

  const handleModaleOpen = (pagename) => {
    setShowModal(pagename);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleModaleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: Dimensions.get('window').width,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {setShowModal('')});
  };

  const handleCustomOpen = () => {
    navigation.navigate('Custom');
  };

  return(
    <View style={styles.pageContainer}>
    {showModal === '初心者向けワークアウト' ? (
      <BeginnerWorkOut handleModaleClose={handleModaleClose} fadeAnim={fadeAnim}/>
      ):showModal === '距離' ? (
        <Distance handleModaleClose={handleModaleClose} fadeAnim={fadeAnim} distance={distance} setDistance={setDistance}/>
      ):(
      <Animated.View>
      <View style={styles.pageTitleContainer}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={50} color= "#000033" />
        <Text style={styles.pageTitle}>ワークアウト</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () => handleWithWorkOut()}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >なし</Text>
          {withWorkOut ==  true && <Icon name="check" size={30} color="#20B2AA" />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >トレーニングプランを開始する</Text>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () => handleModaleOpen('初心者向けワークアウト')}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >初心者向けワークアウト</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >WIN THE LONG RUN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () => handleCustomOpen()}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >カスタム</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer} onPress = {() => handleModaleOpen('距離')}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >距離</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >時間</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ペース</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
       </TouchableOpacity>
    </Animated.View>
      )}
    </View>
  );
};
const Page3 = ( {handleClosePopup }) => {
  const [withMusic, setWithMusic] = useState(false);

  const handleWithMusic = () => {
    setWithMusic(true);
  };
  return(
    <View style={styles.pageContainer}>
    <View>
    <View style={styles.pageTitleContainer}>
      <MaterialCommunityIcons name="music" size={50} color= "#000033" />
      <Text style={styles.pageTitle}>音楽</Text>
    </View>
    <ScrollView style={styles.scrollContainer}>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >Spotify</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >ミュージックライブラリアプリ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.workOutContainer} onPress = { () =>handleWithMusic()} activeOpacity = {withMusic ? 1 : 0.2}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageDescription} >なし</Text>
          {withMusic ==  true && <Icon name="check" size={30} color="#20B2AA" />}
        </View>
      </TouchableOpacity>
    </ScrollView>
    <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
        <Text style={styles.okText}>OK</Text>
     </TouchableOpacity>
     </View>
    </View>
  );
};
const Page4 = ({ handleClosePopup, handleWithAudioGuide, handleVolumeChange, withAudioGuide, volume}) => {

  return(
    <View style={styles.pageContainer}>
      <View>
      <View style={styles.pageTitleContainer}>
        <MaterialCommunityIcons name="volume-high" size={50} color= "#000033" />
        <Text style={styles.pageTitle}>音声ガイド</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.pageDescription} >有効にする</Text>
            <Switch 
              value={withAudioGuide}
              onValueChange={handleWithAudioGuide}
              trackColor={{ false: "#767577", true: "#20B2AA" }}
              thumbColor={withAudioGuide ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        <TouchableOpacity style={styles.workOutContainer} disabled={!withAudioGuide}>
          <View style={styles.rowContainer}>
            <Text style={[styles.pageDescription, !withAudioGuide && styles.disabledPageDescription]} >音声</Text>
          </View>
            <Text style={[styles.subText, !withAudioGuide && styles.disabledSubText]} >kat(デフォルト)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workOutContainer} disabled={!withAudioGuide}>
          <View style={styles.rowContainer}>
            <Text style={[styles.pageDescription, !withAudioGuide && styles.disabledPageDescription]} >アナウンスの頻度</Text>
          </View>
          <Text style={[styles.subText, !withAudioGuide && styles.disabledSubText]} >5分</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workOutContainer} disabled={!withAudioGuide}>
          <View style={styles.rowContainer}>
            <Text style={[styles.pageDescription, !withAudioGuide && styles.disabledPageDescription]} >アナウンスする情報を選択</Text>
          </View>
          <Text style={[styles.subText, !withAudioGuide && styles.disabledSubText]} >タイム,距離,平均ペース</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workOutContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.pageDescription} >音量</Text>
            <Text style={styles.pageDescription} >{ Math.trunc(volume) }%</Text>
          </View>
          <Slider
            style={{width: '80%'}}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={handleVolumeChange}
            />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export {Page1, Page2, Page3, Page4};

const styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get('window').width*0.9,
    height: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    
  },
  pageTitleContainer: {
    top: 0,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    
  },
  scrollContainer: {
    width: '100%',
    height: '66%',
  },
  choiceContainerOn: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 70,
  },
  choiceContainerOff: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 80,
  },
  pageTitle: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  pageDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  disabledPageDescription :{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DDDDDD',
  },
  okButton: {
    bottom: '-2.5%',
    width: '100%',
    height: '10%',
    backgroundColor: '#3366CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  okText: {
    fontSize: 20,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workOutContainer: {
    width: '100%',
    height: 85,
    borderWidth: 1,
    borderColor: 'gray',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
  },
  disabledSubText: {
    fontSize: 14,
    color: '#DDDDDD',
  },
});