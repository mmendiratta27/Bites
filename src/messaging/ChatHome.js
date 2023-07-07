import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Title, IconButton, List, Divider } from "react-native-paper";
import { auth, db, firebase } from "../../firebase";
import { Avatar } from "react-native-elements";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import darkMode from "./ChatDark";

export default function HomeScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [theme, setTheme] = useState("dark");

  const Home = () => {
    navigation.replace("homeScreen");
  };

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("threads")
      .orderBy("latestMessage.createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: "",
            latestMessage: {
              text: "",
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <View
            style={
              theme == "light" ? styles.cardContainer : darkMode.cardContainer
            }
          >
            <TouchableOpacity
              style={theme == "light" ? styles.card : darkMode.card}
              resizeMode="contain"
              onPress={() => navigation.navigate("Chat", { thread: item })}
            >
              <Text
                style={theme == "light" ? styles.listTitle : darkMode.listTitle}
              >
                {item.name}
              </Text>
              <Text
                style={
                  theme == "light"
                    ? styles.listDescription
                    : darkMode.listDescription
                }
              >
                {item.latestMessage.text}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4EEE0",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#F4EEE0",
    padding: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  listDescription: {
    paddingTop: 5,
    fontSize: 16,
    color: "gray",
  },
  title: {
    fontSize: 20,
    alignContent: "center",
    fontWeight: "500",
    color: "#1d1d1d",
    marginBottom: 6,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "left",
    flexDirection: "column",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fffceb",
  },
});
