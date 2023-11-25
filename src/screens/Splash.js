import { StyleSheet, View, SafeAreaView, Text, StatusBar, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginByAsync } from '../services/slices/UserSlice';

const Splash = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
        const getLoginData = async () => {
            const user = await AsyncStorage.getItem("@user");

            const user_details = { data: JSON.parse(user) }
            // console.log("user =>", data.user_details, data.token);

            setTimeout(() => {
                if (user != null) {
                    // console.log("from if", user);
                    dispatch(loginByAsync(user_details));
                    navigation.replace("dashboard");
                } else {
                    // console.log("from else", user);
                    const withOutData = { data: null, token: null };
                    dispatch(loginByAsync(withOutData));
                    navigation.replace("login");
                }
            }, 2000);

            // return clearTimeout(startPage);
        }

        getLoginData();

    }, []);

    return (
        <SafeAreaView style={styles.parent}>
            <ImageBackground
                source={require("../assets/images/spash.jpg")}
                resizeMode='cover'
                style={styles.imageBackground}
            >
                <View style={styles.body}>
                    <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: "bold", color: "#32468E" }}>Ecom App</Text>
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}

export default Splash;

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    body: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
})