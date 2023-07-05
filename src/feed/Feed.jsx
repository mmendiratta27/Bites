import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import styles from "./Feed.style";
import { COLORS } from "../../constants";
import FeedPost from "./FeedPost";

const Feed = ({ navigation }) => {
  
  const isLoading = false;
  const error = false;
  const nearbyJobsData = [];
  const length = nearbyJobsData.length == 0? true : false
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Posts</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Sort by</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : length ?(
          <Text> There is nothing to show right now!</Text>
        ): (
          nearbyJobsData.map((job) => (
              <FeedPost
                key={job.id}
                item={job}
              />
            ))
        )
      }
      </View>
    </View>
  );
};

export default Feed;
