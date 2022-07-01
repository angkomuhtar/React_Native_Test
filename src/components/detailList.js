import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import tailwind from 'twrnc';

const DetailList = ({onDelete, data}) => {
  return (
    <View
      style={tailwind`my-1 flex-row justify-between items-center border-2 border-gray-400 rounded-3xl py-2 px-4`}>
      <Ionicon name="business" size={28} style={tailwind`text-green-600`} />
      <View style={tailwind`flex-1 mx-2`}>
        <Text style={tailwind`font-black mb-1 text-black`}>
          {data.expense}, {data.date}
        </Text>
        <Text style={tailwind`font-semibold text-xs text-black`}>
          {data.currency}{' '}
          {data.cash_request.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Ionicon
          name="remove-circle"
          size={24}
          style={tailwind`text-red-500`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DetailList;
