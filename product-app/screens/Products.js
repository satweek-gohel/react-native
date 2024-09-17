import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, Alert, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductUploadModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState('electronics');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const apiUrl = 'http://192.168.1.48:3000/products';

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await axios.get(apiUrl);
        dispatch(fetchProductsSuccess(response.data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
        Alert.alert('Error', 'Failed to fetch products');
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    (product.name || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !description || !image) {
      Alert.alert('Error', 'Please fill all the fields and upload an image.');
      return;
    }
  
    const newProduct = {
      name,
      category,
      price,
      description,
      image,
    };
  
    try {
      const response = await axios.post(apiUrl, newProduct);
      const addedProduct = response.data;
      
      dispatch(addProduct(addedProduct));
      dispatch(fetchProductsStart());
      const updatedResponse = await axios.get(apiUrl);
      dispatch(fetchProductsSuccess(updatedResponse.data));
  
      clearForm();
      setModalVisible(false);
      Alert.alert('Success', 'Product added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
    }
  };
  
  const handleUpdateProduct = async () => {
    if (!name || !price || !description || !image) {
      Alert.alert('Error', 'Please fill all the fields and upload an image.');
      return;
    }

    const updatedProduct = {
      name,
      category,
      price,
      description,
      image,
    };

    try {
      const response = await axios.put(`${apiUrl}/${selectedProduct._id}`, updatedProduct);
      const updated = response.data;

      dispatch(updateProduct(updated));
      dispatch(fetchProductsStart());
      const updatedResponse = await axios.get(apiUrl);
      dispatch(fetchProductsSuccess(updatedResponse.data));

      clearForm();
      setProductModalVisible(false);
      Alert.alert('Success', 'Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`${apiUrl}/${selectedProduct._id}`);
      
      dispatch(deleteProduct(selectedProduct._id));
      dispatch(fetchProductsStart());
      const updatedResponse = await axios.get(apiUrl);
      dispatch(fetchProductsSuccess(updatedResponse.data));

      clearForm();
      setProductModalVisible(false);
      Alert.alert('Success', 'Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    setImage(product.image);
    setProductModalVisible(true);
  };

  const clearForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('electronics');
    setImage(null);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            clearForm();
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        {filteredProducts.length === 0 ? (
          <Text>No products found.</Text>
        ) : (
          filteredProducts.map((product) => (
            <TouchableOpacity
              key={product._id}
              onPress={() => openProductModal(product)}
            >
              <View style={styles.productCard}>
                <View style={styles.productHeader}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productId}>#{product._id}-FE</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                    <Text style={styles.priceText}>${product.price}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Add Product Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={setPrice}
              value={price}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={setDescription}
              value={description}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="Electronics" value="electronics" />
                <Picker.Item label="Clothing" value="clothing" />
                <Picker.Item label="Home" value="home" />
              </Picker>
            </View>
            <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>
                {image ? 'Change Image' : 'Pick an Image'}
              </Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
            <Button title="Add Product" onPress={handleAddProduct} />
          </View>
        </View>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        visible={productModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setProductModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <TouchableOpacity onPress={() => setProductModalVisible(false)} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Product Details</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={setName}
                  value={name}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  keyboardType="numeric"
                  onChangeText={setPrice}
                  value={price}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  onChangeText={setDescription}
                  value={description}
                />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                  >
                    <Picker.Item label="Electronics" value="electronics" />
                    <Picker.Item label="Clothing" value="clothing" />
                    <Picker.Item label="Home" value="home" />
                  </Picker>
                </View>
                <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                  <Text style={styles.imageButtonText}>
                    {image ? 'Change Image' : 'Pick an Image'}
                  </Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                <View style={styles.iconButtonContainer}>
                  <TouchableOpacity onPress={handleUpdateProduct} style={styles.iconButton}>
                    <MaterialIcons name="edit" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeleteProduct} style={styles.iconButton}>
                    <MaterialIcons name="delete" size={24} color="#000" />
                  </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#5542F6',
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productId: {
    fontSize: 14,
    color: '#555',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
  },
  priceText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  imageButton: {
    backgroundColor: '#5542F6',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductUploadModal;
