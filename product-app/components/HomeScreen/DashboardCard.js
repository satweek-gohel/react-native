import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// DashboardCard component to display card information
const DashboardCard = ({ icon, title, amount, percentageChange, currency, isSelected, onSelect }) => {
  const isPositive = percentageChange >= 0; // Determine if the percentage change is positive

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]} // Apply selected style if isSelected is true
      onPress={onSelect} // Handle card selection
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
          <MaterialIcons
            name={icon}
            size={20}
            color={isSelected ? 'white' : '#5542F6'} // Change icon color based on selection
          />
        </View>
        <Text style={[styles.title, isSelected && styles.titleSelected]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.amount, isSelected && styles.amountSelected]}>
        {amount}
      </Text>
      <View style={styles.footer}>
        <View style={styles.changeContainer}>
          <MaterialIcons
            name={isPositive ? 'arrow-upward' : 'arrow-downward'} // Show arrow based on percentage change
            size={20}
            color={isPositive ? 'green' : 'red'} // Color the arrow based on positivity
          />
          <Text style={[styles.percentageChange, isSelected && styles.percentageChangeSelected]}>
            {percentageChange}%
          </Text>
        </View>
        <Text style={[styles.currency, isSelected && styles.currencySelected]}>
          {currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    elevation: 3,
    borderLeftWidth: 0,
    paddingHorizontal: 25, 
  },
  cardSelected: {
    backgroundColor: '#5542F6' // Background color when card is selected
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  iconContainerSelected: {
    backgroundColor: '#5542F5', // Darker blue when selected
  },
  title: {
    fontSize: 14,
    fontWeight: '300',
  },
  titleSelected: {
    color: '#fff', // Title color when selected
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15, // Space below the amount
  },
  amountSelected: {
    color: '#fff', // Amount color when selected
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageChange: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  percentageChangeSelected: {
    color: '#fff', // Percentage change color when selected
  },
  currency: {
    fontSize: 12,
    color: '#666',
  },
  currencySelected: {
    color: '#fff', // Currency color when selected
  },
});

export default DashboardCard;
