import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CashDetail, CashHeader, CashRequest, Home} from '../screen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0b6db1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="request"
        component={CashRequest}
        options={{
          title: 'Cash Request',
        }}
      />
      <Stack.Screen
        name="header"
        component={CashHeader}
        options={{
          title: 'Cash Header',
        }}
      />
      <Stack.Screen
        name="detail"
        component={CashDetail}
        options={{
          title: 'Cash Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
