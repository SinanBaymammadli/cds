import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Button,
  Text,
  View,
  AsyncStorage,
  Keyboard,
  BackHandler,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import logo from "./assets/logo.png";

export default class Login extends Component {
  state = {
    driver_id: "",
    password: "",
    loaded: true,
    error: ""
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  };

  login = async () => {
    this.setState({
      loaded: false,
      error: ""
    });

    const { driver_id, password } = this.state;

    const data = {
      driver_id: parseInt(driver_id),
      password
    };

    try {
      const response = await axios.post("/api/drivers/auth", data);
      const result = response.data.data;

      if (result) {
        try {
          await AsyncStorage.setItem("driver_id", result.id.toString());

          this.setState({
            error: "",
            loaded: true
          });

          Keyboard.dismiss();

          this.props.navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.setState({
          error: response.data[0],
          loaded: true
        });
      }
    } catch (error) {
      this.setState({
        error: "Network error happened.",
        loaded: true
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <View style={styles.imageWrapper}>
              <Image source={logo} style={styles.image} />
            </View>
            {!this.state.loaded && (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
            <Text style={styles.errorText}>{this.state.error}</Text>
            <TextInput
              style={styles.input}
              placeholder="Driver id"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={driver_id => this.setState({ driver_id })}
              value={this.state.driver_id}
              blurOnSubmit={false}
              onSubmitEditing={() => this.refs.PasswordInput.focus()}
            />
            <TextInput
              ref="PasswordInput"
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              onSubmitEditing={this.login}
            />
            <Button onPress={this.login} title="Login" />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  form: {
    marginHorizontal: 15
  },
  input: {
    marginBottom: 15,
    fontSize: 18
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 30
  },
  image: {
    width: 100,
    height: 115
  },
  errorText: {
    textAlign: "center",
    color: "red"
  }
});
