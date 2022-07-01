import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tailwind from 'twrnc';
import Ion from 'react-native-vector-icons/Ionicons';

const Select = ({onSelected, selected, data, placeholder, label}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={tailwind`relative my-2`}>
      <Text style={tailwind`text-black font-semibold`}>{label}</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={tailwind`flex-row justify-end border-b border-b-gray-400 py-4 px-2`}>
        <Text style={tailwind.style('mr-2', selected != '' && 'text-black')}>
          {selected == '' ? placeholder : selected}
        </Text>
        <Ion name="chevron-down" size={20} />
      </TouchableOpacity>
      <View
        style={tailwind.style(
          'absolute top-18 left-0 bg-white right-0 shadow-[#f4f4f4] shadow-offset-[3px] rounded-b-md p-4 z-10',
          !open && 'hidden',
        )}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                onSelected(item);
              }}>
              <Text style={tailwind`self-end text-lg font-semibold py-1`}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Select;
