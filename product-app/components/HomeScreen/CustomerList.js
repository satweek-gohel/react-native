import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Sample customer data
const customers = [
  { id: '00224', name: 'Aiden Murray' },
  { id: '00223', name: 'Manuel Morrison' },
  { id: '00222', name: 'Jennie Fowler' },
  { id: '00221', name: 'Jared Hawkins' },
  { id: '00220', name: 'Rena Sanders' },
];

const CustomerList = () => {
  const navigation = useNavigation();

  // Function to render each customer item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.initials}>
        <Text style={styles.initialsText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.id}>Customer ID#{item.id}</Text>
      </View>
      <View style={styles.actions}>
        {/* Action buttons for call, message, and favorite */}
        <TouchableOpacity style={styles.icon}>
          <MaterialIcons name="call" size={24} color="#B6B4BA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialIcons name="message" size={24} color="#B6B4BA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialIcons name="star" size={24} color="#B6B4BA" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Customers</Text>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.viewMore}
            onPress={() => navigation.navigate('Customers')}
          >
            <Text style={styles.viewMoreText}>View More Customers ➔</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  initials: {
    backgroundColor: '#5542F6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  id: {
    color: '#757575',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  viewMore: {
    padding: 15,
    alignItems: 'center',
  },
  viewMoreText: {
    fontWeight: 'bold',
  },
});

export default CustomerList;
