import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";


const foodTypes = [
  "Asian Food",
  "Kenyan Food",
  "Mexican Food",
  "Fast Food",
  "Boba",
];


const Welcome = () => {
  const [activeFoodType, setActiveFoodType] = useState("Full-time");


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Jessica :D</Text>
        <Text style={styles.welcomeMessage}>Find your craving</Text>
      </View>
      <View style={{ marginTop: SIZES.medium }}>
        <View style={styles.searchContainer}>
          <View></View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fffceb",
              marginRight: SIZES.small,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SIZES.medium,
              height: "100%",
            }}
          >
            <TextInput
              style={styles.searchInput}
              value=""
              // placeholder="What are you looking for?"
            />
          </View>


          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.tabsContainer}>
        <FlatList
          data={foodTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeFoodType, item)}
              onPress={() => {
                setActiveFoodType(item);
              }}
            >
              <Text style={styles.tabText(activeFoodType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};


export default Welcome;
