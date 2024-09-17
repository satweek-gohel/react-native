import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Data for the BarChart
const data = {
  labels: ['Jan', 'Feb', 'Mar'], // X-axis labels for the chart
  datasets: [
    {
      data: [50, 45, 60], // Today's sales values
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Color for today's sales
    },
    {
      data: [55, 40, 65], // Yesterday's sales values
      color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`, // Color for yesterday's sales
    },
  ],
};

// Configuration for the chart appearance
const chartConfig = {
  backgroundGradientFrom: '#fff', // Background gradient start color
  backgroundGradientTo: '#fff', // Background gradient end color
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color for chart lines
  barPercentage: 0.5, // Percentage of space each bar should take
  decimalPlaces: 0, // No decimal places for values
};

// Main component for the Sales Dashboard
const SalesDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Real-Time Sale</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Refunded</Text>
            <Text style={styles.value}>$160,200</Text>
            <Text style={styles.percentage}>↑ 0.20%</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Avg. Sales per day</Text>
            <Text style={styles.value}>$22,180</Text>
            <Text style={styles.percentage}>↓ 1.04%</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <BarChart
            style={styles.chart}
            data={data}
            width={screenWidth - 40} // Width of the chart
            height={220} // Height of the chart
            chartConfig={chartConfig} // Chart configuration
            verticalLabelRotation={0} // No rotation for vertical labels
            fromZero // Start the y-axis from zero
            showBarTops // Show the top values on bars
            showValuesOnTopOfBars // Show values on top of bars
          />
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background for contrast
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20, // Title font size
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#757575', // Label color
  },
  value: {
    fontSize: 24, // Value font size
    fontWeight: 'bold',
    marginVertical: 5,
  },
  percentage: {
    fontSize: 16,
    color: 'green', // Percentage change color
  },
  chartContainer: {
    backgroundColor: '#fff', // Chart background color
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    overflow: 'hidden', // Ensure the chart fits within the rounded corners
  },
  chart: {
    borderRadius: 10, // Chart corners
  },
});

export default SalesDashboard;
