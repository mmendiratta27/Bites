
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import React from "react";
import { BottomPopup } from "./BottomPopup";

const popuplist = [
  {
    id: 1,
    name: "Tasks",
  },
  {
    id: 2,
    name: "Message",
  },
  {
    id: 3,
    name: "Note",
  },
];

const JobDetails = () => {
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={onShowPopup}>
          <Text style={styles.txtSize}>Show Bottom Popup</Text>
        </TouchableWithoutFeedback>
        <BottomPopup
          title="Demo Popup"
          ref={(target) => (popupRef = target)}
          onTouchOutside={onClosePopup}
          data={popuplist}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtSize: {
    fontSize: 20,
  },
});

export default JobDetails;