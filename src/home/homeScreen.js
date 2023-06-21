import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { View, Text, Stylesheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { COLORS, icons, images, SIZES } from "../../constants";
import Welcome from "../headerInfo/welcome/Welcome";
import Feed from "../feed/Feed";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";
//import ChatHome from "../messages/ChatHome";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';


const Home = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      navigation.navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE0" }}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Feed />
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#F4EEE0",
          padding: SIZES.medium,
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <ScreenHeaderBtn
          iconUrl={icons.home}
          dimension="60%"
          handlePress={() => {
            // navigation.navigate("HomeScreen");
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
          }}
        />
        <ScreenHeaderBtn iconUrl={icons.location} dimension="60%" />
        <ScreenHeaderBtn
          iconUrl={icons.add}
          dimension="60%"
          handlePress={() => navigation.navigate("AddPost")}
        />
        <ScreenHeaderBtn iconUrl={icons.searchbtn} dimension="60%" />
        <ScreenHeaderBtn
          iconUrl={icons.message}
          dimension="65%"
          //replace with chat home
        />
      </View>
    </SafeAreaView>
  );

};

export default Home;
