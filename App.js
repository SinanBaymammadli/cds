import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
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

const UserRouter = StackNavigator(
  {
    Home: {
      screen: HomeRouter
    },
    Login: {
      screen: Login
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const GuestRouter = StackNavigator(
  {
    Home: {
      screen: HomeRouter
    },
    Login: {
      screen: Login
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Login"
  }
);

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default class App extends Component {
  state = {
    loaded: false,
    loggedIn: false
  };

  componentWillMount = async () => {
    const driverId = await AsyncStorage.getItem("driver_id");
    if (driverId !== null) {
      this.setState({ loaded: true, loggedIn: true });
    } else {
      this.setState({ loaded: true });
    }
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const Loading = () => <ActivityIndicator size="small" color="#0000ff" />;
    let RootRouter = () => <Loading />;

    if (this.state.loggedIn) {
      RootRouter = () => <UserRouter />;
    } else {
      RootRouter = () => <GuestRouter />;
    }

    return this.state.loaded ? (
      <RootRouter />
    ) : (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
