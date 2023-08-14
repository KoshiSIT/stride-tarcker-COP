import {StyleSheet, Text, View ,Image, FlatList,SafeAreaView} from 'react-native';

const Achievements =  () => {
    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>達成内容</Text>
            </View>
            <View style={styles.content}>
            </View>
        </View>
    );
}

export default Achievements ;

const styles = StyleSheet.create({
    box : {
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
        backgroundColor: 'lightgray',
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
});