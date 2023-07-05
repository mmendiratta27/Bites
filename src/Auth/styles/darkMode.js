import React from "react";
import { StyleSheet } from "react-native";

const darkMode = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    // marginTop: 100,
    backgroundColor: "#000",
  },
  placeholder: {
    alignItems: "top",
    padding: 80,
    backgroundColor: "#000",
  },
  signin: {
    width: 350,
    marginTop: 10,
    backgroundColor: "#F4EEE0",
  },
  register: {
    width: 350,
    marginTop: 10,
    backgroundColor: "#F4EEE0",
  },
  textColor: {
    color: "#353535",
  },
});

export default darkMode;