import { useState, useRef, useEffect, useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { SIZES } from "../../constants";
import {auth, db, firebase} from '../../firebase';
import {Firebase} from '@react-native-firebase/firestore';

import Welcome from "./headerInfo/welcome/Welcome";
import Feed from "../feed/Feed";

const Home = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollViewRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);


//The "refresh" function below will refresh the page every 100 milliseconds. When a post is created
// an "endAt" time is created as either 1 day later or 1 week later. If the endAt date has expired,
// the thread/history will delete from firebase.

   const refresh = () => {

    firebase.firestore()
      .collection('threads')
      .where("endAt", "<", new Date())
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs[0] !== undefined) {
            querySnapshot.docs[0].ref.delete();
            };
        });


    firebase.firestore()
      .collection('history')
      .where("endAt", "<", new Date())
      .get()
      .then(querySnapshot => {
          if (querySnapshot.docs[0] !== undefined) {
              querySnapshot.docs[0].ref.delete();
              };
        });
};

 useEffect(() => {
    const refreshInterval = setInterval(refresh, 100);

    return () => {
    clearInterval(refreshInterval);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      navigation.navigate(`/search/${searchTerm}`);
    }
  };







  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
      }}
    >
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Feed />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
