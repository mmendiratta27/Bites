import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./FeedPost.style";
import { BottomPopup } from "./../post-details/BottomPopup";
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, arrayUnion, update, doc, getDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { auth, db, firebase } from '../../firebase';

//
// const image = {
//   uri: "https://images.prismic.io/raisingcanes/93a74859-268e-46ce-aa54-653a804c82cd_raising-canes-web-logo_0825_square.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C1000%2C1000&w=256&h=256",
// };
//
// const popuplist = [
//   {
//     id: 1,
//     name: "Pickup Location: 340 E. Foothill Blvd",
//   },
//   {
//     id: 2,
//     name: "Order closes in 30 minutes",
//   },
//   {
//     id: 3,
//     name: "1/5 people joined",
//   },
//   {
//     id: 4,
//     name: "Join Now",
//   },
// ];

const FeedPost = ({ item, handleNavigate, deletePost }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const navigation = useNavigation();

  const goToChatPage = () => {
        firebase.firestore()
            .collection('threads')
            .where("name", "==", item.restaurant)
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
                .collection('members')
                .add({
                  user: auth?.currentUser?.displayName,
                  uid: firebase.auth().currentUser.uid,
                  createdAt: new Date().getTime(),
                });
                })
            });
        firebase.firestore()
          .collection('history')
          .where("name", "==", item.restaurant)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              firebase.firestore()
              .collection('history')
              .doc(doc.id)
              .update({
                members: arrayUnion(auth?.currentUser?.displayName),
              });
              firebase.firestore()
              .collection('history')
              .doc(doc.id)
              .collection('members')
              .add({
                user: auth?.currentUser?.displayName,
                createdAt: new Date().getTime(),
              });
              })
          });
       navigation.navigate("ChatHome");
    };



    const handleDelete = () => {
      deletePost(item.id); // Assume deletePost is a function that deletes a post by id.
    };


  return (
    <TouchableOpacity style={styles.container} onPress={toggleExpanded}>
      <View style={styles.card}>
        <Text style={styles.textWhite}>{item.restaurant}</Text>
        <Text style={styles.textWhite}>
          {item.hour}:{item.minute} {item.isAM ? 'AM' : 'PM'}
        </Text>
        {!isExpanded && (
          <Text style={styles.textWhite}>More...</Text>
        )}
        {isExpanded && (
          <>
            <Text style={styles.textWhite}>{item.link}</Text>
            <Text style={styles.textWhite}>
              {item.nearestAddress} {item.searchValue}
            </Text>
            <Text style={styles.textWhite}>{item.comments}</Text>
            <TouchableOpacity style={styles.joinButton} onPress={goToChatPage}>
              <Text style={styles.joinButtonText}>Join this Group order</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FeedPost;