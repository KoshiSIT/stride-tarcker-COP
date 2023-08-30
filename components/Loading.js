import {View, Text} from 'react-native';

export default function Loading() {
    return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
}