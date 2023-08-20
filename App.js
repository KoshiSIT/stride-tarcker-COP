import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StartScreenProvider } from './contexts/StartScreenContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { AppProvider } from './contexts/AppContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import UserScreen from './screens/UserScreen';

import TrainingScreen from './screens/TrainingScreen';

import StartScreenMain from './screens/StartScreen';
import SettingsScreen from './screens/startScreens/SettingsScreen';
// setting screens
import TypeSettingScreen from './screens/startScreens/settingsScreens/TypeSettingScreen';
import RouteSettingScreen from './screens/startScreens/settingsScreens/RouteSettingScreen';
import TrackingSettingScreen from './screens/startScreens/settingsScreens/GPSSetting';
import PocketTrackingSettingScreen from './screens/startScreens/settingsScreens/PocketTrackSetting';
import AudioGuideSettingScreen from './screens/startScreens/settingsScreens/AuidioGuideSetting';
import AnnoucementFrequencySettingScreen from './screens/startScreens/settingsScreens/AnnoucementFrequencySetting';
  // intervalSettings screens
  import IntervalTimeSettingScreen from './screens/startScreens/settingsScreens/intervalSettingScreens/IntervalTimeSettingScreen';
  import IntervalDistanceSettingScreen from './screens/startScreens/settingsScreens/intervalSettingScreens/IntervalDistanceSettingScreen';
// workOut screens
import CustomScreen from './screens/startScreens/CustomScreen';
import StartRunScreen from './screens/startScreens/StartRunScreen';
import RusultScreen from './screens/startScreens/RusultScreen';
import RusultReviewScreen from './screens/startScreens/ResultReviewScreen';
import IntervalScreen from './screens/startScreens/workOutScreens/IntervalScreen';
import CommunityScreen from './screens/CommunityScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import { Settings } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserScreen} options={ {headerShown: false }}/>
    </Stack.Navigator>
  );
};

const TrainingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Training" component={TrainingScreen} options={ {headerShown: false }}/>
    </Stack.Navigator>
  );
};

const StartStack = () => {
  return (
    <StartScreenProvider>
      <ActivityProvider>
        <Stack.Navigator  
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            presentation: 'modal',
          }}
          
          >
            <Stack.Screen name="Start" component={StartScreenMain} options={ {headerShown: false }}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='TypeSetting' component={TypeSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='RouteSetting' component={RouteSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='TrackingSetting' component={TrackingSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='PocketTrackingSetting' component={PocketTrackingSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='AudioGuideSetting' component={AudioGuideSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='AnnoucementFrequencySetting' component={AnnoucementFrequencySettingScreen} options={ {headerShown: false }}/>
              <Stack.Screen name='IntervalTimeSetting' component={IntervalTimeSettingScreen} options={ {headerShown: false }}/>
              <Stack.Screen name='IntervalDistanceSetting' component={IntervalDistanceSettingScreen} options={ {headerShown: false }}/>
            <Stack.Screen name='StartRun' component={StartRunScreen} options={ {headerShown: false }}/>
            <Stack.Screen name="Result" component={RusultScreen} options={ {headerShown: false }}/>
            <Stack.Screen name="ResultReview" component={RusultReviewScreen} options={ {headerShown: false }}/>
            <Stack.Screen name="Custom" component={CustomScreen} options={ {headerShown: false }}/>
            <Stack.Screen name="Interval" component={IntervalScreen} options={ {headerShown: false }}/>
        </Stack.Navigator>
        </ActivityProvider>
    </StartScreenProvider>
  );
};

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Community" component={CommunityScreen} options={ {headerShown: false }}/>
    </Stack.Navigator>
  );
};

const ExplorerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explorer" component={ExplorerScreen} options={ {headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Tab.Navigator
          screenOptions = {({ route }) => ({
            tabBarStyle: { 
              height: 70,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'ユーザー') {
                return <FontAwesome5Icon name='smile-wink' size={size} color={color} />;
              } else if (route.name === 'トレーニング') {
                return <FontAwesomeIcon name='calendar-check-o' size={size} color={color} />;
              } else if (route.name === 'スタート') {
                return <EntypoIcon name='location-pin' size={size} color={color} />;
              } else if (route.name === 'コミュニティ') {
                return <FontAwesomeIcon name='group' size={size} color={color} />;
              } else if (route.name === 'エクスプローラー') {
                return <FontAwesome5Icon name='mountain' size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="ユーザー" 
          component={UserStack} 
          />
          <Tab.Screen name="トレーニング" 
            component={TrainingStack} 
          />
          <Tab.Screen name="スタート" 
            component={StartStack}
            options={{ headerShown: false}} 
          />
          <Tab.Screen name="コミュニティ" 
          component={CommunityStack} 
          />
          <Tab.Screen name="エクスプローラー" 
            component={ExplorerStack} 
          />
        </Tab.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}

