import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useRef} from "react";
import { icons } from "../../constants";
import { Switch } from "react-native-gesture-handler";
import styles from "./settings.styles";
import ScreenHeaderBtn from "../home/headerInfo/ScreenHeaderBtn";
import Icons from "react-native-vector-icons/MaterialIcons";


const SECTIONS = [
    {
        header: 'Distance',
        items: [
            { id: 'radius', label: 'Orders in 1 Mile Radius', type: 'toggle'},
        ]
    },
    {
        header: 'Restaurants',
        items: [
            { id: 'canes', label: 'Raising Canes', type: 'toggle'},
            //pull this from firebase eventually
        ]
    },
    {
        header: 'Orders',
        items: [
            { id: 'joined', label: 'New Member to Public Group', type: 'toggle'},
            { id: 'friend', label: 'New Member to Private Group', type: 'toggle'},
        ]
    },
    {
        header: 'Acheivements',
        items: [
            { id: 'approach', label: 'Almost Unlocked Acheivement', type: 'toggle'},
        ]
    }
]

const NotifSettings = ({navigation}) => {
    const scrollViewRef = useRef(null);

    const handlePress = () => {
        //backend stuff 
    };

    const newRest = () =>{
        //backend stuff
    }

    const [form, setForm] = useState({
        language: 'English',
        darkMode: false,
    })
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE0" }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension="60%" backgroundColor='#fff' 
                handlePress={() => {
                navigation.navigate('Settings');
                
            }}/>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                </View>  */}
          {/* change SECTIONS map with firebase backend stuff */}
          {SECTIONS.map(({ header, items }) => (
            <View style={styles.section} key={header}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{header}</Text>
              </View>

              <View style={styles.sectionBody}>
                {items.map(({ label, id, type }, index) => (
                  <View
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                    key={id}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handlePress();
                      }}
                    >
                      <View style={styles.row}>
                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

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
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
                {header === "Restaurants" && (
                  <View style={[styles.rowWrapper]}>
                    {/* handleOnPress w backend*/}
                    <TouchableOpacity
                      onPress={() => {
                        newRest();
                      }}
                    >
                      <View style={styles.row}>
                        <Text style={styles.rowLabel}>
                          Add Another Restaurant
                        </Text>

                        <View style={styles.rowSpacer} />
                        <Icons name="add-box" size={25} color="#353535" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
    
}

export default NotifSettings;


