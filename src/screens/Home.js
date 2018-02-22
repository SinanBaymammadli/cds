import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  ToastAndroid,
  Animated
} from "react-native";
import PushNotification from "react-native-push-notification";
import CheckBox from "react-native-check-box";
import axios from "axios";
// import Pusher from "pusher-js/react-native";

import Button from "../components/Button";
import { primaryColor, secondaryColor } from "../styles/colors";

import Notification from "../Notification";

const ANIMATION_DURATION = 1000;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this._animated = new Animated.Value(0);
  }

  state = {
    fast: true,
    urgently: true,
    data: [],
    refreshing: false
  };

  componentDidMount = async () => {
    this.getOrders();
  };

  notify = () => {
    PushNotification.localNotificationSchedule({
      message: "My Notification Message",
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
        try {
          const res = await axios.get(`/api/drivers/${driverId}/orders`);
          if (res.data) {
            this.setState(
              {
                data: res.data.data,
                refreshing: false
              },
              () => {
                Animated.timing(this._animated, {
                  toValue: 1,
                  duration: ANIMATION_DURATION
                }).start();
              }
            );
          } else {
            this.setState({
              refreshing: false
            });
            ToastAndroid.show("Server is not responding.", ToastAndroid.SHORT);
          }
        } catch (error) {
          this.setState({
            refreshing: false
          });
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      this.setState({
        refreshing: false
      });
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  orderCompleted = async order_id => {
    try {
      const response = await axios.post("/api/orders/complete", { order_id });
      const isCompleted = response.data[0] === "true" ? true : false;

      if (isCompleted) {
        Animated.timing(this._animated, {
          toValue: 0,
          duration: ANIMATION_DURATION
        }).start();
        this.getOrders();
        ToastAndroid.show("Sifariş bitirildi.", ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  _keyExtractor = item => item.id.toString();

  render() {
    const list = this.state.data.filter(data => {
      if (data.delivery_type) {
        return this.state.fast;
      } else {
        return this.state.urgently;
      }
    });

    const animation = [styles.row, { opacity: this._animated }];

    return (
      <View style={styles.container}>
        <Notification />

        {/* <Button
          onPress={this.notify}
          title="Notify"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}

        <View style={styles.options}>
          <CheckBox
            style={styles.checkbox}
            onClick={() =>
              this.setState(prevState => ({
                fast: !prevState.fast
              }))
            }
            checkBoxColor={secondaryColor}
            isChecked={this.state.fast}
            leftText={"Təcili"}
          />

          <CheckBox
            style={styles.checkbox}
            onClick={() =>
              this.setState(prevState => ({
                urgently: !prevState.urgently
              }))
            }
            checkBoxColor={primaryColor}
            isChecked={this.state.urgently}
            leftText={"Sürətli"}
          />
        </View>

        <FlatList
          ListEmptyComponent={
            <Text style={styles.noOrderText}>Sifariş yoxdur.</Text>
          }
          data={list}
          keyExtractor={this._keyExtractor}
          onRefresh={this.getOrders}
          refreshing={this.state.refreshing}
          renderItem={({ item }) => (
            <Animated.View style={animation}>
              <View style={styles.card}>
                <Text>Adres: {item.address}</Text>
                <Text>Ödəniş: {item.fee}</Text>
                <Text>Status: {item.delivery_type ? "Təcili" : "Sürətli"}</Text>
                <Text>Məhsul: {item.product}</Text>
                <View style={styles.completeOrderBtn}>
                  <Button
                    onPress={() => this.orderCompleted(item.id)}
                    text="Sifarişi bitir"
                    backgroundColor={
                      item.delivery_type ? secondaryColor : primaryColor
                    }
                  />
                </View>
              </View>
            </Animated.View>
          )}
        />
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

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
  options: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  checkbox: {
    flex: 1,
    marginHorizontal: 15
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  noOrderText: {
    textAlign: "center",
    paddingVertical: 15
  },
  card: {
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3
  },
  completeOrderBtn: {
    marginTop: 10
  }
});
