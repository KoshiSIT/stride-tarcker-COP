import {StyleSheet, Text, View ,Image, FlatList,SafeAreaView} from 'react-native';
import {useContext} from "react";
import {TranslationContext} from "../../translator";

const Achievements =  () => {
    const { translations: { Achievementsjs: translated } } = useContext(TranslationContext);

    return(
        <View style={styles.box}>
            <View style={styles.headlineBackground}>
                <Text style={styles.headlineText}>{translated.achievements}</Text>
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
        marginLeft: 5
    },
    content: {
        height: 30,
        backgroundColor: 'white',
    },  
});