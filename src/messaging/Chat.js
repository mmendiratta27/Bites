import React, { useCallback, useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db, firebase } from '../../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';

export default function Chat({route}) {

  const [messages, setMessages] = useState([]);

    function renderSystemMessage(props) {
      return (
        <SystemMessage
          {...props}
          wrapperStyle={styles.systemMessageWrapper}
          textStyle={styles.systemMessageText}
        />
      );
    }

    function renderBubble(props) {
        return (
          // Step 3: return the component
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                // Here is the color change
                backgroundColor: '#6646ee'
              }
            }}
            textStyle={{
              right: {
                color: '#fff'
              }
            }}
          />
        );
      };

  function renderSend(props) {
      return (
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <IconButton icon='send-circle' size={32} color='#6646ee' />
          </View>
        </Send>
      );
    }

  function scrollToBottomComponent() {
      return (
        <View style={styles.bottomComponentContainer}>
          <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
        </View>
      );
    }

    function renderLoading() {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }

  const { thread } = route.params;



  useLayoutEffect(() => {
        const messagesListener = firebase.firestore()
          .collection('threads')
          .doc(thread._id)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();

              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              };

              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.email
                };
              }

              return data;
            });

            setMessages(messages);
          });

        return () => messagesListener();
      }, []);






  // helper method that is sends a message
  async function handleSend(messages) {
    const text = messages[0].text;



    firebase.firestore()
        .collection('threads')
        .doc(thread._id)
        .collection('messages')
        .add({
          text,
          createdAt: new Date().getTime(),
          user: {
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName
          }
        });

    await firebase.firestore()
          .collection('threads')
          .doc(thread._id)
          .set(
            {
              latestMessage: {
                text,
                createdAt: new Date().getTime()
              }
            },
            { merge: true }
          );


  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: auth?.currentUser?.email }}
      renderBubble={renderBubble}
      placeholder='Type your message here...'
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
    />
  );
}



const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
    },
  bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center'
      },
  loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  systemMessageText: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold'
    }
  });