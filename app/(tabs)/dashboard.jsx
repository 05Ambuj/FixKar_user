import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  PanResponder
} from "react-native";
import ServiceList from "../components/Dashboard/ServiceList";
import Categories from "../components/Dashboard/Categories";
import ImageSlider from "../components/Dashboard/ImageSlider";
import SearchBar from "../components/Dashboard/SearchBar"; // Import the new SearchBar component

const Dashboard = () => {
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hideSlider, setHideSlider] = useState(false);

  const sliderHeight = useRef(new Animated.Value(150)).current;
  const scrollViewRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
          scrollViewRef.current.scrollTo({ y: 300, animated: true });
        }
      },
    })
  ).current;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (yOffset > 100 && !hideSlider) {
      Animated.timing(sliderHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setHideSlider(true));
    } else if (yOffset <= 10 && hideSlider) {
      setHideSlider(false);
      Animated.timing(sliderHeight, {
        toValue: 150,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.sliderContainer, { height: sliderHeight }]}>
        <ImageSlider />
      </Animated.View>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Categories isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      <Text style={styles.sectionTitle}>Recommended Services</Text>
      <ServiceList searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#E8EAF6",
  },
  sliderContainer: {
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3949AB",
    marginVertical: 10,
  },
  serviceListContainer: {
    flex: 1,
  },
});

export default Dashboard;
