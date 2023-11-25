import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../services/slices/UserSlice';

const { width, height } = Dimensions.get("window");

const DetailsPage = ({ navigation, route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.parent}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: "relative" }}>
            {/* nav button */}
            <TouchableOpacity style={{ position: "absolute", top: 35, zIndex: 999, padding: 6 }} onPress={() => navigation.goBack()}>
              <Image style={{ width: 20, height: 20, tintColor: "#6588E6" }} source={require("../../assets/icons/left-arrow.png")} />
            </TouchableOpacity>

            {/* // image */}
            <View style={{ marginTop: 30 }}>
              <Image style={{ width: width, height: width / 1.2 }} source={{ uri: item?.thumbnail }} resizeMode='stretch' />
            </View>

            {/* // Body Description */}
            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "#fff", marginTop: "-8%", paddingHorizontal: 15 }}>

              <View style={{ marginTop: 45, }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "#6588E6" }}>{item?.title}</Text>
              </View>

              {/* // Description */}
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#817F7F", marginTop: 10 }}>{item?.description}</Text>

              {/* // Price */}
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#000" }}>Price : ₹{item?.price}</Text>



              {/* // rating */}
              <View style={{ marginVertical: 10 }}>
                <Text style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins-SemiBold",
                  backgroundColor: "#069A03",
                  paddingHorizontal: 5,
                  borderRadius: 3,
                  width: width / 6,
                  textAlign: "center",
                  paddingVertical: 5,
                }}>{item?.rating}★</Text>
              </View>

              {/* add to cart */}
              <View style={{ flex: 1, marginHorizontal: 15, marginTop: 100, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
                  <Text style={{
                    color: "#fff",
                    fontSize: 16,
                    fontFamily: "Poppins-SemiBold",
                    backgroundColor: "#069A03",
                    paddingHorizontal: 5,
                    borderRadius: 3,
                    textAlign: "center",
                    paddingVertical: 5,
                  }}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default DetailsPage

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
})