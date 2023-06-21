import { useState, useRef, useEffect} from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

import { icons, SIZES } from "../../constants";
import Welcome from "../headerInfo/welcome/Welcome";
import Feed from "../feed/Feed";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";

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
            navigation.navigate('homeScreen');
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
          }}
        />
        <ScreenHeaderBtn iconUrl={icons.location} dimension="60%" />
        <ScreenHeaderBtn
          iconUrl={icons.add}
          dimension="60%"
           //replace with AddPost Nav
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
