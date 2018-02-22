import { Component } from "react";
import PropTypes from "prop-types";
import { signOut } from "../auth";
import { ResetToGuest } from "../router";

export default class Logout extends Component {
  componentDidMount = async () => {
    try {
      await signOut();
      this.props.navigation.dispatch(ResetToGuest);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return null;
  }
}

Logout.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
