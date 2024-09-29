// ServiceDetailsModal.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";

const { height } = Dimensions.get("window");

const ServiceDetailsModal = ({ modalVisible, setModalVisible, selectedService, handleRequestService }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedService?.name}</Text>
          <Image
            source={{
              uri: selectedService?.image && selectedService.image.startsWith('data:image/')
                ? selectedService.image
                : `data:image/jpeg;base64,${selectedService?.image}`,
            }}
            style={styles.modalImage}
            resizeMode="cover" // Added to ensure the image fits well
          />
          <Text style={styles.modalDescription}>{selectedService?.description}</Text>
          <Text style={styles.modalPrice}>Price: ₹{selectedService?.price}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleRequestService(selectedService)} style={styles.button}>
              <Text style={styles.buttonText}>Request Service</Text>
            </TouchableOpacity>
            <Link href={`/profile/${selectedService?._id}`} style={styles.button}>
              <Text style={styles.buttonText}>View Profile</Text>
            </Link>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: height * 0.66, // 2/3 of the screen height
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Add shadow for Android
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1A73E8",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust width to be 48% of the container
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#E63946",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ServiceDetailsModal;
