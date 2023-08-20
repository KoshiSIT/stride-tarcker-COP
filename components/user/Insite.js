import {StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
const Insite =  () => {
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>アクティビティ</Text>
                 <Text>合計1キロメートル</Text>
            </View>
            <TouchableOpacity style={styles.content}>
                <Fontisto name='bar-chart' size={20} color = 'gray'/>
                <View style = {{justifyContent: 'center', alignItems: 'center', marginLeft: 10,}}>
                <  Text style={styles.contentText}>過去のデータを見てみよう</Text>
                <  Text style={{fontSize : 15, color : '#888888'}}>{10}件のアクティビティを分析してみよう</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Insite;

const styles = StyleSheet.create({
    box : {
        height: 90,
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
        marginLeft: 10,
    },
    contentText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
});