import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    alignContent: "center",
    fontWeight: "500",
    color: "#1d1d1d",
    marginBottom: 6,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  rowWrapper: {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#F4EEE0",
  },
  row: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flex: 1,
  },
  rowValue: {
    fontSize: 17,
    marginRight: 4,
    color: "#616161",
  },
  icons: {
    marginRight: 8,
  },
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

export default styles;