import { Component } from "react";
import PropTypes from "prop-types";
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

Logout.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
