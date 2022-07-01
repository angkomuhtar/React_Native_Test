import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={tailwind.style('flex-1 justify-center items-center')}>
      <TouchableOpacity
        style={tailwind.style('bg-blue-500 p-4 rounded-md')}
        onPress={() => navigation.navigate('request')}>
        <Text style={tailwind.style('text-white font-bold text-lg')}>
          Make a Cash Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
