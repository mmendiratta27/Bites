import { StyleSheet } from "react-native";

const darkMode = StyleSheet.create({
  container: {
    backgroundColor: "#353535",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#353535",
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

export default darkMode;
