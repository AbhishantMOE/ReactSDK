/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import ReactMoE, {
  MoEInitConfig,
  MoEPushConfig,
  MoEngageLogConfig,
  MoEngageLogLevel,
  MoEProperties,
} from 'react-native-moengage';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {MButton} from './components/MButton';
import {MoEAppStatus} from 'react-native-moengage';

import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import MoEReactInbox from 'react-native-moengage-inbox';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  ReactMoE.passFcmPushPayload(remoteMessage.data); // this is working
  // outside of scope lifecycle
});

function App(): React.JSX.Element {
  ///////////

  const getInboxMsg = async () => {
    var inboxData = await MoEReactInbox.fetchAllMessages();
    console.log('This is inbox data', inboxData);
    return inboxData;
  };

  const getToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('=======>', token);

      ReactMoE.passFcmPushToken(token);
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  }; // had to wrap this to not get service not found google error

  useEffect(() => {
    // Get your App Id from the MoEngage Dashboard
    const APP_ID = 'OXTAVQZDWWAROL2ESF8FWE8G';

    ReactMoE.enableAdIdTracking();

    // Optionally pass configuration for the React-Native Plugins
    const moEInitConfig = new MoEInitConfig(
      MoEPushConfig.defaultConfig(),
      new MoEngageLogConfig(MoEngageLogLevel.VERBOSE, true),
    );
    ReactMoE.initialize(APP_ID);
    MoEReactInbox.initialize(APP_ID);

    //     ReactMoE.setUserName("abc");
    // ReactMoE.setUserFirstName("abc");
    // ReactMoE.setUserLastName("xyz");
    // ReactMoE.setUserEmailID("abc@xyz.com");
    // ReactMoE.setUserContactNumber("1234567890");
    // ReactMoE.setUserGender("Male"); // OR Female

    //ReactMoE.setUserAttribute('MyspecialAttribute', 'idk');

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    getToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('This is a remote msg', remoteMessage);

      // Create the data payload with the extracted fields

      // Pass the data payload to the MoEngage SDK

      ReactMoE.passFcmPushPayload(remoteMessage.data); // this is working
    });

    return unsubscribe;
  }, []);

  ////////

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'Get msg'}
          onPressButton={() => {
            const msg = getInboxMsg();
            console.log(msg);
          }}
        />
      </View>

      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'Press to LogIn'}
          onPressButton={() => {
            ReactMoE.setUserUniqueID('abhiPixel7');
            console.log('hello');
          }}
        />
      </View>

      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'To Inbox'}
          onPressButton={() => {
            // let properties = new MoEProperties();
            // properties.addAttribute('quantity', 1);
            // properties.addAttribute('product', 'iPhone');
            // ReactMoE.trackEvent('Purchase', properties);

            console.log('hello');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
