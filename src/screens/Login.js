import React, { Component } from "react";
import PropTypes from "prop-types";
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
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import axios from "axios";

import { USER_KEY } from "../auth";
import { ResetToUser } from "../router";

import logo from "../assets/logo.png";

export default class Login extends Component {
  state = {
    driver_id: "",
    password: "",
    loaded: true,
    error: ""
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
          await AsyncStorage.setItem(USER_KEY, result.id.toString());
          await AsyncStorage.setItem("userName", result.name.toString());

          this.setState({
            error: "",
            loaded: true
          });

          Keyboard.dismiss();

          this.props.navigation.dispatch(ResetToUser);
        } catch (error) {
          ToastAndroid.show(error, ToastAndroid.SHORT);
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
              onSubmitEditing={() => this.PasswordInput.focus()}
            />
            <TextInput
              ref={PasswordInput => (this.PasswordInput = PasswordInput)}
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

Login.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

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
