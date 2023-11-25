import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../../utils/CustomLoader';
import { addToCart, getProducts, logOut } from '../../services/slices/UserSlice';

const { width, height } = Dimensions.get("window");

const Dashboard = ({ navigation }) => {
  const { status, products, cart } = useSelector(state => state.userSlice);
  const [refreshing, setRefreshing] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const dispatch = useDispatch();

  /** refresh function */
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      dispatch(getProducts());
    }, 2000);
  };

  /** indices function */
  const getIndicesData = (data) => {
    const list = [...data];
    return [true, ...list];
  }

  ///** side effects */
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');

    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);


  return (
    <SafeAreaView style={styles.parent}>
      <View style={{ flex: 1 }}>

        {/* nav bar */}
        <View style={styles.headWrap}>
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "#FA184E" }}>Ecom</Text>

          <View style={{ flexDirection: "row" }}>
            {/* cart */}
            <TouchableOpacity style={styles.bell}>
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/cart.png")} />
              <Text style={styles.notiText}>{cart?.length}</Text>
            </TouchableOpacity>

            {/* reload */}
            <TouchableOpacity style={styles.bell} onPress={() => dispatch(getProducts())}>
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/reload.png")} />
            </TouchableOpacity>

            {/* logout */}
            <TouchableOpacity style={styles.bell} onPress={() => dispatch(logOut(navigation))}>
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/logout-box-r-line.png")} />
            </TouchableOpacity>
          </View>
        </View>

        {/* flatlist for rendering products */}
        {allProducts?.length ?
          <View style={{ marginTop: 10, flex: 1 }}>
            <FlatList
              data={getIndicesData(allProducts)}
              style={{ width: width }}
              stickyHeaderIndices={[0]}
              refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={["#00f", "#0f0", "#f00"]} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <>
                  {
                    typeof item === "boolean" && (
                      /** pull down */
                      <View style={{ alignItems: "center", backgroundColor: "#e8e6e6", paddingVertical: 2, elevation: 4, marginHorizontal: 10 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                          <Image style={{ width: 13, height: 13, marginRight: 5 }} source={require("../../assets//icons/arrow-down-fill.png")} />
                          <Text style={{ color: "#6588E6", fontSize: 11, fontFamily: "Mulish-Bold" }}>Pull down to refresh</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }

                  {
                    typeof item !== "boolean" && (
                      /** product card */
                      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("detailspage", { item: item })}>
                        <View style={{ flexDirection: "row", }}>
                          <View style={styles.leftBox}></View>

                          <View style={{ marginLeft: 20 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 4 }}>
                              {/* title */}
                              <Text
                                style={styles.title}
                              >
                                {item?.title}
                              </Text>
                            </View>

                            {/* price */}
                            <Text
                              style={{ color: "#6588E6", fontFamily: "Poppins-Medium", fontSize: 18, width: 180, marginBottom: 4 }}
                            >
                              ₹{item?.price}
                            </Text>

                            {/* add to cart */}
                            <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
                              <Text style={styles.addtocart} > Add to Cart</Text>
                            </TouchableOpacity>
                          </View>

                        </View>

                        {/* product image */}
                        <TouchableOpacity
                          style={{
                            padding: 2,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                          }}
                        >
                          <Image style={{ width: 80, height: 80, borderRadius: 10, }} source={{ uri: item?.thumbnail }} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )
                  }
                </>
              )}
            />
          </View>
          :
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Image style={{}} source={require("../../assets/images/empty-icon-17.png")} />
            <Text style={{ color: "#0F3B8C", fontSize: 20, fontWeight: "bold", marginTop: -60, fontFamily: "Mulish-Bold" }}>
              No Products Found!
            </Text>
          </View>
        }
      </View>
      <CustomLoader loader={status} />
    </SafeAreaView>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headWrap: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#b4c5fe",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bell: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    position: "relative",
  },
  notiText: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "#494949",
    width: 20,
    height: 20,
    borderRadius: 20,
    textAlign: "center",
    top: -6,
    right: -4,
    fontSize: 13,
    borderColor: "#fff",
    borderWidth: 2
  },
  section: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  leftBox: {
    backgroundColor: "#1C44B0",
    width: 10,
    height: "auto",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
  },
  card: {
    paddingVertical: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#C0C9D3",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  title: {
    color: "#817F7F",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    borderRadius: 3,
    width: 180,
  },
  addtocart: {
    color: "#078CEE",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "#AEDBFC",
    paddingHorizontal: 5,
    borderRadius: 3,
    width: 100,
    textAlign: "center",
    paddingVertical: 6
  },
});