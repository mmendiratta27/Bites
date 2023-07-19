import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth, db, firebase } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import darkMode from "./styles/darkMode";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [theme, setTheme] = useState("light");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registered
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        })
          .then(() => {
            alert("Registered, please login.");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    firebase.firestore()
       .collection('users')
       .add({
         name: name,
         email: email,
         avatar: avatar,
         createdAt: new Date().getTime(),
       });
   };

  return (
    <View style={theme == "light" ? styles.container : darkMode.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
      />
      <Input
        placeholder="Enter your image url"
        label="Profile Picture"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
        labelStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
        inputStyle={theme == "dark" ? styles.textColor : darkMode.textColor}
      />
      <Button
        title="Register"
        onPress={register}
        titleStyle={theme == "light" ? styles.textColor : darkMode.textColor}
        buttonStyle={theme == "light" ? styles.register : darkMode.register}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
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
  textColor: {
    color: "#F4EEE0",
  },
});

export default Register;
