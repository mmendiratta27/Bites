import React, { useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { Title, IconButton, button, List, Divider, Dialog, Portal } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';




export default function Profile({navigation}) {

 const [threads, setThreads] = useState([]);
 const [leave, setLeave] = useState(null);

useLayoutEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('history')
      .where("members", "array-contains", auth?.currentUser?.displayName)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            createdAt: '',
            members: [],
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

function handleLeave() {
    firebase.firestore()
      .collection('history')
      .doc(leave._id)
      .delete()
      .then (() => {setLeave(null)});
}

function handleDismissLeave(){
    setLeave(null);
}

  return (

      <View style={styles.container}>
        <View >
          <Text style={styles.title}> History</Text>
        </View>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity
               onLongPress={() => setLeave(item)}
             >
            <List.Item
              title={item.name} //item.latestMessage.createdAt
              description= {item.members}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
            </TouchableOpacity>
          )}
        />


          <Dialog visible={leave} onDismiss={handleDismissLeave}>
            <Dialog.Title>Leave Chat?</Dialog.Title>
            <Dialog.Actions>
              <Button title='Cancel' onPress={handleDismissLeave}></Button>
              <Button title='Confirm' onPress={handleLeave}></Button>
            </Dialog.Actions>
          </Dialog>










      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4EEE0',
    flex: 1,
    paddingVertical: 50,
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  },
  title:{
      fontSize:20,
      alignContent: 'center',
      fontWeight:'700',
      color: '#1d1d1d',
      marginBottom: 6,
      justifyContent: 'center'
  },
});