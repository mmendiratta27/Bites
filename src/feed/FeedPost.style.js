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
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
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
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
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
    color: COLORS.white,
  },
  joinButton: {
    backgroundColor: "#75AAF0", // light blue color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  
  joinButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  
});

export default styles;
