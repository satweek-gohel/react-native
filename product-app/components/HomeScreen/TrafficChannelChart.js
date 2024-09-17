import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const RingChart = () => {
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const data = [
    { name: 'Direct', percentage: 45, color: 'rgba(0, 122, 255, 1)' },
    { name: 'Organic', percentage: 35, color: 'rgba(0, 255, 0, 1)' },
    { name: 'Referral', percentage: 20, color: 'rgba(255, 0, 255, 1)' },
  ];

  const renderRing = (percentage, color, index) => {
    const strokeDashoffset = circumference - (circumference * percentage) / 100;
    return (
      <Circle
        key={index}
        cx="50%"
        cy="50%"
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
        rotation={-90}
        originX="90"
        originY="90"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Traffic Channels</Text>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Direct</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          <Svg height="200" width="200" viewBox="0 0 180 180">
            <G>
              {data.map((item, index) => renderRing(item.percentage, item.color, index))}
            </G>
          </Svg>
        </View>
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: '#333',
  },
});

export default RingChart;
