// components/RevenueVsOrdersChart.js
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const RevenueVsOrdersChart = () => {
  // Data for the chart: Monthly revenue and orders
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [500, 700, 800, 1000, 1200, 1400], // Revenue data points
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Color for revenue line
        strokeWidth: 3, // Thickness of the revenue line
      },
      {
        data: [100, 150, 200, 300, 400, 450], // Orders data points
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Color for orders line
        strokeWidth: 3, // Thickness of the orders line
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Revenue vs Orders (Monthly)</Text>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 60} // Responsive width with padding
          height={220} // Height of the chart
          chartConfig={{
            backgroundColor: '#ffffff', // Background color of the chart
            backgroundGradientFrom: '#f7f7f7', // Gradient start color
            backgroundGradientTo: '#ffffff', // Gradient end color
            decimalPlaces: 0, // No decimal places in data
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color for chart lines
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color for labels
            style: {
              borderRadius: 16, // Rounded corners for the chart
            },
            propsForDots: {
              r: '6', // Radius of the dots
              strokeWidth: '2', // Stroke width of the dots
              stroke: '#ffa726', // Stroke color of the dots
            },
          }}
          bezier // Enables bezier curve for the lines
          style={styles.chart} // Style for the chart
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Padding around the container
    backgroundColor: '#f5f5f5', // Background color of the container
  },
  box: {
    width: '100%', // Full width
    maxWidth: 350, // Maximum width of the box
    backgroundColor: '#ffffff', // Background color of the box
    padding: 20, // Padding inside the box
    borderRadius: 16, // Rounded corners for the box
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  title: {
    fontSize: 18, // Font size for the title
    fontWeight: 'bold', // Bold font weight
    marginBottom: 12, // Space below the title
    color: '#333', // Title color
  },
  chart: {
    width: '100%', // Full width for the chart
    borderRadius: 16, // Rounded corners for the chart
  },
});

export default RevenueVsOrdersChart;
