import {StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ShoeTracker =  () => {
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>シューズトラッカー</Text>
            </View>
            <TouchableOpacity style={styles.content}>
                <MaterialCommunityIcons name="shoe-sneaker" size={30} color="black" />
                <View style = {{justifyContent: 'center', alignItems: 'center', marginLeft: 10,}}>
                <  Text style={styles.contentText}>シューズトラッカーを使用してください</Text>
                <  Text style={{fontsize : 15, color : '#888888'}}>シューズの走行距離をトラッキングします</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ShoeTracker ;

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
        fontWeight: 'bold',
    },
});