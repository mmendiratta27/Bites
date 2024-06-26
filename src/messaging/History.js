import React, { useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Title, IconButton, button, List, Divider, Dialog, Portal } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where, arrayRemove } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';



export default function Profile({navigation}) {

 const [created, setCreated] = useState([]);
 const [joined, setJoined] = useState([]);
 const [leave, setLeave] = useState(null);

 const [activeTab, setActiveTab] = useState('CreatedPosts');


     const handleTabChange = (tab) => {
       setActiveTab(tab);
     };

//the threads displayed here are all of the chats a user has ever been a member of.

useLayoutEffect(() => {
    const unsubscribe =
      firebase.firestore()
           .collection('history')
           .where("membersId", "array-contains", firebase.auth().currentUser.uid)
           .where("creator", "!=", firebase.auth().currentUser.uid)
           .orderBy('creator', 'desc')
           .orderBy('createdAt', 'desc')
           .onSnapshot(querySnapshot => {
               const join = querySnapshot.docs.map(documentSnapshot => {
                 return {
                   _id: documentSnapshot.id,
                   // give defaults
                   restaurant: '',
                   createdAt: '',
                   membersId: [],
                   membersName: [],
                   ...documentSnapshot.data()
                 };
               });
               setJoined(join);
           });
      firebase.firestore()
          .collection('history')
          .where("membersId", "array-contains", firebase.auth().currentUser.uid)
          .where("creator", "==", firebase.auth().currentUser.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
             const create = querySnapshot.docs.map(documentSnapshot => {
               return {
                 _id: documentSnapshot.id,
                 // give defaults
                 restaurant: '',
                 createdAt: '',
                 membersId: [],
                 membersName: [],
                 ...documentSnapshot.data()
               };
             });
             setCreated(create);
           });


    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

//You can delete yourself from the history, but this deletes you for everyone, which we don't
//want. We want others to still see who was in the chat with them, so maybe this feature
//shouldn't be used.

function handleLeave() {
    firebase.firestore()
        .collection('history')
        .doc(leave._id)
        .update({
          membersId: arrayRemove(firebase.auth().currentUser.uid),
          membersName: arrayRemove(auth?.currentUser?.displayName),
        });
    firebase.firestore()
        .collection('history')
        .doc(leave._id)
        .collection('historyMembers')
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              firebase.firestore()
              .collection('history')
              .doc(leave._id)
              .collection('historyMembers')
              .doc(doc.id)
              .delete()
              })
            })
        .then (() => {setLeave(null)});

}

function handleDismissLeave(){
    setLeave(null);
}

//The threads above are split into two tabs. One tab shows you the posts/chats that you created
//and the other shows posts/chats that you had joined.

  return (
    <View style={styles.container}>
      <View style={{marginTop: 10, alignItems: "center"}}>
          <Text style={styles.title}> History</Text>
      </View>
      <View style={styles.tabs}>
      <TouchableOpacity
          style={[styles.tab, activeTab === 'CreatedPosts' && styles.activeTab]}
          onPress={() => handleTabChange('CreatedPosts')}
        >
          <Text style={[styles.tabText, activeTab === 'CreatedPosts' && styles.activeTabText]}>
            Created Posts
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.tab, activeTab === 'JoinedPosts' && styles.activeTab]}
          onPress={() => handleTabChange('JoinedPosts')}
        >
          <Text style={[styles.tabText, activeTab === 'JoinedPosts' && styles.activeTabText]}>Joined Posts</Text>
      </TouchableOpacity>
      </View>
      {activeTab === 'CreatedPosts' && (
        <>
          <View style={styles.containers}>
              <FlatList
                data={created}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                     onLongPress={() => setLeave(item)}
                   >
                  <List.Item
                    title={item.restaurant} //item.latestMessage.createdAt
                    description= {item.membersName.join(", ")}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                  />
                  </TouchableOpacity>
                )}
              />
          </View>
        </>
      )}
      {activeTab === 'JoinedPosts' && (
        <>
          <View style={styles.containers}>
              <FlatList
                data={joined}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                     onLongPress={() => setLeave(item)}
                   >
                  <List.Item
                    title={item.restaurant} //item.latestMessage.createdAt
                    description= {item.membersName.join(", ")}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                  />
                  </TouchableOpacity>
                )}
              />
            </View>
        </>
      )}

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
//  container: {
//    backgroundColor: '#F4EEE0',
//    flex: 1,
//    paddingVertical: 50,
//  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  },
  title:{
      fontSize:18,
      alignContent: 'center',
      fontWeight:'700',
      color: '#1d1d1d',
      marginBottom: 6,
      justifyContent: 'center'
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingVertical: 50,
    marginTop: -10,
    backgroundColor: '#F4EEE0'
  },
  containers: {
      flexGrow: 1,
      padding: 16,
      marginTop: -10,
      backgroundColor: '#F4EEE0'
    },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#353535',
  },
  activeTabText: {
    color: '#353535',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  grayedOutAchievement: {
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  achievementDescription: {
    marginTop: 4,
    fontSize: 14,
    color: 'black',
  },
  grayedOutAchievementText: {
    color: 'gray',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  grayedOutAchievementImage: {
    opacity: 0.5,
  },
  achievementImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
