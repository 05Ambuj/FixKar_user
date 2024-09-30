import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ServiceCard from "./ServiceCard"; // Assuming you have a ServiceCard component

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedServiceId, setExpandedServiceId] = useState(null); // Add state for expanded service

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://fixkar-end-user-1.onrender.com/users/getAllServices");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is an array
        if (Array.isArray(data)) {
          setServices(data); // Set the fetched services
        } else {
          console.error("Data is not an array:", data);
          setServices([]); // Handle case where data is not in expected format
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleExpandService = (serviceId) => {
    setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1A73E8" />;
  }

  if (error) {
    return <Text style={styles.errorMessage}>Error: {error}</Text>;
  }

  if (services.length === 0) {
    return <Text style={styles.noResults}>No services found</Text>;
  }

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item._id} // Use _id for unique key
      renderItem={({ item }) => {
        return (
          <ServiceCard
            service={item}
            expandedServiceId={expandedServiceId} // Pass expandedServiceId
            toggleExpandService={toggleExpandService} // Pass the function
            handleViewDetails={(service) => console.log('Viewing details for:', service)} // Example function
          />
        );
      }}
      contentContainerStyle={styles.serviceList}
    />
  );
};

const styles = StyleSheet.create({
  serviceList: {
    paddingBottom: 20,
  },
  noResults: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    color: "#757575",
  },
  errorMessage: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    color: "red",
  },
});

export default ServiceList;
