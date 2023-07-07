import { useState, useRef, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { SIZES } from "../../constants";

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
