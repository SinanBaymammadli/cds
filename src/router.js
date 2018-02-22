import React from "react";
import {
  StackNavigator,
  DrawerNavigator,
  NavigationActions
} from "react-navigation";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Logout from "./screens/Logout";

import MenuIcon from "./components/MenuIcon";
import Drawer from "./components/Drawer";

export const Guest = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      header: null
    }
  }
});

const HomeStackNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Sifarişlər",
      headerRight: <MenuIcon navigation={navigation} />
    })
  }
});

export const User = DrawerNavigator(
  {
    Home: {
      screen: HomeStackNavigator
    },
    Logout: {
      screen: Logout
    }
  },
  {
    contentComponent: Drawer
  }
);

export const createRootNavigator = (signedIn = false) =>
  StackNavigator(
    {
      Guest: {
        screen: Guest
      },
      User: {
        screen: User
      }
    },
    {
      headerMode: "none",
      initialRouteName: signedIn ? "User" : "Guest"
    }
  );

export const ResetToGuest = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: "Guest" })]
});

export const ResetToUser = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: "User" })]
});
