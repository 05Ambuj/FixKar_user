import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Collapsible from "react-native-collapsible";

const categories = [
  { id: 1, name: "Home Cleaning", icon: "broom" },
  { id: 2, name: "Plumbing", icon: "pipe-wrench" },
  { id: 3, name: "Electrical", icon: "flash" },
  { id: 4, name: "Gardener", icon: "flower" },
  { id: 5, name: "Pest Control", icon: "bug" },
  { id: 6, name: "Moving", icon: "truck" },
  { id: 7, name: "Car Repair", icon: "car-wrench" },
  { id: 8, name: "Painting", icon: "format-paint" },
  { id: 9, name: "Appliance Repair", icon: "tools" },
  { id: 10, name: "Pool Cleaning", icon: "pool" },
  { id: 11, name: "Laundry", icon: "tshirt-crew" },
  { id: 12, name: "Pet Grooming", icon: "dog" },
];

const Categories = ({ isCollapsed, toggleCollapse }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoryRow}>
        {categories.slice(0, 4).map((category) => (
          <TouchableOpacity key={category.id} style={styles.category}>
            <MaterialCommunityIcons
              name={category.icon}
              size={30} // Reduced icon size
              color="#00796B" // Dark teal for better visibility
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Collapsible collapsed={isCollapsed}>
        <View style={styles.categoryRow}>
          {categories.slice(4).map((category) => (
            <TouchableOpacity key={category.id} style={styles.category}>
              <MaterialCommunityIcons
                name={category.icon}
                size={30} // Reduced icon size
                color="#00796B" // Dark teal for better visibility
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Collapsible>

      <TouchableOpacity onPress={toggleCollapse} style={styles.arrowContainer}>
        <MaterialCommunityIcons
          name={isCollapsed ? "chevron-down" : "chevron-up"}
          size={24} // Reduced arrow icon size
          color="#FFFFFF" // Dark teal for better visibility
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 15,
    backgroundColor: "#E0F2F1", // Light teal background
    padding: 15, // Reduced padding
    borderRadius: 12,
    elevation: 5, // Shadow effect for depth
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  category: {
    alignItems: "center",
    width: "22%",
    marginBottom: 10, // Reduced margin
    backgroundColor: "#B2DFDB", // Lighter shade for category buttons
    borderRadius: 8,
    padding: 8, // Reduced padding
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    color: "#FFFFFF", // Dark teal for better visibility
    textAlign: "center",
    marginTop: 5,
    fontWeight: "500",
  },
  arrowContainer: {
    alignItems: "center",
    marginVertical: 8, // Reduced vertical margin
  },
  sectionTitle: {
    fontSize: 18, // Reduced title font size for compactness
    fontWeight: "700",
    color: "#00796B", // Darker teal title for contrast
    marginBottom: 10, // Reduced bottom margin
  },
});

export default Categories;
