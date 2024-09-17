import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopProducts = () => {
  const navigation = useNavigation();

  const products = [
    {
      id: 1,
      name: 'Amazon Echo (3rd Gen)',
      change: '+5%',
      sold: '6,643',
      sales: '$10,331.70',
      imageUrl: 'https://th.bing.com/th/id/OIP.6-EJinQ7ZqelI8C5TfhgLgHaG0?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      changeDirection: 'up'
    },
    {
      id: 2,
      name: 'Aedle VK-X - Premium Custom...',
      change: '-11%',
      sold: '6,331.70',
      sales: '$10,331.70',
      imageUrl: 'https://th.bing.com/th/id/OIP.pVttOqgxCRHWr2L1tDs2nwAAAA?rs=1&pid=ImgDetMain',
      changeDirection: 'down'
    },
    {
      id: 3,
      name: 'Nikon D750 FX-format',
      change: '+1.7%',
      sold: '6,643',
      sales: '$10,331.70',
      imageUrl: 'https://www.bhphotovideo.com/images/images2500x2500/nikon_d750_dslr_camera_with_1082604.jpg',
      changeDirection: 'up'
    },
    {
      id: 4,
      name: 'Minimalist wireless headphone',
      change: '+7.0%',
      sold: '6,643',
      sales: '$10,331.70',
      imageUrl: 'https://th.bing.com/th/id/OIP.uzLrnH3P5tsK11vgIAhQ7QHaHa?rs=1&pid=ImgDetMain',
      changeDirection: 'up'
    },
    {
      id: 5,
      name: 'Shinola watch S10 Cream',
      change: '-17%',
      sold: '6,643',
      sales: '$10,331.70',
      imageUrl: 'https://i5.walmartimages.com/asr/a540ccbc-45b4-424e-b030-fbe979f0c643_1.ceb2781806506cb315e6eb1b7fae2be7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
      changeDirection: 'down'
    },
    {
      id: 6,
      name: 'Polaroid Pro 600 film',
      change: '+9.7%',
      sold: '6,643',
      sales: '$10,331.70',
      imageUrl: 'https://th.bing.com/th/id/OIP.O7cNUOzvUSTxg-KjDjUG8wHaE8?rs=1&pid=ImgDetMain',
      changeDirection: 'up'
    }
  ];

  const renderProduct = (product) => {
    const scaleAnim = new Animated.Value(1);

    Animated.spring(scaleAnim, {
      toValue: 1.05,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });

    return (
      <Animated.View key={product.id} style={[styles.productContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.changeContainer}>
            <Text
              style={[
                styles.change,
                { color: product.changeDirection === 'up' ? '#4CAF50' : '#F44336' }
              ]}
            >
              {product.changeDirection === 'up' ? `↑ ${product.change}` : `↓ ${product.change}`}
            </Text>
          </View>
          <Text style={styles.sold}>SOLD {product.sold}</Text>
          <Text style={styles.sales}>SALES {product.sales}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productList}>
        {products.map(renderProduct)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    color: '#007BFF',
    fontSize: 16,
  },
  productList: {
    marginTop: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  change: {
    fontSize: 14,
  },
  sold: {
    fontSize: 14,
    color: '#555',
  },
  sales: {
    fontSize: 14,
    color: '#555',
  },
});

export default TopProducts;
