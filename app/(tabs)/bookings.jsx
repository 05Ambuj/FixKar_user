import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookingPage = () => {
  const bookings = [
    {
      id: 1,
      status: 'pending',
      location: 'Tripathi House, Mirzapur, India',
      time: '3:00 PM',
      date: '2024-09-28',
      serviceType: 'Home Cleaning',
    },
    {
      id: 2,
      status: 'accepted',
      location: 'New Town, Kolkata, India',
      time: '11:00 AM',
      date: '2024-10-01',
      serviceType: 'Plumbing',
    },
    {
      id: 3,
      status: 'cancelled',
      location: 'Nalanda, Bihar, India',
      time: '5:30 PM',
      date: '2024-09-30',
      serviceType: 'Electrical Repair',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return styles.pending;
      case 'accepted':
        return styles.accepted;
      case 'cancelled':
        return styles.cancelled;
      default:
        return styles.defaultStatus;
    }
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity style={[styles.bookingContainer, getStatusStyle(item.status)]}>
      <View style={styles.bookingInfo}>
        <Ionicons name="home" size={24} color="#2C3E50" />
        <Text style={styles.serviceText}>{item.serviceType}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <Text style={styles.dateTimeText}>{item.date} at {item.time}</Text>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
        <Text style={styles.heading}>My Bookings</Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingContainer: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfo: {
    flex: 1,
    marginRight: 15,
  },
  serviceText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#95A5A6',
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
    color: '#FFF',
  },
  pending: {
    backgroundColor: '#FEF3C7',
    borderLeftColor: '#F59E0B',
  },
  accepted: {
    backgroundColor: '#D1FAE5',
    borderLeftColor: '#10B981',
  },
  cancelled: {
    backgroundColor: '#FECACA',
    borderLeftColor: '#EF4444',
  },
});

export default BookingPage;
