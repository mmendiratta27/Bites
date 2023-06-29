import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { icons, SIZES } from "../../constants";
import styles from "../home/headerInfo/welcome/welcome.style";
import { KeyboardAvoidingView, Platform } from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { IconButton, Title } from 'react-native-paper';
import { auth, db, firebase } from '../../firebase';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';



const MapComponent = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollViewRef = useRef(null);


  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);

  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [nearestAddress, setNearestAddress] = useState("");
  const [region, setRegion] = useState(null);
  const [isAM, setIsAM] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");


  function handleButtonPress() {
    if (restaurant.length > 0) {
      ab()
        .collection('threads')
        .add({
          name: restaurant,
          latestMessage: {
            text: `You have joined ${restaurant}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('messages').add({
            text: `You have joined ${restaurant}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('homeScreen');
        });
    }
  }










  const handleToggle = () => {
    setIsAM(!isAM);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      setCurrentLocation({ latitude, longitude });

      reverseGeocode(latitude, longitude);
    } catch (error) {
      console.log("Error getting current location:", error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (address.length > 0) {
        const { streetNumber, street, city, country, region, postalCode } =
          address[0];
        const formattedAddress = `${streetNumber} ${street}, ${city}, ${region}, ${country} ${postalCode}`;
        setNearestAddress(formattedAddress);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    } catch (error) {
      console.log("Error retrieving address:", error);
    }
  };

  const handleSearchButtonClick = async () => {
    try {
      const result = await Location.geocodeAsync(searchValue);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        setCurrentLocation({ latitude, longitude });
        reverseGeocode(latitude, longitude);
      } else {
        console.log("No results found for the search query");
      }
    } catch (error) {
      console.log("Error searching location:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE0" }}>
        <SafeAreaView
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.leftArrow}
                dimension="60%"
                handlePress={() => navigation.navigate("homeScreen")}
              />
            ),
            headerTitle: "Add Post",
          }}
        />

        <ScrollView>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Text style={styles.userName}>Restaurant Name: </Text>
            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    labelName='Restaurant'
                    value={restaurant}
                    clearButtonMode='while-editing'
                    style={{ color: "black", height: 40, width: '100%' }}
                    onChangeText={(text) => setRestaurant(text)}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginBottom: SIZES.small }}>
              <Text style={styles.userName}>Time order will be placed: </Text>
            </View>

            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    style={{ color: "black", height: 40, width: '100%' }}
                    value={hour}
                    placeholder="Hour"
                    placeholderTextColor={"gray"}
                    onChangeText={(text) => setHour(text)}
                  />
                </View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.searchWrapper}>
                  <TextInput
                    style={{ color: "black", height: 40, width: '100%' }}
                    placeholder="Minute"
                    placeholderTextColor={"gray"}
                    value={minute}
                    onChangeText={(text) => setMinute(text)}
                  />

                </View>

                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    onPress={handleToggle}
                    style={styles.toggleButton}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        isAM ? styles.selectedToggle : {},
                      ]}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleToggle}
                    style={styles.toggleButton}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        !isAM ? styles.selectedToggle : {},
                      ]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.userName}>Group order link: </Text>
            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    style={{ color: "black", height: 40, width: '100%' }}
                    value={link}
                    onChangeText={(text) => setLink(text)}
                  />

                </View>
              </View>
            </View>

            <Text style={styles.userName}>Pickup Location: </Text>
            <Text style={{ paddingBottom: SIZES.medium }}>
              {nearestAddress}
            </Text>
            {region && (
              <View style={{ flex: 1 }}>
                <MapView
                  style={{ width: "100%", height: 200 }}
                  initialRegion={region}
                  region={region}
                  ref={mapRef}
                >
                  <Marker coordinate={region} />
                </MapView>
              </View>
            )}

            <View style={{ marginVertical: SIZES.small }}>
              <Text>
                If you would like to input a different pickup address, enter it
                below:{" "}
              </Text>
            </View>

            <View style={styles.searchContainer}>
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
                  style={{ color: "black", height: 40, width: '100%' }}
                  value={searchValue}
                  onChangeText={(text) => setSearchValue(text)}
                />
              </View>

              <TouchableOpacity
                style={styles.searchBtn}
                onPress={handleSearchButtonClick}
              >
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={styles.searchBtnImage}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: SIZES.small }}>
              <Text style={styles.userName}>Other comments: </Text>
            </View>

            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    style={{ color: "black", height: 40, width: '100%' }}
                    value={comments}
                    onChangeText={(text) => setComments(text)}
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
                disabled={restaurant.length === 0}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MapComponent;
