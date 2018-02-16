import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import axios from "axios";
import SplashScreen from "react-native-splash-screen";
import { BASE_URL, API_TOKEN } from "react-native-dotenv";

import Home from "./src/Home";
import Login from "./src/Login";
import Logout from "./src/Logout";

const HomeRouter = DrawerNavigator({
  Home: {
    screen: Home
  },
  Logout: {
    screen: Logout
  }
});

const RootRouter = StackNavigator(
  {
    Home: {
      screen: HomeRouter
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <RootRouter />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
