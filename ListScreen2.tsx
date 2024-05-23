import React from 'react';
import {View, ScrollView, Text, Pressable, Linking} from 'react-native';
import MoEReactInbox from 'react-native-moengage-inbox';

const ListScreen2 = ({route}) => {
  console.log('THis is the thing rec', route.params.data.messages);
  //console.log('THis is the thing rec', route.params.data.messages.length);

  const data = route.params.data.messages;

  return (
    <View style={{paddingTop: 10}}>
      {
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
      }
    </View>
  );
};

export default ListScreen2;
