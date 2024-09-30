import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getItem } from "../../utils/AsyncStorage";

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const token = await getItem('token');
            if (!token) {
                console.error("No token found!");
                setLoading(false);
                return;
            }

            const response = await axios.get('https://fixkar-end-user-1.onrender.com/users/requests', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API Response:", response.data.requests);

            if (Array.isArray(response.data.requests)) {
                setBookings(response.data.requests);
            } else {
                console.error("Expected an array but got:", response.data.requests);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error.response?.data || error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchBookings(); 
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending':
                return styles.pending;
            case 'Accepted':
                return styles.accepted;
            case 'Cancelled':
                return styles.cancelled;
            default:
                return styles.defaultStatus;
        }
    };

    const renderBookingItem = ({ item }) => {
        const serviceName = item.serviceId.name || 'Service Name'; 
        const providerName = item.serviceId.name || 'Provider Name'; 

        return (
            <TouchableOpacity style={[styles.bookingContainer, getStatusStyle(item.status)]}>
                <View style={styles.bookingInfo}>
                    <Ionicons name="home" size={24} color="#2C3E50" />
                    <Text style={styles.serviceText}>{serviceName}</Text>
                    <Text style={styles.providerText}>{providerName}</Text>
                    <Text style={styles.dateTimeText}>
                        {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2C3E50" />
            </SafeAreaView>
        );
    }

    if (bookings.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.noBookingsText}>No bookings found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
                <Text style={styles.heading}>My Bookings</Text>
            </View>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item._id}
                renderItem={renderBookingItem}
                contentContainerStyle={styles.listContainer}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#BEC3C7',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    bookingContainer: {
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingInfo: {
        flex: 1,
        marginRight: 15,
    },
    serviceText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 5,
    },
    providerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495E',
        marginBottom: 2,
    },
    dateTimeText: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    statusBadge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    pending: {
        backgroundColor: '#FFF3CD',
        borderLeftColor: '#FFC107',
    },
    accepted: {
        backgroundColor: '#C8E6C9', // Softer green background
        borderLeftColor: '#4CAF50', // Darker green border
    },
    cancelled: {
        backgroundColor: '#FDEBD0', // Softer red background
        borderLeftColor: '#E74C3C', // Darker red border
    },
    noBookingsText: {
        fontSize: 18,
        color: '#34495E',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default BookingPage;
