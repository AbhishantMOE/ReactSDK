import React, {useState} from 'react';

import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
const ModalComp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{}}>
          <View style={{}}>
            <Text style={{}}>Hello World!</Text>
            <Pressable
              style={{}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{}}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={{}} onPress={() => setModalVisible(true)}>
        <Text style={{}}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

export default ModalComp;
