import React, { useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { Title, IconButton, List, Divider } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';



export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);
  const Home = () => {
      navigation.replace('homeScreen');
      }

  useLayoutEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('threads')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            latestMessage: {
                text: ''
              },
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


  return (
      <View style={styles.container}>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity
               onPress={() => navigation.navigate('Chat', { thread: item })}
             >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});