import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const sliderImages = [
  "https://res.cloudinary.com/dmbgcgzm0/image/upload/v1727380093/Screenshot_2024-09-27_011635_c1ay7j.png",
  "https://res.cloudinary.com/dmbgcgzm0/image/upload/v1727380205/4163332_bhtghm.jpg",
  "https://res.cloudinary.com/dmbgcgzm0/image/upload/v1727380206/4342804_ixczzc.jpg",
  "https://res.cloudinary.com/dmbgcgzm0/image/upload/v1727380212/Cleaning_team_with_brooms_and_vacuum_cleaner_plqlz9.jpg"
];

const ImageSlider = () => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper autoplay height={150} showsPagination={false}>
        {sliderImages.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.sliderImage} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: width * 0.5,
    marginBottom: 5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default ImageSlider;