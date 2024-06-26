import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Title, IconButton, button, List, Divider, Dialog, Portal } from 'react-native-paper';
import { auth, db, firebase } from "../../firebase";
import { Avatar } from "react-native-elements";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import darkMode from "./ChatDark";

export default function HomeScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [leave, setLeave] = useState(null);
  const [theme, setTheme] = useState("light");

  const Home = () => {
    navigation.replace("homeScreen");
  };

// The chats displayed on this page are all of the threads where the user's id is part of the
//members.

  useLayoutEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('threads')
      .where("membersId", "array-contains", firebase.auth().currentUser.uid)
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            restaurant: '',
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

//When you hold down on a chat (LongPress) you will be able to remove yourself from the group
//chat. Your username and id will be removed from the members in threads, but not in history
//so that you can see what chats were used to be a part of. If you are the creator of the chat
//you will delete the chat and post for everyone.

function handleLeave() {
    firebase.firestore()
        .collection('threads')
        .doc(leave._id)
        .collection('messages')
        .add({
            text: `${auth?.currentUser?.displayName} has left ${leave.restaurant}.`,
            createdAt: new Date().getTime(),
            system: true
        });
    firebase.firestore()
        .collection('threads')
        .doc(leave._id)
        .update({
          membersId: arrayRemove(firebase.auth().currentUser.uid),
          membersName: arrayRemove(auth?.currentUser?.displayName),
        });
    firebase.firestore()
        .collection('threads')
        .doc(leave._id)
        .get()
        .then((querySnapshot) => {
               // doc.data() is never undefined for query doc snapshots
               if (querySnapshot.data().creator == firebase.auth().currentUser.uid) {
                   //add send notification for when a post is deleted
                   firebase.firestore()
                       .collection('threads')
                       .where('creator', '==', firebase.auth().currentUser.uid)
                       .where('restaurant', '==', querySnapshot.data().restaurant)
                       .get()
                       .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                              // doc.data() is never undefined for query doc snapshots
                              firebase.firestore()
                                  .collection('threads')
                                  .doc(doc.id)
                                  .delete()
                              })
                          });
                       }
                   });
    firebase.firestore()
        .collection('threads')
        .doc(leave._id)
        .collection('threadsMembers')
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              firebase.firestore()
              .collection('threads')
              .doc(leave._id)
              .collection('threadsMembers')
              .doc(doc.id)
              .delete()
              })
            })
        .then (() => {setLeave(null)});

}

function handleDismissLeave(){
    setLeave(null);
}


  return (
    <View style={styles.container}>
      <View >
        <Button title="History" dimension="60%" onPress={() => navigation.navigate("History")} />
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
              style={
                theme === "light"
                  ? styles.cardContainer
                  : darkMode.cardContainer
              }
            >
          <TouchableOpacity
            style={theme === "light" ? styles.card : darkMode.card}
            onPress={() => navigation.navigate("Chat", { thread: item })}
            onLongPress={() => setLeave(item)}
          >
            <Text
              style={theme === "light" ? styles.listTitle : darkMode.listTitle}
            >
              {item.restaurant}
            </Text>
            <Text
              style={
                theme === "light"
                  ? styles.listDescription
                  : darkMode.listDescription
              }
            >
              {item.latestMessage.text}
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#F4EEE0",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#F4EEE0",
    padding: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  listDescription: {
    paddingTop: 5,
    fontSize: 16,
    color: "gray",
  },
  title: {
    fontSize: 20,
    alignContent: "center",
    fontWeight: "500",
    color: "#1d1d1d",
    marginBottom: 6,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
//    alignItems: "left",
    flexDirection: "column",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fffceb",
  },
});
