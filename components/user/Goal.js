import {StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ProgressBar from 'react-native-progress/Bar';

import React , {useState} from 'react';
const Goal =  () => {
    const [progress, setProgress] = useState(0.3);
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>ゴール</Text>
            </View>
            <View style={styles.content}>
                <View style = {{marginLeft : 10 , alignItems : 'center', justifyContent : 'center'}}>
                    <View style={styles.setGoal}>
                        <Text style={styles.contentText}>ゴールを設定していません</Text>
                        <TouchableOpacity style = {styles.setGoalButton}>
                            <AntDesignIcon name="plus" size={12} color="white" style ={{margin : 5}}/>
                            <Text style = {{color : 'white', fontSize : 12, margin : 5, fontWeight: 'bold',}}>ゴールを設定する</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <ProgressBar progress={progress} width={300} height={10} color={'#3366CC'}  style = {{marginBottom : 10, marginRight : 10, backgroundColor : 'lightgray'}}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Goal;

const styles = StyleSheet.create({
    box : {
        height: 90,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderWidth: 0,

    },
    headlineBackground: {
        height: 25,
        width: '100%',
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    headlineText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 15,
        color: 'black',
        marginLeft: 10,
    },
    setGoal: {
        flex :1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    setGoalButton: {
        backgroundColor: '#3366CC',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50,
    },
});