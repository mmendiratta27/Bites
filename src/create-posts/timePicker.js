import React from "react";
import { Text } from "react-native";
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const borderWidth = 25;
const setTimerWidthHeight = wp(75);
const selectedItemTextSize = 25;
const wrapperHeight = setTimerWidthHeight - borderWidth * 2;

const addZeroToDigits = (digit) => {
  if (digit) {
    let zeroAdded = `0${digit}`;
    return zeroAdded.substring(zeroAdded.length - 2);
  } else {
    return `00`;
  }
};

const dataSet = {
  data: {
    firstColumn: [...Array(13).keys()].map((item, idx) => {
      return { value: addZeroToDigits(item), index: idx };
    }),
    secondColumn: [...Array(60).keys()].map((item, idx) => {
      return { value: addZeroToDigits(item), index: idx };
    }),
    thirdColumn: [
      { value: "AM", index: 0 },
      { value: "PM", index: 1 },
    ],
  },
  initials: [8, 25, 0],
};

const ExampleComponent3 = () => {
  const seperatorComponentRendererOne = () => {
    return (
      <Text
        style={{
          fontSize: selectedItemTextSize,
          lineHeight: setTimerWidthHeight * 0.15,
        }}
      >
        :
      </Text>
    );
  };
  const seperatorComponentRendererTwo = () => {
    return (
      <Text
        style={{
          fontSize: selectedItemTextSize,
          lineHeight: setTimerWidthHeight * 0.15,
        }}
      ></Text>
    );
  };

  return (
    <RNDateTimeSelector
      dataSet={dataSet}
      onValueChange={(value) => {
        console.log("data on users end :   ... ", value);
      }}
      containerStyle={{
        alignSelf: "center",
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: 0,
        height: wp(61.5),
      }}
      firstSeperatorComponent={seperatorComponentRendererOne}
      secondSeperatorComponent={seperatorComponentRendererTwo}
      seperatorContainerStyle={
        {
          // width: wp(4)
        }
      }
      scrollPickerOptions={{
        itemHeight: 40,
        wrapperHeight: wrapperHeight,
        wrapperColor: "rgba(0,0,0,0)",
        highlightColor: "rgba(0,0,0,0.9)",
      }}
      textStyle={{
        fontSize: selectedItemTextSize,
        fontFamily: null,
      }}
      textColor={{
        primary: "rgba(0,0,0,1.0)",
        secondary: "rgba(0,0,0,0.5)",
        other: "rgba(0,0,0,0.15)",
      }}
    />
  );
};

export default ExampleComponent3;
