import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DashboardCard from '../components/HomeScreen/DashboardCard';
import RevenueVsOrdersChart from '../components/HomeScreen/LineChartComp';
import DoughnutChart from '../components/HomeScreen/TrafficChannelChart';
import CountryDashboard from '../components/HomeScreen/CountryComp';
import CustomerList from '../components/HomeScreen/CustomerList';
import SalesDashboard from '../components/HomeScreen/SalesChart';
import TopProducts from '../components/HomeScreen/TopProduct';
import TransactionHistory from '../components/HomeScreen/TransactionHistory';

const dummyData = [
  {
    title: 'Total Sales',
    amount: '$391,820.75',
    percentageChange: 21.9,
    icon: 'sell', 
    currency: '67k',
  },
  {
    title: 'Visitors',
    amount: '831,374',
    percentageChange: -5.2,
    icon: 'people',
    currency: '7k',
  },
  {
    title: 'Total Orders',
    amount: '1,042,665',
    percentageChange: 8.5,
    icon: 'shopping-bag', 
    currency: '5k',
  },
  {
    title: 'Refunded',
    amount: '50,441',
    percentageChange: -2.3,
    icon: 'keyboard-return', 
    currency: '5',
  },
];

const HomeScreen = () => {
  const [selectedCard, setSelectedCard] = useState(null); // State to track the selected card

  const handleCardSelect = (index) => {
    setSelectedCard(index); // Update the selected card index
  };

  return (
    <ScrollView style={styles.container}>
      {dummyData.map((data, index) => (
        <DashboardCard
          key={index}
          title={data.title}
          amount={data.amount}
          percentageChange={data.percentageChange}
          icon={data.icon}
          currency={`+ ${data.currency} Today`}
          isSelected={selectedCard === index} // Check if the card is selected
          onSelect={() => handleCardSelect(index)} // Handle card selection
        />
      ))}

      <RevenueVsOrdersChart />
      <DoughnutChart />
      <CountryDashboard />
      <TopProducts />
      <CustomerList />
      <TransactionHistory />
      <SalesDashboard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
