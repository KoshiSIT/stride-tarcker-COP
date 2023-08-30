import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity , Animated, ScrollView, Dimensions, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState, useRef} from 'react';

import MapView,{ Marker }  from 'react-native-maps';
import { Svg, Circle } from 'react-native-svg';
import * as Location from 'expo-location';
import { useAppContext } from '../../contexts/AppContext';
import { useActivityContext } from '../../contexts/ActivityContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FonttistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Constants from 'expo-constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';
export default function ResultReviewScreen({}){
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePick = async () => {
        const permissonResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissonResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            madiaTypes : ImagePicker.MediaTypeOptions.Images,
            quality : 0.8,
        });

        if (!pickerResult.canceled){
            setSelectedImage({localUri : pickerResult.uri});
        }
    };

    const navigation = useNavigation();
    const { currentLocation, handleSetCurrentLocation } = useAppContext();
    const { time, pace, locationLog, calorie} = useActivityContext();

    const [pictureIndex, setPictureIndex] = useState(0);
    useEffect(() => {
        getLocationPermission();
      }, []);
  
    const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        startLocationUpdates();
    }
    };

    const startLocationUpdates = async () => {
    Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        position => {
        const { latitude, longitude } = position.coords;
        handleSetCurrentLocation({ latitude, longitude } );
        }
    );
    };
    
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('コミュニティ');}}>
                    <FontAwesomeIcon name='chevron-left' size={30} color = 'black'/>
                </TouchableOpacity>
                <Text style={{fontWeight : 'bold', fontSize : 16}}>結果</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('StartRun');}}>
                    <FeatherIcon name="share" size={30} color= "black" />
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
               <ScrollView 
                    horizontal
                    pagingEnabled
                    style={styles.pictureScroll}
                    scrollEnabled={selectedImage !== null}
                    onMomentumScrollEnd={(event) => {
                        const contentOffsetx = event.nativeEvent.contentOffset.x;
                        const index = Math.floor(contentOffsetx*2 / Dimensions.get('window').width);
                        setPictureIndex(index);
                    }}
                >
                     {currentLocation && (
                    <MapView
                        scrollEnabled={false} 
                        zoomEnabled={false}
                        style={styles.map}
                        region={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        >
                    <Marker
                        coordinate={{
                            latitude : currentLocation.latitude,
                            longitude : currentLocation.longitude,
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View>
                            <Svg width={24} height={24} viewBox="0 0 24 24">
                                <Circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} fill="#3366CC" />
                            </Svg>
                        </View>
                    </Marker>
                    </MapView>
                )}
                {selectedImage !== null &&(
                    <View style={styles.pictureItem}>
                        <Image
                            source={{ uri: selectedImage.localUri }}
                            style = {{width : '100%', height : '100%'}}
                        />
                    </View>
                    )}
                    </ScrollView>
                    <View style={styles.pictureContainerBottom}>
                        <View></View>
                        {selectedImage !== null ? (
                        <View style ={styles.dotContainer}>
                            <View style={[styles.dot, pictureIndex === 0 && styles.activeDot]}></View>
                            <View style={[styles.dot, pictureIndex === 1 && styles.activeDot]}></View>
                        </View>
                        ):(<View></View>)}
                        <View style ={styles.Circle}>
                            <TouchableOpacity onPress ={()=>handleImagePick()}>
                                <MaterialCommunityIcons name="camera-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                <   View style={styles.dataSubItem}>
                        <Text style={{fontSize : 20}}>{time.toFixed(2)}</Text>
                        <Text>タイム</Text>
                    </View>
                    <View style={styles.dataSubItem}>
                        <Text style={{fontSize : 20}}>{calorie}</Text>
                        <Text>カロリー</Text>
                    </View>
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
                <View style={styles.detailContainer}>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataSubItem: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    pictureContainerBottom: {
        position: 'absolute',
        top: 250,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    detailContainer: {
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
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        width: 50,
        height: 15,
        backgroundColor: 'white',
        borderRadius: 10,
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
    map: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
    pictureItem : {
        height : '100%',
        width : Dimensions.get('window').width,
    },
    pictureScroll : {
        height : '100%',
    },
    dot : {
        height : 8,
        width : 8,
        borderRadius : 4,
        backgroundColor : 'lightgray',
        marginHorizontal : 4,
    },
    activeDot : {
        backgroundColor : 'gray',
    },
    Circle : {
        height : 50,
        width : 50,
        borderRadius : 25,
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
    },
});
