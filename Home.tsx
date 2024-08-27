/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
  Modal,
  useColorScheme,
  View,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';

import {ToastAndroid} from 'react-native';

const notifyMessage = msg => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

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
import {useNavigation} from '@react-navigation/native';
import MoEReactInbox from 'react-native-moengage-inbox';
import ReactMoEngageCards from 'react-native-moengage-cards';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  ReactMoE.passFcmPushPayload(remoteMessage.data); // this is working
  // outside of scope lifecycle
});

const Home = ({}) => {
  ///////////

  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);

  const getInboxMsg = async () => {
    console.log('In getinbocmethod');

    var inboxData = await MoEReactInbox.fetchAllMessages();
    console.log('This is inbox data', inboxData);
    return inboxData;
  };

  const getCards = async () => {
    const cardsInfo = await ReactMoEngageCards.getCardsInfo();
    console.log('This is card info data', cardsInfo);
    return cardsInfo;
  };

  const getInAppData = () => {
    let inAppData = ReactMoE.getSelfHandledInApp();
    return inAppData;
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

    // ReactMoE.setEventListener('inAppCampaignShown', inAppInfo =>
    //   console.log('inAppCampaignShown', inAppInfo),
    // );

    ReactMoE.initialize(APP_ID);
    ReactMoEngageCards.initialize(APP_ID);
    MoEReactInbox.initialize(APP_ID);

    ReactMoE.setUserUniqueID('abhishant');

    ReactMoE.setEventListener('pushClicked', notificationPayload => {
      console.log('pushClicked Abhishant', notificationPayload);
      notifyMessage('Hey there');
    });

    // ReactMoE.setUserFirstName("abc");
    // ReactMoE.setUserLastName("xyz");
    // ReactMoE.setUserEmailID("abc@xyz.com");
    // ReactMoE.setUserContactNumber("1234567890");
    // ReactMoE.setUserGender("Male"); // OR Female

    //ReactMoE.setUserAttribute(pass'MyspecialAttribute', 'idk');

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    getToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('This is a remote msg', remoteMessage);
      // Pass the data payload to the MoEngage SDK
      ReactMoE.passFcmPushPayload(remoteMessage.data); // this is working
    });

    return unsubscribe;
  }, []);

  ////////

  ReactMoE.setEventListener(
    'inAppCampaignSelfHandled',
    (selfHandledPayload: any) => {
      console.log('Hey');

      if (selfHandledPayload && Object.keys(selfHandledPayload).length != 0) {
        console.log('inAppCampaignSelfHandled2', selfHandledPayload);
        // let d = JSON.parse(selfHandledPayload.campaign.payload);
        // console.log('===>', d);

        // Set the payload data in the state variable
        //setModalPayload(d);

        // Show the modal
        // ReactMoE.selfHandledShown(selfHandledPayload);

        //setIsModalVisible(true);
      }
    },
  );

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        {/* <MButton
          name={'Get msg'}
          onPressButton={async () => {
            const msg = await getInboxMsg();
            console.log('this======>', msg);
          }}
        /> */}

        <MButton
          name={'Get msg'}
          onPressButton={async () => {
            const msg = await getInboxMsg();
            console.log('this======>', msg);
          }}
        />
      </View>

      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'Show In App'}
          onPressButton={() => {
            //const inAppData = getInAppData();
            ReactMoE.getSelfHandledInApp();
            ReactMoE.getSelfHandledInApp();

            // setTimeout(() => {
            //   ReactMoE.getSelfHandledInApp();
            // }, 1000);

            //ReactMoE.showInApp();
            // ReactMoE.showNudge();
            //console.log('this is in app datat,', getInAppData());

            //console.log('This is inAPp data', inAppData);

            //navigation.navigate('InApp');
            console.log('clicked sho inapp');
          }}
        />
      </View>

      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'To Inbox'}
          onPressButton={async () => {
            const msg = await getInboxMsg();
            console.log('Clicked to navigate');

            navigation.navigate('List', {data: msg});

            // let properties = new MoEProperties();
            // properties.addAttribute('quantity', 1);
            // properties.addAttribute('product', 'iPhone');
            // ReactMoE.trackEvent('Purchase', properties);

            console.log('hello');
          }}
        />
      </View>

      <View style={{width: 150, marginTop: 40, alignSelf: 'center'}}>
        <MButton
          name={'Cards'}
          onPressButton={async () => {
            const msg = await getCards();
            console.log('This si msg ==>', msg);

            navigation.navigate('List2', {data: msg});

            // let properties = new MoEProperties();
            // properties.addAttribute('quantity', 1);
            // properties.addAttribute('product', 'iPhone');
            // ReactMoE.trackEvent('Purchase', properties);

            console.log('hello to scrn 2');
          }}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'grey',
            height: '100%',
            alignItems: 'center',
            borderWidth: 5,
            margin: 30,
          }}>
          <Text style={{color: 'white', marginTop: 100}}>
            {modalPayload?.title}
          </Text>
          <Text style={{color: 'white'}}>{modalPayload?.msg}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
