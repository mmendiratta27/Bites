import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { auth, db, firebase } from '../../firebase';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';



export default function AddPost({ navigation }) {
  const [roomName, setRoomName] = useState('');

function handleButtonPress() {
  if (roomName.length > 0) {
    firebase.firestore()
      .collection('threads')
      .add({
        name: roomName,
        latestMessage: {
          text: `You have joined ${roomName}.`,
          createdAt: new Date().getTime()
        }
      })
      .then(docRef => {
        docRef.collection('messages').add({
          text: `You have joined ${roomName}.`,
          createdAt: new Date().getTime(),
          system: true
        });
        navigation.navigate('homeScreen');
      });
  }
}
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a post</Title>
        <TextInput style={styles.input}
          placeholder="Restaurant Name"
          labelName='Room Name'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <Button
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  }
});