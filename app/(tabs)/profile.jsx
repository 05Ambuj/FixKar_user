import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalDropdown from "react-native-modal-dropdown";
import useLanguage from "../../hooks/useLanguage"; // Adjust the import path

const { width } = Dimensions.get("window");

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("Ambuj"); // Default name
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890"); // Default phone
  const { t } = useTranslation();
  const { setLanguage } = useLanguage(); // Use the language hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://fixkar.onrender.com/getProfile"
        );
        setUserName(response.data.name || "Ambuj"); // Fallback name if API fails
        setPhoneNumber(response.data.phone || "123-456-7890"); // Fallback phone
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserName("Ambuj");
        setPhoneNumber("123-456-7890"); // Default phone on error
      }
    };

    fetchProfile();
  }, []);

  // Language options
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "bp", label: "भोजपुरी" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ur", label: "اردو" },
    { code: "rj", label: "राजस्थानी" },
    { code: "mr", label: "मराठी" },
    { code: "as", label: "অসমীয়া" },
    { code: "od", label: "ଓଡିଆ" },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/icons/profile/user.png")}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPhone}>{phoneNumber}</Text>
        </View>
      </View>
      <ModalDropdown
        options={languageOptions.map((lang) => lang.label)}
        onSelect={(index) => handleLanguageChange(languageOptions[index].code)}
        dropdownStyle={[styles.dropdown, { width: 120 }]} // Adjust width as needed
        style={styles.dropdownButton}
        textStyle={styles.dropdownText}
      />
      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/MyProfile")}
          >
            <Image
              source={require("../../assets/icons/profile/group.png")}
              style={styles.icon}
            />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>My Profile</Text>
              <Text style={styles.menuDescription}>
                User details and information
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/WorkReport")}
          >
            <Image
              source={require("../../assets/icons/profile/workreport1.png")}
              style={styles.icon}
            />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Wallet</Text>
              <Text style={styles.menuDescription}>
                Your savings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/AboutUs")}
          >
            <Image
              source={require("../../assets/icons/profile/aboutus.png")}
              style={styles.icon}
            />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>About Us</Text>
              <Text style={styles.menuDescription}>
                Know who we are
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/ContactUs")}
          >
            <Image
              source={require("../../assets/icons/profile/contactus.png")}
              style={styles.icon}
            />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Contact Us</Text>
              <Text style={styles.menuDescription}>
                Let us get connected
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/(auth)/LogIn")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFA01E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  userInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B5C",
    fontFamily: "Poppins-Bold",
  },
  userPhone: {
    fontSize: 16,
    color: "#7A7A7A",
    fontFamily: "Poppins-Regular",
  },
  dropdownButton: {
    position: "absolute",
    right: 16,
    top: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: "#003B5C",
  },
dropdown: {
  borderRadius: 10,
  elevation: 4,
  padding: 10,  // Added padding for better spacing
  marginTop: 4,
},
  menuContainer: {
    flex: 1,
    justifyContent: "center",
  },
menuRow: {
  justifyContent: "center", // Keeps the items centered if needed
  marginBottom: 20,
},

menuItem: {
  flexDirection: "row",
  width: "100%",
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  alignItems: "center",
  paddingVertical: 20, // Increased padding for better touch area
  paddingHorizontal: 16,
  elevation: 6, // Slightly higher elevation for a more pronounced card effect
  borderColor: "#E0E0E0",
  borderWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 }, // Slightly deeper shadow for more realism
  shadowOpacity: 0.15,
  shadowRadius: 8,
  marginBottom: 16, // Increased space between cards
},
  icon: {
    width: 50, // Reduced icon size for better alignment
    height: 50,
    marginRight: 16, // Adds spacing between icon and text
  },
  menuTextContainer: {
    flex: 1, // Ensures text takes up the remaining space
  },
menuText: {
  fontSize: 18, // Increased font size for improved readability
  fontWeight: "600",
  color: "#003B5C",
  fontFamily: "Poppins-SemiBold",
},

menuDescription: {
  fontSize: 14, // Increased font size for better legibility
  color: "#7A7A7A",
  fontFamily: "Poppins-Regular",
  marginTop: 6,
},
  logoutButton: {
    width: "100%",
    backgroundColor: "#FFA01E",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
});

export default Profile;
