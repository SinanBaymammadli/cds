import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MenuIcon = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("DrawerOpen")}
    style={s.MenuIcon}
    underlayColor="#ddd"
  >
    <Icon name="menu" size={30} />
  </TouchableHighlight>
);

MenuIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const s = StyleSheet.create({
  MenuIcon: {
    paddingVertical: 10,
    paddingHorizontal: 16
  }
});

export default MenuIcon;
