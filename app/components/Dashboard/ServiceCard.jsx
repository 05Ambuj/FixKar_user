// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Button,
//   TextInput,
// } from "react-native";
// import Collapsible from "react-native-collapsible";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Calendar } from "react-native-calendars";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ServiceDetailsModal from "./ServiceDetailsModal";
// import axios from "axios";

// const ServiceCard = ({ service, expandedServiceId, toggleExpandService }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false); // Add this line

//   const [step, setStep] = useState(1);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [name, setName] = useState("");
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const handleRequestService = async () => {
//     const requestData = {
//       serviceId: service._id,
//       date: selectedDate,
//       time: selectedTime.toISOString(), // Convert time to ISO string
//       userName: name,
//     };

//     try {
//       const response = await axios.post(
//         "https://fixkar-end-user-1.onrender.com/users/request",
//         requestData
//       );
//       console.log("Service requested successfully:", response.data);
//       setModalVisible(false);
//       // You can add any success message or action here
//     } catch (error) {
//       console.error(
//         "Error requesting service:",
//         error.response ? error.response.data : error.message
//       );
//       // Handle the error, display a message to the user if needed
//     }
//   };

//   const openModal = () => {
//     setModalVisible(true);
//     setStep(1);
//   };

//   const handleViewDetails = () => {
//     setDetailsModalVisible(true);
//   };

//   return (
//     <View style={styles.recommendedCard}>
//       <TouchableOpacity onPress={() => toggleExpandService(service._id)}>
//         <View style={styles.recommendedCardContent}>
//           <Image
//             source={{
//               uri: service.image
//                 ? service.image.startsWith("data:image/")
//                   ? service.image
//                   : `data:image/jpeg;base64,${service.image}`
//                 : "https://via.placeholder.com/150",
//             }}
//             style={styles.serviceImage}
//           />
//           <Text style={styles.recommendedText}>{service.name}</Text>
//           <MaterialCommunityIcons
//             name={
//               expandedServiceId === service._id ? "chevron-up" : "chevron-down"
//             }
//             size={24}
//             color="#A0A0A0"
//             style={styles.collapseIcon}
//           />
//         </View>
//         <Collapsible collapsed={expandedServiceId !== service._id}>
//           <Text style={styles.recommendedDescription}>
//             {service.description}
//           </Text>
//           <Text style={styles.recommendedPrice}>Price: ₹{service.price}</Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity onPress={handleViewDetails} style={styles.button}>
//               <Text style={styles.buttonText}>View Details</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={openModal} style={styles.button}>
//               <Text style={styles.buttonText}>Request Service</Text>
//             </TouchableOpacity>
//           </View>
//         </Collapsible>
//       </TouchableOpacity>

//       {/* Modal for requesting service */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {step === 1 && (
//               <>
//                 <Text style={styles.modalTitle}>Select Date</Text>
//                 <Calendar
//                   onDayPress={(day) => {
//                     setSelectedDate(day.dateString);
//                   }}
//                   markedDates={{ [selectedDate]: { selected: true } }}
//                 />
//                 <Button title="OK" onPress={() => setStep(2)} />
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <Text style={styles.modalTitle}>Select Time</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Select Time"
//                   value={selectedTime.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                   onFocus={() => setShowTimePicker(true)}
//                   onBlur={() => setShowTimePicker(false)}
//                 />
//                 {showTimePicker && (
//                   <DateTimePicker
//                     value={selectedTime}
//                     mode="time"
//                     is24Hour={false}
//                     display="default"
//                     onChange={(event, date) => {
//                       if (date) {
//                         setSelectedTime(date);
//                       }
//                       setShowTimePicker(false);
//                     }}
//                   />
//                 )}
//                 <Button title="OK" onPress={() => setStep(3)} />
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <Text style={styles.modalTitle}>Enter Your Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Your Name"
//                   value={name}
//                   onChangeText={setName}
//                 />
//                 <View style={styles.modalButtonContainer}>
//                   <Button title="Send Request" onPress={handleRequestService} />
//                   <Button
//                     title="Cancel"
//                     onPress={() => setModalVisible(false)}
//                   />
//                 </View>
//               </>
//             )}
//           </View>
//         </SafeAreaView>
//       </Modal>

//       {/* Modal for service details */}
//       <ServiceDetailsModal
//         modalVisible={detailsModalVisible}
//         setModalVisible={setDetailsModalVisible}
//         selectedService={service}
//         handleRequestService={handleRequestService} // Pass the request function
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   recommendedCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 1,
//     padding: 15,
//     marginBottom: 0,
//     borderColor: "#E0E0E0",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     width: "100%",
//   },
//   recommendedCardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   serviceImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   recommendedText: {
//     fontSize: 14,
//     marginLeft: 10,
//     color: "#4A4A4A",
//     flex: 1,
//   },
//   collapseIcon: {
//     marginLeft: 10,
//   },
//   recommendedDescription: {
//     fontSize: 12,
//     color: "#7A7A7A",
//     marginTop: 5,
//   },
//   recommendedPrice: {
//     fontSize: 12,
//     fontWeight: "bold",
//     marginTop: 5,
//     color: "#1A73E8",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#1A73E8",
//     padding: 10,
//     borderRadius: 5,
//     width: "48%",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginVertical: 10,
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });

// export default ServiceCard;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Button,
//   TextInput,
// } from "react-native";
// import Collapsible from "react-native-collapsible";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Calendar } from "react-native-calendars";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ServiceDetailsModal from "./ServiceDetailsModal";
// import axios from "axios";
// import {getItem} from "../../../utils/AsyncStorage"

// const ServiceCard = ({ service, expandedServiceId, toggleExpandService }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false); // Add this line

//   const [step, setStep] = useState(1);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [name, setName] = useState("");
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const handleRequestService = async () => {
//     const requestData = {
//       serviceId: service._id,
//       date: selectedDate,
//       time: selectedTime.toISOString(), // Convert time to ISO string
//       userName: name,
//     };

//     try {
//       const response = await axios.post(
//         "https://fixkar-end-user-1.onrender.com/users/request",
//         requestData
//       );
//       console.log("Service requested successfully:", response.data);
//       setModalVisible(false);
//       // You can add any success message or action here
//     } catch (error) {
//       console.error(
//         "Error requesting service:",
//         error.response ? error.response.data : error.message
//       );
//       // Handle the error, display a message to the user if needed
//     }
//   };

//   const openModal = () => {
//     setModalVisible(true);
//     setStep(1);
//   };

//   const handleViewDetails = () => {
//     setDetailsModalVisible(true);
//   };

//   return (
//     <View style={styles.recommendedCard}>
//       <TouchableOpacity onPress={() => toggleExpandService(service._id)}>
//         <View style={styles.recommendedCardContent}>
//           <Image
//             source={{
//               uri: service.image
//                 ? service.image.startsWith("data:image/")
//                   ? service.image
//                   : `data:image/jpeg;base64,${service.image}`
//                 : "https://via.placeholder.com/150",
//             }}
//             style={styles.serviceImage}
//           />
//           <Text style={styles.recommendedText}>{service.name}</Text>
//           <MaterialCommunityIcons
//             name={
//               expandedServiceId === service._id ? "chevron-up" : "chevron-down"
//             }
//             size={24}
//             color="#A0A0A0"
//             style={styles.collapseIcon}
//           />
//         </View>
//         <Collapsible collapsed={expandedServiceId !== service._id}>
//           <Text style={styles.recommendedDescription}>
//             {service.description}
//           </Text>
//           <Text style={styles.recommendedPrice}>Price: ₹{service.price}</Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity onPress={handleViewDetails} style={styles.button}>
//               <Text style={styles.buttonText}>View Details</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={openModal} style={styles.button}>
//               <Text style={styles.buttonText}>Request Service</Text>
//             </TouchableOpacity>
//           </View>
//         </Collapsible>
//       </TouchableOpacity>

//       {/* Modal for requesting service */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {step === 1 && (
//               <>
//                 <Text style={styles.modalTitle}>Select Date</Text>
//                 <Calendar
//                   onDayPress={(day) => {
//                     setSelectedDate(day.dateString);
//                   }}
//                   markedDates={{ [selectedDate]: { selected: true } }}
//                 />
//                 <Button title="OK" onPress={() => setStep(2)} />
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <Text style={styles.modalTitle}>Select Time</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Select Time"
//                   value={selectedTime.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                   onFocus={() => setShowTimePicker(true)}
//                   onBlur={() => setShowTimePicker(false)}
//                 />
//                 {showTimePicker && (
//                   <DateTimePicker
//                     value={selectedTime}
//                     mode="time"
//                     is24Hour={false}
//                     display="default"
//                     onChange={(event, date) => {
//                       if (date) {
//                         setSelectedTime(date);
//                       }
//                       setShowTimePicker(false);
//                     }}
//                   />
//                 )}
//                 <Button title="OK" onPress={() => setStep(3)} />
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <Text style={styles.modalTitle}>Enter Your Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Your Name"
//                   value={name}
//                   onChangeText={setName}
//                 />
//                 <View style={styles.modalButtonContainer}>
//                   <Button title="Send Request" onPress={handleRequestService} />
//                   <Button
//                     title="Cancel"
//                     onPress={() => setModalVisible(false)}
//                   />
//                 </View>
//               </>
//             )}
//           </View>
//         </SafeAreaView>
//       </Modal>

//       {/* Modal for service details */}
//       <ServiceDetailsModal
//         modalVisible={detailsModalVisible}
//         setModalVisible={setDetailsModalVisible}
//         selectedService={service}
//         handleRequestService={handleRequestService} // Pass the request function
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   recommendedCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 1,
//     padding: 15,
//     marginBottom: 0,
//     borderColor: "#E0E0E0",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     width: "100%",
//   },
//   recommendedCardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   serviceImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   recommendedText: {
//     fontSize: 14,
//     marginLeft: 10,
//     color: "#4A4A4A",
//     flex: 1,
//   },
//   collapseIcon: {
//     marginLeft: 10,
//   },
//   recommendedDescription: {
//     fontSize: 12,
//     color: "#7A7A7A",
//     marginTop: 5,
//   },
//   recommendedPrice: {
//     fontSize: 12,
//     fontWeight: "bold",
//     marginTop: 5,
//     color: "#1A73E8",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#1A73E8",
//     padding: 10,
//     borderRadius: 5,
//     width: "48%",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginVertical: 10,
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });

// export default ServiceCard;
// ServiceCard.js

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import Collapsible from "react-native-collapsible";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ServiceDetailsModal from "./ServiceDetailsModal";
// import RequestServiceModal from "./RequestServiceModal"; // Import the new onent

// const ServiceCard = ({ service, expandedServiceId, toggleExpandService }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);

//   const handleViewDetails = () => {
//     setDetailsModalVisible(true);
//   };

//   return (
//     <View style={styles.recommendedCard}>
//       <TouchableOpacity onPress={() => toggleExpandService(service._id)}>
//         <View style={styles.recommendedCardContent}>
//           <Image
//             source={{
//               uri: service.image
//                 ? service.image.startsWith("data:image/")
//                   ? service.image
//                   : `data:image/jpeg;base64,${service.image}`
//                 : "https://via.placeholder.com/150",
//             }}
//             style={styles.serviceImage}
//           />
//           <Text style={styles.recommendedText}>{service.name}</Text>
//           <MaterialCommunityIcons
//             name={
//               expandedServiceId === service._id ? "chevron-up" : "chevron-down"
//             }
//             size={24}
//             color="#A0A0A0"
//             style={styles.collapseIcon}
//           />
//         </View>
//         <Collapsible collapsed={expandedServiceId !== service._id}>
//           <Text style={styles.recommendedDescription}>
//             {service.description}
//           </Text>
//           <Text style={styles.recommendedPrice}>Price: ₹{service.price}</Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity onPress={handleViewDetails} style={styles.button}>
//               <Text style={styles.buttonText}>View Details</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
//               <Text style={styles.buttonText}>Request Service</Text>
//             </TouchableOpacity>
//           </View>
//         </Collapsible>
//       </TouchableOpacity>

//       {/* Request Service Modal */}
//       <RequestServiceModal
//   modalVisible={modalVisible}
//   setModalVisible={setModalVisible} // Ensure this line is correct
//   service={service}  // Pass the service prop
//       />

//       {/* Modal for service details */}
//       <ServiceDetailsModal
//         modalVisible={detailsModalVisible}
//         setModalVisible={setDetailsModalVisible}
//         selectedService={service}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   recommendedCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 1,
//     padding: 15,
//     marginBottom: 0,
//     borderColor: "#E0E0E0",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     width: "100%",
//   },
//   recommendedCardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   serviceImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   recommendedText: {
//     fontSize: 14,
//     marginLeft: 10,
//     color: "#4A4A4A",
//     flex: 1,
//   },
//   collapseIcon: {
//     marginLeft: 10,
//   },
//   recommendedDescription: {
//     fontSize: 12,
//     color: "#7A7A7A",
//     marginTop: 5,
//   },
//   recommendedPrice: {
//     fontSize: 12,
//     fontWeight: "bold",
//     marginTop: 5,
//     color: "#1A73E8",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#1A73E8",
//     padding: 10,
//     borderRadius: 5,
//     width: "48%",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginVertical: 10,
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });

// export default ServiceCard;


import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceDetailsModal from "./ServiceDetailsModal";
import RequestServiceModal from "./RequestServiceModal"; // Import the new component

const ServiceCard = ({ service, expandedServiceId, toggleExpandService }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const handleViewDetails = () => {
    setDetailsModalVisible(true);
  };

  return (
    <View style={styles.recommendedCard}>
      <TouchableOpacity onPress={() => toggleExpandService(service._id)}>
        <View style={styles.recommendedCardContent}>
          <Image
            source={{
              uri: service.image
                ? service.image.startsWith("data:image/")
                  ? service.image
                  : `data:image/jpeg;base64,${service.image}`
                : "https://via.placeholder.com/150",
            }}
            style={styles.serviceImage}
          />
          <Text style={styles.recommendedText}>{service.name}</Text>
          <MaterialCommunityIcons
            name={
              expandedServiceId === service._id ? "chevron-up" : "chevron-down"
            }
            size={24}
            color="#A0A0A0"
            style={styles.collapseIcon}
          />
        </View>
        <Collapsible collapsed={expandedServiceId !== service._id}>
          <Text style={styles.recommendedDescription}>
            {service.description}
          </Text>
          <Text style={styles.recommendedPrice}>Price: ₹{service.price}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleViewDetails} style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
              <Text style={styles.buttonText}>Request Service</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </TouchableOpacity>

      {/* Request Service Modal */}
      <RequestServiceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        service={service} // Pass the service prop
      />

      {/* Modal for service details */}
      <ServiceDetailsModal
        modalVisible={detailsModalVisible}
        setModalVisible={setDetailsModalVisible}
        selectedService={service}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
    padding: 15,
    marginBottom: 0,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "100%",
  },
  recommendedCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  recommendedText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#4A4A4A",
    flex: 1,
  },
  collapseIcon: {
    marginLeft: 10,
  },
  recommendedDescription: {
    fontSize: 12,
    color: "#7A7A7A",
    marginTop: 5,
  },
  recommendedPrice: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    color: "#1A73E8",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#1A73E8",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ServiceCard;
