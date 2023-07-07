import React from "react";
import { StyleSheet } from "react-native";

const darkMode = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontSize: 20,
    color: "#F4EEE0",
  },
  welcomeMessage: {
    fontSize: 24,
    color: "#F4EEE0",
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#fffceb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#414141",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#F3F4F8",
  },
  tabsContainer: {
    width: "100%",
    marginTop: 16,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  separator: {
    marginHorizontal: 10,
    color: "black",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  toggleButton: {
    backgroundColor: "#F4EEE0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  toggleText: {
    color: "#999",
  },
  selectedToggle: {
    color: "black",
  },
});

export default darkMode;
