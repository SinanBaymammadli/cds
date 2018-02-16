import React, { Component } from "react";
import { AsyncStorage } from "react-native";

export default class Logout extends Component {
  componentDidMount = () => {
    AsyncStorage.removeItem("driver_id", () => {
      this.props.navigation.navigate("Login");
    });
  };

  render() {
    return null;
  }
}
