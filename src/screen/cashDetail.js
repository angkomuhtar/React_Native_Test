import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';
import Select from '../components/select';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addDetails} from '../reducer/cashSlice';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const expense = ['Dinner', 'Hotel', 'Lunch', 'Other'];
const currency = ['IDR', 'USD'];

const CashDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({
    date: '',
    expense: '',
    currency: '',
    cash_request: 0,
    remarks: '',
  });

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tailwind`flex-1 px-5 py-3 h-96`}>
      <View style={tailwind`relative my-2`}>
        <Text style={tailwind`text-black font-semibold`}>Date and Time</Text>
        <View style={tailwind.style('flex-row items-center mt-4')}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={tailwind.style(
              'border-b-gray-400 border-b flex-1 flex-row items-center px-2 py-3',
            )}>
            <Text style={tailwind.style('flex-1 text-right mr-2')}>
              {detail.date == '' ? 'dd / mm / yyyy' : detail.date}
            </Text>
            <Icon name="calendar-outline" size={24} />
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDetail({
              ...detail,
              date: moment(date).format('DD/MM/YYYY'),
            });
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <Select
        onSelected={e => {
          setDetail({
            ...detail,
            expense: e,
          });
        }}
        placeholder="Select expanse type"
        label="Expanse Type"
        data={expense}
        selected={detail.expense}
      />
      <Select
        onSelected={e => {
          setDetail({
            ...detail,
            currency: e,
          });
        }}
        placeholder="Select currency"
        label="Currency"
        data={currency}
        selected={detail.currency}
      />
      <View style={tailwind`relative my-2`}>
        <Text style={tailwind`text-black font-semibold`}>Cash Requested</Text>
        <TextInput
          placeholder="Set Cash"
          style={tailwind.style(
            'border-b border-b-gray-400 text-right py-4 px-2 ',
          )}
          keyboardType="numeric"
          onChangeText={e => {
            setDetail({
              ...detail,
              cash_request: parseInt(e),
            });
          }}
        />
      </View>
      <View style={tailwind`relative my-2`}>
        <Text style={tailwind`text-black font-semibold`}>Remarks</Text>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="fill remarks"
          style={tailwind.style(
            'border-b border-b-gray-400 text-right py-4 px-2 items-end',
          )}
          keyboardType="numeric"
          onChangeText={e => {
            setDetail({
              ...detail,
              remarks: e,
            });
          }}
        />
      </View>
      <View style={tailwind.style('flex-row justify-end')}>
        <TouchableOpacity
          onPress={() => {
            dispatch(addDetails(detail));
            navigation.navigate('request');
          }}
          style={tailwind.style(
            'bg-blue-500 py-2 px-6 rounded-full mt-4 mr-2',
          )}>
          <Text style={tailwind.style('text-white font-semibold text-center')}>
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('request');
          }}
          style={tailwind.style('bg-blue-400 py-2 px-6 rounded-full mt-4')}>
          <Text style={tailwind.style('text-white font-semibold text-center')}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CashDetail;
