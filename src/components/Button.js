import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Touchable from "react-native-platform-touchable";

import { primaryColor } from "../styles/colors";

const Button = ({ onPress, text, backgroundColor = undefined }) => {
  return (
    <Touchable
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 3,
        backgroundColor: backgroundColor || primaryColor
      }}
      background={Touchable.SelectableBackground()}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        {text.toUpperCase()}
      </Text>
    </Touchable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string
};

export default Button;
