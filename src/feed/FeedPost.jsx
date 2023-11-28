import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./FeedPost.style";
import { BottomPopup } from "./../post-details/BottomPopup";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, arrayUnion, update, doc, getDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { auth, db, firebase } from "../../firebase";
import MapView, { Marker } from "react-native-maps";

const FeedPost = ({ item, handleNavigate, deletePost }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (item.nearestAddress) {
      const { latitude, longitude } = item.nearestAddress;
      setRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  }, [item.nearestAddress]);


//The following chat stuff is backend for when someone joins a post.
//When they click "join" their username and user id will be added to
//the thread that they are joining, and in the chat it will say that
//they have joined. They will also be added to the history collection.


const goToChatPage = () => {
    firebase.firestore()
        .collection('threads')
        .where("restaurant", "==", item.restaurant)
        .where("creator", "==", item.creator)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore()
            .collection('threads')
            .doc(doc.id)
            .update({
             membersId: arrayUnion(firebase.auth().currentUser.uid),
             membersName: arrayUnion(auth?.currentUser?.displayName),
            });
            firebase.firestore()
            .collection('threads')
            .doc(doc.id)
            .collection('threadsMembers')
            .add({
              user: auth?.currentUser?.displayName,
              uid: firebase.auth().currentUser.uid,
              createdAt: new Date().getTime(),
            })
            firebase.firestore()
              .collection('threads')
              .doc(doc.id)
              .collection('messages')
              .add({
                text: `${auth?.currentUser?.displayName} has joined ${item.restaurant}.`,
                createdAt: new Date().getTime(),
                system: true
              });
          })
        });
    firebase.firestore()
      .collection('history')
      .where("restaurant", "==", item.restaurant)
      .where("creator", "==", item.creator)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          firebase.firestore()
          .collection('history')
          .doc(doc.id)
          .update({
            membersName: arrayUnion(auth?.currentUser?.displayName),
            membersId: arrayUnion(firebase.auth().currentUser.uid),
          });
          firebase.firestore()
          .collection('history')
          .doc(doc.id)
          .collection('historyMembers')
          .add({
            user: auth?.currentUser?.displayName,
            uid: firebase.auth().currentUser.uid,
            createdAt: new Date().getTime(),
          })
        })
      });
   navigation.navigate("ChatHome");
};

//Currently the only way to delete a chat is for the creator of the chat to
//delete the group chat for the post (this is all handles in ChatHome).

//   const handleDelete = () => {
//     deletePost(item.id); // Assume deletePost is a function that deletes a post by id.
//   };

  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const address = item.nearestAddress;
      if (address) {
        const formattedAddress = `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country} ${address.postalCode}`;
        setNearestAddress(formattedAddress);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    } catch (error) {
      console.log("Error retrieving address:", error);
    }
  };

// If a user has created a post, it will say created next to the restaurant
//name. If they have join, it will say joined. Otherwise it won't say anything
//next to the restaurant name. If the user's id is part of the post backend,
//then the "join" button will not appear, since they have already joined. If
//they leave then the join button will appear again.

  return (
    <TouchableOpacity style={styles.container} onPress={toggleExpanded}>
      <View style={styles.textContainer}>
        {item.membersId.filter((element) => element == firebase.auth().currentUser.uid) == firebase.auth().currentUser.uid && (
           <View>
            {item.creator == firebase.auth().currentUser.uid && (
                <Text style={styles.textWhite}>{item.restaurant} (Created)</Text>
            )}
            {item.creator != firebase.auth().currentUser.uid && (
                <Text style={styles.textWhite}>{item.restaurant} (Joined)</Text>
            )}
            </View>
        )}
        {item.membersId.filter((element) => element == firebase.auth().currentUser.uid) != firebase.auth().currentUser.uid && (
            <Text style={styles.textWhite}>{item.restaurant}</Text>
        )}
        <Text style={styles.timeColor}>
          {item.hour}:{item.minute} {item.isAM ? "AM" : "PM"}
        </Text>
        <Text style={{ color: "#e0e0e0", marginBottom: 5 }}>
          0.3 miles away
        </Text>

        {/* {!isExpanded && (
          <Text style={styles.textWhite}>More...</Text>
        )} */}
        {isExpanded && (
          <>
            {/* <Text style={styles.textWhite}>{item.link}</Text> */}
            <Text style={styles.textWhite}>
              {item.nearestAddress} {item.searchValue}
            </Text>

            <Text style={styles.textWhite}>{item.comments}</Text>
            {item.membersId.filter((element) => element == firebase.auth().currentUser.uid) != firebase.auth().currentUser.uid && (
                <TouchableOpacity style={styles.joinButton} onPress={goToChatPage}>
                  <Text style={styles.joinButtonText}>Join this Group order</Text>
                </TouchableOpacity>
            )}
          </>
        )}
{/*          add if there are no chats yet???   */}
      </View>
    </TouchableOpacity>
  );
};

export default FeedPost;
