import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ManageParking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>דוחות</Text>
      
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>פעולות אחרונות</Text>
        {/* Render your transactions component here */}
      </View>

      <View style={styles.reportsContainer}>
        <Text style={styles.sectionTitle}>דוחות פיננסיים</Text>
        {/* Render your financial reports component here */}
      </View>
    </View>
  );
};

export default ManageParking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'right'

  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  reportsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});