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
            });
          })
        });
    firebase.firestore()
      .collection('threads')
      .then(docRef => {
        docRef.collection('messages').add({
          text: `${auth?.currentUser?.displayName} has joined ${restaurant}.`,
          createdAt: new Date().getTime(),
          system: true
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

  const handleDelete = () => {
    deletePost(item.id); // Assume deletePost is a function that deletes a post by id.
  };

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
      </View>
    </TouchableOpacity>
  );
};

export default FeedPost;
