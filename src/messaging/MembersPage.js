import React, { useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { Title, IconButton, button, List, Divider, Dialog, Portal } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
//import { ListItem, leftAvatar } from "@react-native-material/core";

export default function MembersPage({route}) {

  const [members, setMembers] = useState([]);
//  const { thread } = route.params;

useLayoutEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('threads')
      .doc(route.params.thread._id)
      .collection('members')
      .onSnapshot(querySnapshot => {
        const members = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            user: '',
            avatar: '',
            ...documentSnapshot.data()
          };
        });

        setMembers(members);

      });

    return () => unsubscribe();
  }, []);



  return (

      <View style={styles.container}>
        <View >
          <Text style={styles.title}>Members</Text>
        </View>
        <FlatList
          data={members}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <List.Item
              avatar={{ uri: 'https://th.bing.com/th/id/OIP.I8PNp6d_rS2RIxwPlCVQFAHaHE?pid=ImgDet&rs=1' }}
//can't get avatar to work
              title={item.user}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
            />
          )}
        />

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
