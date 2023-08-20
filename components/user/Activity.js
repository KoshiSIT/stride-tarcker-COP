import {StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Activity =  () => {
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>アクティビティ</Text>
                 <Text>今までの合計</Text>
            </View>
            <TouchableOpacity style={styles.content}>
                <FontAwesome5Icon name='list-ul' size={20} color = '#000033'/>
                <View style = {{justifyContent: 'center', alignItems: 'center', marginLeft: 10,}}>
                    <Text style={styles.contentText}>0</Text>
                    <Text style={{fontSize : 15, color : '#888888'}}>回</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Activity ;

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