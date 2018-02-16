import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PushNotification from "react-native-push-notification";
import CheckBox from "react-native-check-box";

import Notification from "./Notification";

export default class Home extends Component {
  state = {
    fast: true,
    urgently: true,
    data: [
      {
        id: "0",
        delivery_type: "0",
        address: "baku"
      }
    ],
    refreshing: false
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    // this.getOrders();
  };

  notify = () => {
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 3 * 1000)
    });
  };

  getOrders = async () => {
    this.setState({
      refreshing: true
    });

    try {
      const driverId = await AsyncStorage.getItem("driver_id");
      if (driverId !== null) {
        axios.get(`/drivers/${driverId}/orders`).then(res => {
          this.setState({
            data: res.data.data,
            refreshing: false
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const list = this.state.data.filter(data => {
      if (data.delivery_type) {
        return this.state.fast;
      } else {
        return this.state.urgently;
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
            style={styles.menuBtn}
            underlayColor="#ddd"
          >
            <Icon name="menu" size={30} />
          </TouchableHighlight>
          <Text style={styles.welcome}>Home</Text>
        </View>

        <Button
          onPress={this.notify}
          title="Notify"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <View style={styles.options}>
          <CheckBox
            style={styles.checkbox}
            onClick={() => null}
            isChecked={this.state.fast}
            leftText={"Left"}
          />

          <CheckBox
            style={styles.checkbox}
            onClick={() => null}
            isChecked={this.state.urgently}
            leftText={"Left"}
          />
        </View>

        <FlatList
          ListEmptyComponent={
            <Text style={styles.welcome}>Sifariş yoxdur.</Text>
          }
          data={list}
          keyExtractor={this._keyExtractor}
          onRefresh={this.getOrders}
          refreshing={this.state.refreshing}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.welcome}>{item.address}</Text>
              {/* <Button
                primary
                onPress={() => {
                  this.orderCompleted(item.id);
                  Toast.show({
                    text: "Sifariş silindi.",
                    position: "bottom",
                    buttonText: "Okay"
                  });
                }}
              >
                <Text>Sifarişi bitir</Text>
              </Button> */}
              {/* <Card>
                <CardItem>
                  <Body>
                    <Text>Adres: {item.address}</Text>
                    <Text>Ödəniş: {item.fee}</Text>
                    <Text>
                      Status: {item.delivery_type ? "Təcili" : "Sürətli"}
                    </Text>
                    <Text>Məhsul: {item.product}</Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                  <Button
                    primary
                    onPress={() => {
                      this.orderCompleted(item.id);
                      Toast.show({
                        text: "Sifariş silindi.",
                        position: "bottom",
                        buttonText: "Okay"
                      });
                    }}
                  >
                    <Text>Sifarişi bitir</Text>
                  </Button>
                </CardItem>
              </Card> */}
            </View>
          )}
        />
        <Notification />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  menuBtn: {
    position: "absolute",
    left: 0,
    padding: 16
  },
  options: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 10
  },
  checkbox: {
    flex: 1,
    marginHorizontal: 15
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  card: {
    margin: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  }
});
