import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";
import styles from "./FeedPost.style";
import { BottomPopup } from "./../post-details/BottomPopup";
import { useNavigation } from '@react-navigation/native';

const FeedPost = ({ item, handleNavigate, auth, deletePost }) => {
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
