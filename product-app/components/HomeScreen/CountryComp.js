// components/CountryDashboard.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Polygon } from 'react-native-maps';

// Coordinates for countries
const countriesData = {
  USA: {
    coordinates: [
      { latitude: 49.384358, longitude: -125.00165 },
      { latitude: 24.396308, longitude: -125.00165 },
      { latitude: 24.396308, longitude: -66.93457 },
      { latitude: 49.384358, longitude: -66.93457 },
    ],
    center: { latitude: 37.0902, longitude: -95.7129 },
    delta: { latitudeDelta: 20, longitudeDelta: 20 },
  },
  Canada: {
    coordinates: [
      { latitude: 83.23324, longitude: -141.001 },
      { latitude: 41.675105, longitude: -141.001 },
      { latitude: 41.675105, longitude: -52.648 },
      { latitude: 83.23324, longitude: -52.648 },
    ],
    center: { latitude: 56.1304, longitude: -106.3468 },
    delta: { latitudeDelta: 20, longitudeDelta: 20 },
  },
  Brazil: {
    coordinates: [
      { latitude: 5.266, longitude: -73.984 },
      { latitude: -33.747, longitude: -73.984 },
      { latitude: -33.747, longitude: -34.58 },
      { latitude: 5.266, longitude: -34.58 },
    ],
    center: { latitude: -14.2350, longitude: -51.9253 },
    delta: { latitudeDelta: 20, longitudeDelta: 20 },
  },
  Australia: {
    coordinates: [
      { latitude: -10.668, longitude: 113.338 },
      { latitude: -43.634, longitude: 113.338 },
      { latitude: -43.634, longitude: 153.986 },
      { latitude: -10.668, longitude: 153.986 },
    ],
    center: { latitude: -25.2744, longitude: 133.7751 },
    delta: { latitudeDelta: 20, longitudeDelta: 20 },
  }
};

// Data for states within each country
const statesData = {
  USA: [
    { state: 'California', visits: 5000, sales: 2000 },
    { state: 'Texas', visits: 3000, sales: 1500 },
  ],
  Canada: [
    { state: 'Ontario', visits: 4000, sales: 1800 },
    { state: 'Quebec', visits: 2500, sales: 1200 },
  ],
  Brazil: [
    { state: 'Sao Paulo', visits: 6000, sales: 2200 },
    { state: 'Rio de Janeiro', visits: 3500, sales: 1600 },
  ],
  Australia: [
    { state: 'New South Wales', visits: 4500, sales: 1700 },
    { state: 'Victoria', visits: 3000, sales: 1400 },
  ],
};

const CountryDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [scaleAnim] = useState(new Animated.Value(1)); // Animation for country selection

  // Function to handle country selection and animate
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    Animated.spring(scaleAnim, {
      toValue: 1.1,
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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => handleCountrySelect(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a country" value="" />
            {Object.keys(countriesData).map((country) => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
        </View>

        <MapView
          style={styles.map}
          region={{
            ...countriesData[selectedCountry]?.center,
            ...countriesData[selectedCountry]?.delta,
          }}
        >
          {Object.keys(countriesData).map((country) => {
            const { coordinates } = countriesData[country];
            return (
              <Animated.View
                key={country}
                style={{
                  transform: [{ scale: selectedCountry === country ? scaleAnim : 1 }],
                }}
              >
                <Polygon
                  coordinates={coordinates}
                  strokeColor={selectedCountry === country ? 'green' : 'gray'} // Color based on selection
                  fillColor={selectedCountry === country ? 'rgba(0,255,0,0.3)' : 'transparent'} // Fill color for selected country
                  strokeWidth={2}
                />
              </Animated.View>
            );
          })}
        </MapView>

        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>State</Text>
            <Text style={styles.headerCell}>Visits</Text>
            <Text style={styles.headerCell}>Sales</Text>
          </View>
          {statesData[selectedCountry]?.map((stateData, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{stateData.state}</Text>
              <Text style={styles.cell}>{stateData.visits}</Text>
              <Text style={styles.cell}>{stateData.sales}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  box: {
    margin: 20,
    backgroundColor: '#fff', // Box background color
    borderRadius: 16, // Rounded corners
    overflow: 'hidden', // Ensure rounded corners are applied
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333', // Text color for readability
  },
  map: {
    height: 300,
    width: '100%',
  },
  table: {
    marginTop: 20,
    backgroundColor: '#fff', // Table background color
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#5542F6', // Header background color
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff', // Header text color
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9', // Row background color
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333', // Cell text color
  },
});

export default CountryDashboard;
