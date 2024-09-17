import React from 'react';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/Overview';
import ProductsScreen from './screens/Products';
import OrdersScreen from './screens/Orders';
import ReviewScreen from './screens/Reviews';
import CustomerScreen from './screens/Customer';

// Import the logo
const logo = require('./assets/17.png'); 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              drawerActiveTintColor: '#fff', 
              drawerActiveBackgroundColor: '#5542F6', 
              drawerInactiveTintColor: '#000', 
              headerTitleAlign: 'center', 
            }}
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="home" color={color} size={size} />
                ),
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{ width: 120, height: 40 }} 
                    resizeMode="contain"
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Products"
              component={ProductsScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="list" color={color} size={size} />
                ),
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{ width: 120, height: 40 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="receipt" color={color} size={size} />
                ),
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{ width: 120, height: 40 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Manage Reviews"
              component={ReviewScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="reviews" color={color} size={size} />
                ),
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{ width: 120, height: 40 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Customers"
              component={CustomerScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="people" color={color} size={size} />
                ),
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{ width: 120, height: 40 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
