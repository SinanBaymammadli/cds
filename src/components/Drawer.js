import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage, StyleSheet } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";

class Drawer extends Component {
  state = {
    userName: "User Name"
  };

  componentDidMount = async () => {
    const userName = await AsyncStorage.getItem("userName");
    this.setState({
      userName
    });
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <Text style={styles.userName}>{this.state.userName}</Text>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  userName: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#000"
  }
});

export default Drawer;
