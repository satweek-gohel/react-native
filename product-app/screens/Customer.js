import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert, Modal, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const customersData = [
  { image: 'https://i.pinimg.com/originals/9f/74/53/9f74535608abc523efe3eb37a9a30a54.jpg', name: 'John Doe', id: '001', email: 'john.doe@example.com', totalSpent: '$1200', country: 'USA' },
  { image: 'https://img.freepik.com/free-photo/porait-cute-boy-cafe_23-2148436119.jpg', name: 'Jane Smith', id: '002', email: 'jane.smith@example.com', totalSpent: '$1500', country: 'Canada' },
  { image: 'https://i.pinimg.com/474x/25/3a/bf/253abf4f1f4bc16b6dc04571f8d21624.jpg', name: 'Alice Johnson', id: '003', email: 'alice.johnson@example.com', totalSpent: '$800', country: 'UK' },
  { image: 'https://thumbs.wbm.im/pw/small/39573f81d4d58261e5e1ed8f1ff890f6.jpg', name: 'Bob Brown', id: '004', email: 'bob.brown@example.com', totalSpent: '$950', country: 'Australia' },
  { image: 'https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid', name: 'Charlie Davis', id: '005', email: 'charlie.davis@example.com', totalSpent: '$600', country: 'Germany' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', name: 'Diana Evans', id: '006', email: 'diana.evans@example.com', totalSpent: '$1100', country: 'France' },
  { image: 'https://img.freepik.com/free-photo/close-up-smiley-woman-outdoors_23-2149002410.jpg', name: 'Ethan Foster', id: '007', email: 'ethan.foster@example.com', totalSpent: '$1300', country: 'Italy' },
  { image: 'https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww', name: 'Fiona Green', id: '008', email: 'fiona.green@example.com', totalSpent: '$700', country: 'Spain' },
  { image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww', name: 'George Harris', id: '009', email: 'george.harris@example.com', totalSpent: '$900', country: 'Netherlands' },
  { image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', name: 'Hannah Ivers', id: '010', email: 'hannah.ivers@example.com', totalSpent: '$400', country: 'Sweden' },
  { image: 'https://thumbs.wbm.im/pw/small/783192c550ac788f154b48562babfac7.jpg', name: 'Ian Johnson', id: '011', email: 'ian.johnson@example.com', totalSpent: '$500', country: 'Norway' },
  { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&usqp=CAU', name: 'Julia King', id: '012', email: 'julia.king@example.com', totalSpent: '$300', country: 'Finland' },
  { image: 'https://img.freepik.com/free-photo/portrait-attractive-redhead-teenage-girl-wearing-black-hat-trendy-sleeveless-denim-jacket_273609-9483.jpg', name: 'Kevin Lee', id: '013', email: 'kevin.lee@example.com', totalSpent: '$850', country: 'Ireland' },
  { image: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=', name: 'Laura Miller', id: '014', email: 'laura.miller@example.com', totalSpent: '$1200', country: 'Belgium' },
  { image: 'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbGV8ZW58MHx8MHx8fDA%3D', name: 'Mike Nelson', id: '015', email: 'mike.nelson@example.com', totalSpent: '$950', country: 'Switzerland' },
];

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const filteredCustomers = customersData.filter((customer) =>
    (customer.name || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const exportToCSV = async () => {
    try {
      const csvContent = [
        ['Image', 'Name', 'ID', 'Email', 'Total Spent', 'Country'],
        ...customersData.map(customer => [
          customer.image,
          customer.name,
          customer.id,
          customer.email,
          customer.totalSpent,
          customer.country
        ])
      ]
        .map(e => e.join(','))
        .join('\n');

      const fileUri = FileSystem.documentDirectory + 'customers.csv';
      await FileSystem.writeAsStringAsync(fileUri, csvContent);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export CSV');
    }
  };

  const openCustomerModal = (customer) => {
    setSelectedCustomer(customer);
    setCustomerModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Customers..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={exportToCSV} style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export CSV</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        {filteredCustomers.length === 0 ? (
          <Text>No customers found.</Text>
        ) : (
          filteredCustomers.map((customer) => (
            <TouchableOpacity key={customer.id} onPress={() => openCustomerModal(customer)}>
              <View style={styles.customerCard}>
                <Image source={{ uri: customer.image }} style={styles.customerImage} />
                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {customer.name}</Text>
                  <Text style={styles.customerId}><Text style={{ fontWeight: 'bold' }}>ID:</Text> {customer.id}</Text>
                  <Text style={styles.customerEmail}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {customer.email}</Text>
                  <Text style={styles.customerCountry}><Text style={{ fontWeight: 'bold' }}>Country:</Text> {customer.country}</Text>
                  <Text style={styles.totalSpent}><Text style={{ fontWeight: 'bold' }}>Total Spent:</Text> {customer.totalSpent}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Customer Detail Modal */}
      <Modal
        visible={customerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCustomerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCustomer && (
              <>
                <Image source={{ uri: selectedCustomer.image }} style={styles.modalImage} />
                <TouchableOpacity style={styles.closeIcon} onPress={() => setCustomerModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalTitle}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {selectedCustomer.name}</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>ID:</Text> {selectedCustomer.id}</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {selectedCustomer.email}</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Country:</Text> {selectedCustomer.country}</Text>
                  <Text><Text style={{ fontWeight: 'bold' }}>Total Spent:</Text> {selectedCustomer.totalSpent}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  exportButton: {
    backgroundColor: '#5542F6',
    padding: 10,
    borderRadius: 5,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  customerImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  customerDetails: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerId: {
    color: '#888',
  },
  customerEmail: {
    color: '#555',
  },
  customerCountry: {
    color: '#777',
    marginTop: 5,
  },
  totalSpent: {
    fontSize: 16,
    color: '#5542F6',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDetails: {
    alignItems: 'flex-start',
    width: '100%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CustomerList;
