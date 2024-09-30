import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { getItem } from "../../../utils/AsyncStorage"; // Ensure the path is correct

const RequestServiceModal = ({ modalVisible, setModalVisible, service }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [name, setName] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleRequestService = async () => {
    const requestData = {
      serviceId: service._id,
      date: selectedDate,
      time: selectedTime.toISOString(),
      userName: name,
    };

    try {
      // Retrieve token from AsyncStorage
      const token = await getItem("token"); // Replace with your actual token key

      const response = await axios.post(
        "https://fixkar-end-user-1.onrender.com/users/request",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      );
      console.log("Service requested successfully:", response.data);
      setModalVisible(false);
    } catch (error) {
      console.error(
        "Error requesting service:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            {step === 1 && (
              <>
                <Text style={styles.modalTitle}>Select Date</Text>
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                  }}
                  markedDates={{ [selectedDate]: { selected: true } }}
                />
                <Button title="OK" onPress={() => setStep(2)} />
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.modalTitle}>Select Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Select Time"
                  value={selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  onFocus={() => setShowTimePicker(true)}
                  onBlur={() => setShowTimePicker(false)}
                />
                {showTimePicker && (
                  <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={(event, date) => {
                      if (date) {
                        setSelectedTime(date);
                      }
                      setShowTimePicker(false);
                    }}
                  />
                )}
                <Button title="OK" onPress={() => setStep(3)} />
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.modalTitle}>Enter Your Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  value={name}
                  onChangeText={setName}
                />
                <View style={styles.modalButtonContainer}>
                  <Button title="Send Request" onPress={handleRequestService} />
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default RequestServiceModal;
