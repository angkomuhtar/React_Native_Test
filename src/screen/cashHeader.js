import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from 'twrnc';
import Select from '../components/select';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {addHeader} from '../reducer/cashSlice';
import {useNavigation} from '@react-navigation/native';

const CashHeader = () => {
  const [header, setHeader] = useState({
    activity: '',
    reason: '',
    destination: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
  });
  const activity = ['Meeting', 'Survey', 'Other'];
  const destination = ['Surabaya', 'Jakarta', 'Bali'];
  const [openSD, setOpenSD] = useState(false);
  const [openED, setOpenED] = useState(false);
  const [openST, setOpenST] = useState(false);
  const [openET, setOpenET] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeDiff, setTimeDiff] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (
      header.start_date != '' &&
      header.end_date != '' &&
      header.start_time != '' &&
      header.end_time != ''
    ) {
      let minutes = moment(
        header.end_date + ' ' + header.end_time,
        'DD/MM/YYYY HH:mm',
      ).diff(
        moment(header.start_date + ' ' + header.start_time, 'DD/MM/YYYY HH:mm'),
        'minutes',
      );
      let day = minutes / 1440;
      let hours = (minutes % 1440) / 60;
      setTimeDiff({d: day, h: hours});
    }
  }, [startDate, endDate, startTime, endTime]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tailwind`flex-1 px-5 py-3 h-96`}>
      <Select
        onSelected={e => {
          setHeader({
            ...header,
            activity: e,
          });
        }}
        placeholder="Select Activity type ..."
        label="Activity"
        data={activity}
        selected={header.activity}
      />
      <View style={tailwind`relative my-2`}>
        <Text style={tailwind`text-black font-semibold`}>Reason</Text>
        <TextInput
          placeholder="Fill Reason"
          style={tailwind.style(
            'border-b border-b-gray-400 text-right py-4 px-2 ',
          )}
          onChangeText={e => {
            setHeader({
              ...header,
              reason: e,
            });
          }}
        />
      </View>
      <Select
        onSelected={e => {
          setHeader({
            ...header,
            destination: e,
          });
        }}
        placeholder="Select Destination ..."
        label="Destination"
        data={destination}
        selected={header.destination}
      />
      <View style={tailwind`relative my-2`}>
        <Text style={tailwind`text-black font-semibold`}>Date and Time</Text>
        <View style={tailwind.style('flex-row items-center mt-4')}>
          <TouchableOpacity
            onPress={() => setOpenSD(true)}
            style={tailwind.style(
              'border-b-gray-400 border-b flex-1 flex-row items-center px-2 py-3',
            )}>
            <Text style={tailwind.style('flex-1 text-center')}>
              {header.start_date}
            </Text>
            <Icon name="calendar-outline" size={24} />
          </TouchableOpacity>

          <Text style={tailwind.style('mx-2 font-bold text-black')}>To</Text>
          <TouchableOpacity
            onPress={() => setOpenED(true)}
            style={tailwind.style(
              'border-b-gray-400 border-b flex-1 flex-row items-center px-2 py-3',
            )}>
            <Text style={tailwind.style('flex-1 text-center')}>
              {header.end_date}
            </Text>
            <Icon name="calendar-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View style={tailwind.style('flex-row items-center mt-4')}>
          <TouchableOpacity
            onPress={() => setOpenST(true)}
            style={tailwind.style(
              'border-b-gray-400 border-b flex-1 flex-row items-center px-2 py-3',
            )}>
            <Text style={tailwind.style('flex-1 text-center')}>
              {header.start_time}
            </Text>
            <Icon name="alarm" size={24} />
          </TouchableOpacity>
          <Text style={tailwind.style('mx-2 font-bold text-black')}>To</Text>
          <TouchableOpacity
            onPress={() => setOpenET(true)}
            style={tailwind.style(
              'border-b-gray-400 border-b flex-1 flex-row items-center px-2 py-3',
            )}>
            <Text style={tailwind.style('flex-1 text-center')}>
              {header.end_time}
            </Text>
            <Icon name="alarm" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {timeDiff != '' && (
        <Text
          style={{
            textAlign: 'right',
            fontWeight: 'bold',
            color: '#000',
            marginVertical: 8,
          }}>
          Durations {Math.round(timeDiff.d)} Days {Math.round(timeDiff.h)} Hours
        </Text>
      )}

      <TouchableOpacity
        onPress={() => {
          dispatch(addHeader(header));
          navigation.navigate('request');
        }}
        style={tailwind.style('bg-blue-500 py-3 rounded-full mt-4')}>
        <Text style={tailwind.style('text-white font-semibold text-center')}>
          Continue to select Transport
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={openSD}
        date={startDate}
        onConfirm={date => {
          setOpenSD(false);
          setHeader({
            ...header,
            start_date: moment(date).format('DD/MM/YYYY'),
          });
          setStartDate(date);
        }}
        onCancel={() => {
          setOpenSD(false);
        }}
      />
      <DatePicker
        modal
        mode="date"
        open={openED}
        date={endDate}
        onConfirm={date => {
          setOpenED(false);
          setHeader({
            ...header,
            end_date: moment(date).format('DD/MM/YYYY'),
          });
          setEndDate(date);
        }}
        onCancel={() => {
          setOpenED(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        open={openET}
        date={endTime}
        onConfirm={date => {
          setOpenET(false);
          setHeader({
            ...header,
            end_time: moment(date).format('HH:mm'),
          });
          setEndTime(date);
        }}
        onCancel={() => {
          setOpenET(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        open={openST}
        date={startTime}
        onConfirm={date => {
          setOpenST(false);
          setHeader({
            ...header,
            start_time: moment(date).format('HH:mm'),
          });
          setStartTime(date);
        }}
        onCancel={() => {
          setOpenST(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default CashHeader;
