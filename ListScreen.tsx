import React from 'react';
import {View, ScrollView, Text, Pressable, Linking} from 'react-native';
import MoEReactInbox from 'react-native-moengage-inbox';
import ReactMoE, {
  MoEInitConfig,
  MoEPushConfig,
  MoEngageLogConfig,
  MoEngageLogLevel,
  MoEProperties,
} from 'react-native-moengage';

const ListScreen = ({route}) => {
  console.log('THis is the thing rec', route.params);
  console.log('THis is the thing rec', route.params.data.messages.length);
  console.log('Hello, here too much raining ahhhhhh');
  ReactMoE.setCurrentContext(['abcdef']);
  ReactMoE.showInApp();

  const data = route.params.data.messages;

  return (
    <View style={{paddingTop: 10}}>
      <ScrollView>
        {data.map(item => (
          <View
            style={{
              backgroundColor: 'grey',
              width: '100%',
              padding: 10,
              justifyContent: 'center',
              borderWidth: 2,
              height: 100,
            }}>
            <Pressable
              onPress={() => {
                console.log('Clicked', route.params.data.messages[0]);

                MoEReactInbox.trackMessageClicked(
                  route.params.data.messages[0],
                );
                //Linking.openURL(item.payload.gcm_webUrl);
              }}>
              <Text style={{color: 'white'}}>{item.payload.gcm_title}</Text>
              <Text style={{color: 'white'}}>{item.payload.gcm_subtext}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListScreen;
