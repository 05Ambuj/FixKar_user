import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#A0A0A0"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search services..."
        placeholderTextColor="#A0A0A0"
        value={searchQuery}
        onChangeText={setSearchQuery}
        selectionColor="#4A90E2" // Color of the text selection
      />
      <MaterialCommunityIcons
        name="filter"
        size={22}
        color="#A0A0A0"
        style={styles.filterIcon}
      />
      <MaterialCommunityIcons
        name="microphone"
        size={22}
        color="#A0A0A0"
        style={styles.micIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7", // Light grey background for better contrast
    borderRadius: 25,
    elevation: 4, // Slightly increased shadow for depth
    paddingHorizontal: 15,
    paddingVertical: 5, // Added vertical padding
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 45, // Increased height for better touch target
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    color: "#4A4A4A",
    fontFamily: "Roboto",
    fontSize: 16, // Increased font size for better readability
  },
  searchIcon: {
    marginRight: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  micIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
