
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { View, Text, Stylesheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Avatar } from 'react-native-elements';
import { auth, db, firebase } from '../../firebase';
import { signOut } from 'firebase/auth';
import { COLORS, icons, images, SIZES } from "../../constants";
import Welcome from "../headerInfo/welcome/Welcome";
import Feed from "../feed/Feed";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";


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
        <Icon.Button
          name="home-outline"
          color="#353535"
          size={25}
          backgroundColor="transparent"
          onPress={() => navigation.navigate("HomeScreen")}

        />
        <Icon.Button
          name="crown-outline"
          color="#353535"
          size={25}
          backgroundColor="transparent"
          // onPress={() => navigation.navigate("Achievements")}
        />
        <Icons.Button
          name="add-circle-outline"
          color="#353535"
          size={25}
          backgroundColor="transparent"
          onPress={() => navigation.navigate("AddPost")}
        />
        <Icon.Button
          name="message-processing-outline"
          color="#353535"
          size={25}
          backgroundColor="transparent"
          onPress={() => navigation.navigate("Messages")}
        />
        <Icon.Button
          name="cog-outline"
          color="#353535"
          size={25}
          backgroundColor="transparent"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
