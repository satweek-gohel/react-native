import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const orders = [
  {
    id: '1',
    name: 'Zachary Parker',
    status: 'paid',
    orderId: '#27839-00',
    date: '12 Feb 2021',
    price: '$15,302.00',
    profileImage: 'https://img.freepik.com/free-photo/front-view-portrait-businessman-with-glasses_23-2148816831.jpg',
    method: '**** 819',
  },
  {
    id: '2',
    name: 'Mae Walker',
    status: 'pending',
    orderId: '#27839-01',
    date: '12 Feb 2021',
    price: '$15,302.00',
    profileImage: 'https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid',
    method: '**** @mail.com',
  },
  {
    id: '3',
    name: 'Isabelle Vega',
    status: 'cancelled',
    orderId: '#27839-02',
    date: '12 Feb 2021',
    price: '$15,302.00',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgR71cXSeHLZp8jmBQhHKQn_kZr3Yijgj1Sw&usqp=CAU',
    method: '**** 819',
  },
];

const OrderItem = ({ item }) => (
  <View style={styles.orderItem}>
    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
    <View style={styles.orderDetails}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={[styles.status, styles[item.status]]}>Status: {item.status}</Text>
      <Text style={styles.date}>Date:  {item.date}</Text>
      <Text style={styles.method}>Method: {item.method}</Text>
      <Text style={styles.price}>Price: {item.price}</Text>
    </View>
  </View>
);

const OrdersList = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search orders"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={24} color="black" />
      </View>
      <View style={styles.tabs}>
        {['all', 'paid', 'pending', 'cancelled'].map(status => (
          <TouchableOpacity key={status} onPress={() => setFilter(status)}>
            <Text style={[styles.tab, filter === status && styles.activeTab]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#5542F6',
    color: 'white'
  },
  orderItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    textTransform: 'capitalize',
  },
  paid: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  cancelled: {
    color: 'red',
  },
  orderId: {
    color: 'red',
  },
  date: {
    color: '#555',
  },
  method: {
    color: '#555',
  },
  price: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default OrdersList;
