import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const transactions = [
  { id: '1', title: 'Payment from #1032', date: 'Jan 21, 2019, 3:30pm', amount: '+ $250.00', status: 'Completed' },
  { id: '2', title: 'Failed from #0876', date: 'Jan 21, 2019, 3:30pm', amount: '+ $250.00', status: 'Declined' },
  { id: '3', title: 'Title', date: 'Jan 20, 2019, 3:30pm', amount: '+ $250.00', status: 'Completed' },
  { id: '4', title: 'Title', date: 'Jan 19, 2019, 2:44pm', amount: '+ $250.00', status: 'Completed' },
  { id: '5', title: 'Title', date: 'Jan 19, 2019, 1:30pm', amount: '+ $250.00', status: 'For pickup' },
];

const TransactionHistory = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.icon}>
        {item.status === 'Completed' && <MaterialIcons name="check-circle" size={24} color="#4CAF50" />}
        {item.status === 'Declined' && <MaterialIcons name="cancel" size={24} color="#F44336" />}
        {item.status === 'For pickup' && <MaterialIcons name="archive" size={24} color="#FFC107" />}
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.amountStatus}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={[styles.status, item.status === 'Completed' ? styles.completed : item.status === 'Declined' ? styles.declined : styles.pending]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <TouchableOpacity style={styles.viewMore}>
            <Text style={styles.viewMoreText}>View All Transactions ➔</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#757575',
  },
  amountStatus: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 5,
    fontSize: 14,
  },
  completed: {
    color: '#4CAF50',
  },
  declined: {
    color: '#F44336',
  },
  pending: {
    color: '#FFC107',
  },
  viewMore: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default TransactionHistory;

