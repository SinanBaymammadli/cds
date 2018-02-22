import { AsyncStorage } from "react-native";

export const USER_KEY = "driver_id";

/* export const signInStart = async data => {
  return axios.post("/api/drivers/auth", data);
  // try {
  //   const response = await axios.post("/api/drivers/auth", data);
  //   const result = response.data.data;

  //   if (result) {
  //     try {
  //       await AsyncStorage.setItem(USER_KEY, result.id.toString());
  //     } catch (error) {
  //       return error;
  //     }
  //   } else {
  //     return response.data[0];
  //   }
  // } catch {
  //   return "Network error happened.";
  // }
};

export const signInEnd = async token =>
  AsyncStorage.setItem(USER_KEY, token.toString()); */

export const signOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async () => {
  try {
    const res = await AsyncStorage.getItem(USER_KEY);
    if (res !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
