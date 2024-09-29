// CompletedTasks.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompletedTasks = () => {
  return (
    <View style={[styles.body, styles.completedBody]}>
      <Text style={styles.sectionHeader}>Completed Tasks</Text>
      <Text style={styles.bodyText}>Description for completed tasks goes here.</Text>
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
  completedBody: {
    borderLeftWidth: 5,
    borderLeftColor: '#003B5C', // Deep blue for completed tasks
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

export default CompletedTasks;
