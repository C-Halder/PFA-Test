import { View, Text, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BaseUrl } from '../services/api/Api'

const { width } = Dimensions.get('window')
const height = width * 0.4
// const height = 440

const DetailsPageSlider = ({ data, height, dotHeight, radious }) => {
    const [active, setActive] = useState(0)

    const activeColor = ({ nativeEvent }) => {
        // const dot =Math.ceil( nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width )
        const dot = Math.ceil(Math.ceil(nativeEvent.contentOffset.x) / width)
        // console.log("dot value", dot);
        // console.log("native value", nativeEvent);

        if (dot !== active) setActive(dot);
    }

    // const handleScroll =(event)=>{
    //     console.log((event.nativeEvent.contentOffset.x / width) );
    //    }
    // console.log("data", data);

    // {"contentInset": {"bottom": 0, "left": 0, "right": 0, "top": 0}, "contentOffset": {"x": 1234.2857666015625, "y": 0}, "contentSize": {"height": 246.85714721679688, "width": 2468.571533203125}, "layoutMeasurement": {"height": 246.85714721679688, "width": 411.4285583496094}, "responderIgnoreScroll": true, "target": 49, "velocity": {"x": -0.2857142984867096, "y": 0}}

    return (
        <View style={{
            width,
            height,
            borderRadius: radious,
        }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEventThrottle={16}
                horizontal
                onScroll={activeColor}
                style={{
                    width,
                    height,
                    margin: 0
                }}
            >
                {/* // data list */}
                {data?.map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: BaseUrl+item }}
                        style={{
                            width,
                            height: height,
                            resizeMode: 'cover',
                            borderRadius: radious,
                        }}
                    />
                ))}
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: dotHeight,
                alignSelf: 'center'
            }}>
                {data?.map((image, index) => (
                    <Text key={index} style={index === active ? {
                        color: 'tomato',
                        margin: 3,
                        fontSize: (width / 30)
                    } : {
                        color: 'white',
                        margin: 3,
                        fontSize: (width / 30)
                    }}>⬤</Text>
                ))}
            </View>
        </View>
    )
}

export default DetailsPageSlider