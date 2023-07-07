import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { icons } from "../../constants";
import { Switch } from "react-native-gesture-handler";
import styles from "./settings.styles";
import ScreenHeaderBtn from "../home/headerInfo/ScreenHeaderBtn";
import Profile from "./profile";
import Icon from "react-native-vector-icons/Feather";
import email from 'react-native-email'

const SECTIONS = [
  {
    header: "Preferences",
    items: [
      { id: "darkMode", icon: "moon", label: "Dark Mode", type: "toggle" },
      {
        id: "notifications",
        icon: "bell",
        label: "Notifications",
        type: "select",
      },
    ],
  },
  {
    header: "Help",
    items: [
      { id: "report", icon: "flag", label: "Report User", type: "link" },
      { id: "contact", icon: "mail", label: "Contact Us", type: "link" },
    ],
  },
];

const Settings = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  const handlePress = (id) => {
    if (id === "notifications") {
      navigation.navigate("notifSettings");
    }else if (id === "contact"){
      handleEmail()
    }
  };

  const handleEmail = () => {
    const to = ['grouporder.ssu@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            // subject: 'Show how to use',
            // body: 'Some body right here',
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
  }

  const [form, setForm] = useState({
    language: "English",
    darkMode: false,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE0" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Profile />
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>

            <View style={styles.sectionBody}>
              {items.map(({ label, id, type, icon }, index) => (
                <View
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}
                  key={id}
                >
                  {/* handleOnPress */}
                  <TouchableOpacity
                    onPress={() => {
                      handlePress(id);
                    }}
                  >
                    <View style={styles.row}>
                      <Icon name = {icon} size={20} style={styles.icons}/>
                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />
                      {type === "select" && (
                        <Text style={styles.rowValue}>{form[id]}</Text>
                      )}

                      {type === "toggle" && (
                        <Switch
                          value={form[id]}
                          onValueChange={(value) =>
                            setForm({ ...form, [id]: value })
                          }
                          trackColor={{ false: "#353535", true: "#353535" }}
                          thumbColor={form[id] ? "#f4f3f4" : "#f4f3f4"}
                        />
                      )}

                      {["select", "link"].includes(type) && (
                        <Icon name="chevron-right" size={30} color="#353535" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
