import {StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Data =  () => {
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>データ</Text>
                 <Text>今までの合計</Text>
            </View>
            <View style={styles.content}>
                <Image 
                    source={require('../../assets/kari.png')}
                    style={{height: '100%', width: '100%',}}
                />
            </View>
        </View>
    );
}

export default Data;

const styles = StyleSheet.create({
    box : {
        height: 300,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderWidth: 0,

    },
    headlineBackground: {
        height: 30,
        width: '100%',
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontWeight: 'bold',
    },

});