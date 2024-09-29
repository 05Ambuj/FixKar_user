// AcceptedTasks.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AcceptedTasks = () => {
  return (
    <View style={[styles.body, styles.acceptedBody]}>
      <Text style={styles.sectionHeader}>Accepted Tasks</Text>
      <Text style={styles.bodyText}>Description for accepted tasks goes here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF', // White background for body
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  acceptedBody: {
    borderLeftWidth: 5,
    borderLeftColor: '#00A8A6', // Vibrant teal for accepted tasks
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003B5C', // Deep blue
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#333333', // Charcoal text color
  },
});

export default AcceptedTasks;
