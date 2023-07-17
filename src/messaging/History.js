import React, { useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Title, IconButton, button, List, Divider, Dialog, Portal } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';



export default function Profile({navigation}) {

 const [threads, setThreads] = useState([]);
 const [thread, setThread] = useState([]);
 const [leave, setLeave] = useState(null);

 const [activeTab, setActiveTab] = useState('CreatedPosts');


     const handleTabChange = (tab) => {
       setActiveTab(tab);
     };


useLayoutEffect(() => {
    const unsubscribe =
      firebase.firestore()
          .collection('history')
          .where("creator", "==", firebase.auth().currentUser.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
             const threads = querySnapshot.docs.map(documentSnapshot => {
               return {
                 _id: documentSnapshot.id,
                 // give defaults
                 name: '',
                 createdAt: '',
                 membersId: [],
                 membersName: [],
                 ...documentSnapshot.data()
               };
             });
             setThreads(threads);
           });
      firebase.firestore()
         .collection('history')
         .where("membersId", "array-contains", firebase.auth().currentUser.uid)
         .where("creator", "!=", firebase.auth().currentUser.uid)
         .orderBy('creator', 'desc')
         .orderBy('createdAt', 'desc')
         .onSnapshot(querySnapshot => {
             const thread = querySnapshot.docs.map(documentSnapshot => {
               return {
                 _id: documentSnapshot.id,
                 // give defaults
                 name: '',
                 createdAt: '',
                 membersId: [],
                 membersName: [],
                 ...documentSnapshot.data()
               };
             });
             setThread(thread);
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
                data={threads}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                     onLongPress={() => setLeave(item)}
                   >
                  <List.Item
                    title={item.name} //item.latestMessage.createdAt
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
                data={thread}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                     onLongPress={() => setLeave(item)}
                   >
                  <List.Item
                    title={item.name} //item.latestMessage.createdAt
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
      fontSize:20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeTabText: {
    color: 'black',
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
