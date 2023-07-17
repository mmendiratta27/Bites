import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#353535",
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  jobName: {
    fontSize: 17,
    color: COLORS.white,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: "#b7b7b7",
    marginTop: 3,
    textTransform: "capitalize",
  },
  textWhite: {
    color: "#e0e0e0",
  },
  timeColor: {
    paddingVertical: 5,
    color: "#e0e0e0",
    fontSize: SIZES.medium,
  },
  joinButton: {
    backgroundColor: "#F4EEE0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },

  joinButtonText: {
    color: "#353535",
    textAlign: "center",
    alignItems: "center",
  },
  mapContainer: {
    height: 200, // Set an appropriate height for the map container
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
});

export default styles;
