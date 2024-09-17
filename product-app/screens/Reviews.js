import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const reviewsData = {
  published: [
    {
      id: '1',
      name: 'Zachary Parker',
      rating: 5,
      review: 'Love this product! An absolute great purchase! Small and fits in my hand and it doesn\'t get in the way! I love that I can buy/download as many PS4 games as my heart desires and it\'ll be a long while before the space is filled up!',
      date: '12 Feb 2021',
      productImage: 'https://www.bhphotovideo.com/images/images2500x2500/nikon_d750_dslr_camera_with_1082604.jpg',
      productName: 'Nikon D750 FX-format',
      productType: 'D750 FX',
    },
    {
      id: '2',
      name: 'Helena Mack',
      rating: 4,
      review: 'Impressed! I am again impressed how technology has advanced. My old hard drive is 4 times as big and probably 8 times as heavy with half the capacity.',
      date: '10 Jan 2021',
      productImage: 'https://th.bing.com/th/id/OIP.pVttOqgxCRHWr2L1tDs2nwAAAA?rs=1&pid=ImgDetMain',
      productName: 'Canon EOS 5D Mark IV',
      productType: 'DSLR',
    },
  ],
  pending: [
    {
      id: '3',
      name: 'John Doe',
      rating: 3,
      review: 'The product is okay, but there were some issues with delivery.',
      date: '01 Mar 2021',
      productImage: 'https://m.media-amazon.com/images/I/711KuxSzmqL.jpg',
      productName: 'Sony A7 III',
      productType: 'Mirrorless',
    },
  ],
};

const ReviewItem = ({ item }) => (
  <View style={styles.reviewItem}>
    <View style={styles.header}>
      <Image source={{ uri: 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg' }} style={styles.avatar} />
      <View style={styles.headerText}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.rating}>
          {[...Array(item.rating)].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="gold" />
          ))}
        </View>
      </View>
    </View>
    <Text style={styles.review}>{item.review}</Text>
    <View style={styles.product}>
      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <View style={styles.productText}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productType}>{item.productType}</Text>
      </View>
    </View>
  </View>
);

const ReviewsList = () => {
  const [selectedTab, setSelectedTab] = useState('published');
  const reviews = reviewsData[selectedTab];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const overallRating = 4.8; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Reviews</Text>
      </View>
      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'published' && styles.activeTab]}
            onPress={() => handleTabChange('published')}
          >
            <Text style={[styles.tabText, selectedTab === 'published' && styles.activeTabText]}>
              Published
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
            onPress={() => handleTabChange('pending')}
          >
            <Text style={[styles.tabText, selectedTab === 'pending' && styles.activeTabText]}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.overallRating}>
        <Text style={styles.ratingValue}>{overallRating}</Text>
        <Text style={styles.ratingText}>From 2.6k reviews</Text>
      </View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tabsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#5542F6',
  },
  activeTab: {
    backgroundColor: '#5542F6',
    elevation: 4,
  },
  activeTabText: {
    color: '#fff',
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5542F6',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
  },
  reviewItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  review: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  product: {
    flexDirection: 'row',
    marginTop: 16,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  productText: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productType: {
    fontSize: 14,
    color: '#555',
  },
});

export default ReviewsList;
