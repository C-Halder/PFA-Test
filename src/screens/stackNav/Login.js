import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, loginByAsync, userLogin } from '../../services/slices/UserSlice';
import CustomLoader from '../../utils/CustomLoader';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const { status } = useSelector(state => state.userSlice);

  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState({});

  const validateForm = () => {
    const error = {};
    const { username, password } = formValue;

    if (!username) {
      error.username = "*Username is Required!";
    }
    if (!password) {
      error.password = "*Password is Required!";
    }

    return error;
  }


  const handleLogin = () => {
    const validationErrors = validateForm();
    setFormError(validationErrors);
    AsyncStorage.setItem("@user", JSON.stringify({username: "user123", password: "1234567"}));
    if (Object.keys(validationErrors).length === 0) {
      if (formValue.username === "user123" && formValue.password === "1234567") {
        Toast.show({
          type: "success",
          text1: "Login Successfull",
          text2: "Welcome user123",
        });
        navigation.replace("dashboard");
        setFormValue({ email: "", password: "" });
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed!",
          text2: "Invalid username or password!",
        });
      }
    }
  }

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <Image resizeMode='stretch' style={{ width: width }} source={require("../../assets/images/top.png")} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: "#000", fontSize: 24, marginBottom: 10 }}>Login</Text>
              <Text style={{ color: "#877A7A", fontSize: 16 }}>Please log in to continue</Text>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 50, }}>
              <View style={styles.inputGrp}>
                <TextInput
                  style={styles.inputBox}
                  autoCapitalize='none'
                  placeholderTextColor={"#736C6C"}
                  placeholder={'Username'}
                  value={formValue.username}
                  onChangeText={value => setFormValue({ ...formValue, username: value })}
                />

              </View>
              {formError.username ?
                <Text style={styles.error}>{formError.username}</Text>
                : null
              }

              <View style={[styles.inputGrp, { position: "relative", marginTop: 30, }]}>
                <TextInput
                  style={styles.inputBox}
                  secureTextEntry={!show ? true : false}
                  autoCapitalize='none'
                  placeholderTextColor={"#736C6C"}
                  placeholder={'Password'}
                  value={formValue.password}
                  onChangeText={value => setFormValue({ ...formValue, password: value })}
                />

                <TouchableOpacity style={styles.eye} onPress={() => setShow(!show)}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={!show ? require("../../assets/icons/eye-off-line.png") : require("../../assets/icons/eye-line.png")}
                  />
                </TouchableOpacity>
              </View>
              {formError.password ?
                <Text style={styles.error}>{formError.password}</Text>
                : null
              }
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 20, marginTop: 50 }}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ color: "#fff", fontSize: 16 }}>Login</Text>
                <Image style={{ width: 15, height: 15, marginLeft: 5, marginTop: 4 }} source={require("../../assets/icons/arrow-right-line.png")} />
              </TouchableOpacity>
            </View>
          </>

          <CustomLoader loader={status} />
        </ScrollView>

        <Image resizeMode='stretch' style={{ width: width / 2.5, position: 'absolute', bottom: 0, zIndex: -1 }} source={require("../../assets/images/bottom.png")} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Login;

const styles = StyleSheet.create({
  parent: {
    position: "relative",
    flex: 1
  },
  inputGrp: {
    borderWidth: 1,
    borderColor: '#C7C7C7',
    backgroundColor: '#EEEDED',
    borderRadius: 7,
    elevation: 4
  },
  inputBox: {
    fontSize: 16,
    color: "#736C6C",
    paddingLeft: 10
  },
  eye: {
    position: "absolute",
    padding: 16,
    right: 0
  },
  button: {
    backgroundColor: "#32468E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: 150,
    borderRadius: 7,
  },
  error: {
    color: "#FA184E",
    fontSize: 11,
    marginTop: 5,
  },
})