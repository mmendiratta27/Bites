import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";
import styles from "./FeedPost.style";
import { BottomPopup } from "./../post-details/BottomPopup";

const image = {
  uri: "https://images.prismic.io/raisingcanes/93a74859-268e-46ce-aa54-653a804c82cd_raising-canes-web-logo_0825_square.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C1000%2C1000&w=256&h=256",
};

const popuplist = [
  {
    id: 1,
    name: "Pickup Location: 340 E. Foothill Blvd",
  },
  {
    id: 2,
    name: "Order closes in 30 minutes",
  },
  {
    id: 3,
    name: "1/5 people joined",
  },
  {
    id: 4,
    name: "Join Now",
  },
];

const FeedPost = ({ item, handleNavigate }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={showPopup}
        resizeMode="contain"
      >
        <View style={styles.logoContainer}>
          <Image source={image} resizeMode="contain" style={styles.logImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            Raising Canes
          </Text>
        </View>
        <View style={styles.jobTypeContainer}>
          <Text style={styles.jobType} numberOfLines={1}>
            0.3 miles away
          </Text>
          <Text style={styles.jobType} numberOfLines={1}>
            15 minutes left
          </Text>
          <Text style={styles.jobType} numberOfLines={1}>
            1/5 Joined
          </Text>
        </View>
      </TouchableOpacity>
      {isPopupVisible && (
        <BottomPopup
          title="Raising Cane's"
          onTouchOutside={hidePopup}
          data={popuplist}
          />

      )}
    </>
  );
};

export default FeedPost;
