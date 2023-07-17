import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, Text, Appearance, setVisible, setModalMessage } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth, db, firebase } from "../../firebase";
import { getAuth, setPersistence, onAuthStateChanged,signInWithEmailAndPassword, Persistence } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import darkMode from "./styles/darkMode";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [theme, setTheme] = useState("light");
  //currently hard coded to dark mode for testing

  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme())
  // })

const auth = getAuth();
onAuthStateChanged(auth, (user) => {

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    navigation.navigate('MainNavigator')

  }
  });


  const openRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.replace("MainNavigator");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <View
        style={theme == "light" ? styles.placeholder : darkMode.placeholder}
      />
      <View style={theme == "light" ? styles.container : darkMode.container}>
        <Input
          placeholder="Enter your email"
          label="Email"
          leftIcon={{
            type: "material",
            name: "email",
            color: theme === "light" ? "#353535" : "#F4EEE0",
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
          inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        />
        <Input
          placeholder="Enter your password"
          label="Password"
          leftIcon={{
            type: "material",
            name: "lock",
            color: theme === "light" ? "#353535" : "#F4EEE0",
          }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
          inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        />

        <Button
          title="Sign in"
          titleStyle={theme == "light" ? styles.textColor : darkMode.textColor}
          buttonStyle={theme == "light" ? styles.signin : darkMode.signin}
          onPress={signin}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={theme == "dark" ? styles.textColor : darkMode.textColor}>
            Don't have an account?
          </Text>
        </View>

        <Button
          title="Create Account"
          titleStyle={theme == "light" ? styles.textColor : darkMode.textColor}
          buttonStyle={theme == "light" ? styles.register : darkMode.register}
          onPress={openRegisterScreen}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignItems: 'center',
    padding: 10,
    backgroundColor: "#F4EEE0",
  },
  placeholder: {
//    alignItems: 'top',
    padding: 80,
    backgroundColor: "#F4EEE0",
  },
  signin: {
    width: 350,
    marginTop: 10,
    backgroundColor: "#353535",
  },
  register: {
    width: 350,
    marginTop: 10,
    backgroundColor: "#353535",
  },
  textColor: {
    color: "#F4EEE0",
  },
});

export default Login;

//const handleLogin = useCallback(
//    async () => {
//        try {
//            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//            await firebase
//                .auth()
//                .signInWithEmailAndPassword(email, password);
//            navigation.navigate("MainNavigator");
//        } catch (error) {
//            alert(error);
//        }
//    },
//    [navigation]
//);

//


//    const handleLogin = async () => {
//      await firebase
//        .auth()
//        .signInWithEmailAndPassword(email, password)
//        .catch((error) => {
//          const errorCode = error.code;
//          const errorMessage = error.message;
//          alert(errorMessage);
//        });
//
//  };