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
import { icons, SIZES } from "../../../../constants";
import darkMode from "./welcomeDark";
import Icons from "react-native-vector-icons/MaterialIcons";


const foodTypes = [
  "Asian Food",
  "Kenyan Food",
  "Mexican Food",
  "Fast Food",
  "Boba",
];

const Welcome = () => {
  const [activeFoodType, setActiveFoodType] = useState("Full-time");
  const [theme, setTheme] = useState("light");

  return (
    <View>
      <View style={theme == "light" ? styles.container : darkMode.container}>
        <Text style={theme == "light" ? styles.userName : darkMode.userName}>
          Hello Jessica :D
        </Text>
        <Text
          style={
            theme == "light" ? styles.welcomeMessage : darkMode.welcomeMessage
          }
        >
          Find your craving
        </Text>
      </View>
      <View style={{ marginTop: SIZES.medium }}>
        <View
          style={
            theme == "light" ? styles.searchContainer : darkMode.searchContainer
          }
        >
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
              style={
                theme == "light" ? styles.searchInput : darkMode.searchInput
              }
              value=""
              // placeholder="What are you looking for?"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <Icons
              name='search'
              color="#F4EEE0"
              size={27}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={theme == "light" ? styles.tabsContainer : darkMode.tabsContainer}>
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
