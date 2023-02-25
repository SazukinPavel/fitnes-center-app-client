import { TextInput } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";
import LoginDto from "../types/dto/auth/LoginDto";

const Login = () => {
  const [loginDto, setLoginDto] = React.useState<LoginDto>({
    login: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <TextInput
        type="outlined"
        label="Login"
        value={loginDto.login}
        onChangeText={(login) => setLoginDto({ ...loginDto, login })}
      />
      <TextInput
        label="Password"
        value={loginDto.password}
        onChangeText={(password) => setLoginDto({ ...loginDto, password })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
  },
});

export default Login;
