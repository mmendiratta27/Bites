import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <View style={styles.placeholder}></View>
      <View style={styles.container}>
        <Input
          placeholder="Enter your email"
          label="Email"
          leftIcon={{ type: "material", name: "email" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Enter your password"
          label="Password"
          leftIcon={{ type: "material", name: "lock" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Sign in" buttonStyle={styles.signin} onPress={signin} />

        <Text style={{ marginTop: 20 }}>Don't have an account?</Text>
        <Button
          title="Create Account"
          buttonStyle={styles.register}
          onPress={openRegisterScreen}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    // marginTop: 100,
    backgroundColor: "#F4EEE0",
  },
  placeholder: {
    alignItems: "top",
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
});

export default Login;
