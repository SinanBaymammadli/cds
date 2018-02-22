import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";
import Icon from "react-native-vector-icons/MaterialIcons";

import { primaryColor } from "../styles/colors";

const MenuIcon = ({ navigation }) => (
  <Touchable
    onPress={() => navigation.navigate("DrawerOpen")}
    style={styles.MenuIcon}
    background={Touchable.Ripple(primaryColor, true)}
  >
    <Icon name="menu" size={30} />
  </Touchable>
);

MenuIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  MenuIcon: {
    paddingVertical: 10,
    paddingHorizontal: 16
  }
});

export default MenuIcon;
