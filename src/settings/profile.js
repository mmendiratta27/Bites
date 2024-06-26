import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import ScreenHeaderBtn from "../home/headerInfo/ScreenHeaderBtn";
import { images } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomPopup } from "../post-details/BottomPopup";
import EditProfile from "./editProfile";

export default function Profile({navigation}) {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.profcontainer}>
        <View style={styles.profprofile}>
          <View style={styles.profileHeader}>
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
              style={styles.profileAvatar}
            />

            <View style={styles.profileBody}>
              <Text style={styles.profileName}> Manan Mendiratta </Text>
              <Text style={styles.profileHandle}>@mmendiratta</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("EditProfile")}
            resizeMode="contain"
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profcontainer: {
    paddingVertical: 0,
    flex: 1,
    backgroundColor: "#F4EEE0",
  },
  profprofile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#F4EEE0",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    weight: 60,
    height: 60,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
    marginLeft: 12,
  },
  profileHandle: {
    fontSize: 15,
    color: "#989898",
    marginTop: 4,
    marginLeft: 12,
  },
  profileAction: {
    marginTop: 16,
    backgroundColor: "#353535",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileActionText: {
    marginRight: 0,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
