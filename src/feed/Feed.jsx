import React, {useContext, useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import styles from "./Feed.style";
import { COLORS } from "../../constants";
import FeedPost from "./FeedPost";

import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth, firebase } from '../../firebase';

const Feed = ({ navigation }) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoading = false;
  const error = false;
  // const nearbyJobsData = [];
  // const length = nearbyJobsData.length == 0? true : false

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, 'threads'), (snapshot) => {
          setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})));
          setLoading(false);
        });

        return () => unsubscribe();
      }, []);



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
        ) : posts.length == 0 ?(
          <Text> There is nothing to show right now!</Text>
        ): (
          posts.map((post) => (
              <FeedPost
                key={post.id}
                item={post.data}
              />
            ))
        )
      }
      </View>
    </View>
  );
};

export default Feed;
