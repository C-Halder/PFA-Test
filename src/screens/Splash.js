import { StyleSheet, View, SafeAreaView, Text, StatusBar, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginByAsync } from '../services/slices/UserSlice';

const Splash = ({ navigation }) => {

    useEffect(() => {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');

        /* function for auto login of user */ 
        const getLoginData = async () => {
            const user = await AsyncStorage.getItem("@user");

            const user_details = JSON.parse(user)
            setTimeout(() => {
                if (user_details != null) {
                    navigation.replace("dashboard");
                } else {
                    // console.log("from else", user);
                    navigation.replace("login");
                }
            }, 2000);
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