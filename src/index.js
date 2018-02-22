import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import SplashScreen from "react-native-splash-screen";

import { BASE_URL, API_TOKEN } from "react-native-dotenv";

import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default class App extends Component {
  state = {
    signedIn: false,
    checkedSignIn: false
  };

  componentWillMount = async () => {
    try {
      const res = await isSignedIn();
      this.setState({
        signedIn: res,
        checkedSignIn: true
      });
      SplashScreen.hide();
    } catch (error) {
      alert("An error occurred");
    }
  };

  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }

    const RootNavigator = createRootNavigator(signedIn);
    return <RootNavigator />;
  }
}
