import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import ScreenHeaderBtn from "../home/headerInfo/ScreenHeaderBtn";
import styles from "../home/headerInfo/welcome/welcome.style";
import { KeyboardAvoidingView, Platform } from "react-native";
import { IconButton, Title } from "react-native-paper";
import { auth, db, firebase } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  updateProfile,
  updatePassword,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function EditProfile({ navigation }) {
  const [UserName, setUserName] = useState("");
  const [NewPass, setNewPass] = useState("");
  const [CurrPass, setCurrPass] = useState("");
  const [NewAvatar, setNewAvatar] = useState("");
  const auth = getAuth();


//When a user edits their profile their information will go to firebase and will change the
//current information in firebase with the new information. When they press "update" the app
//needs to be reloaded for the changes to show.

  function handleButtonPress() {
    if (UserName.length > 0) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: UserName,
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    if (NewPass.length > 0) {
      const user = firebase.auth().currentUser;
      try {
        user.updatePassword(NewPass);
        console.log("Password Updated!");
      } catch (err) {
        console.log(err);
      }
    }
    if (NewAvatar.length > 0) {
      firebase
        .auth()
        .currentUser.updateProfile({
          photoURL: NewAvatar,
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    return alert("Profile updated.");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE0" }}>
        <ScrollView>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Text style={styles.userName}>Change Name: </Text>
            <View style={{ marginVertical: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    labelName="UserName"
                    placeholder={auth.currentUser?.displayName}
                    value={UserName}
                    // clearButtonMode="while-editing"
                    style={{
                      flex: 1,
                      color: "black",
                      textAlign: "center",
                    }}
                    onChangeText={(text) => setUserName(text)}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.userName}>Change Password: </Text>
            <View style={{ marginVertical: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    labelName="NewPass"
                    placeholder="Enter a new password"
                    value={NewPass}
                    secureTextEntry
                    // clearButtonMode="while-editing"
                    style={{
                      flex: 1,
                      color: "black",
                      textAlign: "center",
                    }}
                    onChangeText={(text) => setNewPass(text)}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.userName}>New Avatar Url: </Text>
            <View style={{ marginVertical: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    labelName="NewAvatar"
                    placeholder={auth.currentUser?.avatar}
                    value={NewAvatar}
                    clearButtonMode="while-editing"
                    style={{
                      color: "black",
                      textAlign: "center",
                    }}
                    onChangeText={(text) => setNewAvatar(text)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#F4EEE0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#353535",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                }}
                onPress={() => handleButtonPress()}
                //  disabled={UserName.length === 0}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
