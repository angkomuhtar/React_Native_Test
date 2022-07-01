import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {delDetails} from '../reducer/cashSlice';
import DetailList from '../components/detailList';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import _ from 'lodash';

const CashRequest = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState(false);
  const [docs, setDocs] = useState([]);
  const {header, details, totalcash} = useSelector(state => state.cash);
  const [err, setErr] = useState({
    header: false,
    details: false,
    file: false,
    notes: false,
  });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setErr({
      header: false,
      details: false,
      file: false,
      notes: false,
      dosc: false,
    });
  }, [header, details, agreement, notes, docs]);

  const showToastWithGravity = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const cameraOpen = async () => {
    const opt = {
      mediaType: 'photo',
      quality: 1,
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(opt, res => {
          if (res.didCancel) {
            console.warn('cancel Camera');
          } else if (res.errorCode) {
            console.warn(res.errorMessage);
          } else {
            setDocs([
              ...docs,
              {
                id: Math.floor(Math.random() * 10),
                name: res.assets[0].fileName,
                size: res.assets[0].fileSize,
                type: res.assets[0].type,
                uri: res.assets[0].uri,
              },
            ]);
            refRBSheet.current.close();
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickGallery = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf, DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      if (pickerResult.size > 10485760) {
        showToastWithGravity('File Maks. 10 MB');
      } else {
        setDocs([
          ...docs,
          {
            id: Math.floor(Math.random() * 10),
            name: pickerResult.name,
            size: pickerResult.size,
            type: pickerResult.type,
            uri: pickerResult.fileCopyUri,
          },
        ]);
      }
    } catch (e) {
      handleError(e);
    } finally {
      refRBSheet.current.close();
    }
  };

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      refRBSheet.current.close();
    } else if (isInProgress(err)) {
      refRBSheet.current.close();
    } else {
      throw err;
    }
  };

  const handleSubmit = () => {
    if (!agreement) {
      showToastWithGravity('Centang Aggrement');
    } else if (
      header.destination == '' ||
      header.datestart == '' ||
      header.dateend == ''
    ) {
      setErr({
        ...err,
        header: true,
      });
    } else if (details.length == 0) {
      setErr({
        ...err,
        details: true,
      });
    } else if (docs.length == 0) {
      setErr({
        ...err,
        docs: true,
      });
    } else if (notes == '') {
      setErr({
        ...err,
        notes: true,
      });
    } else {
      showToastWithGravity('All Done, Thanks');
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{paddingVertical: 16}}>
          <View style={tailwind`p-6 bg-sky-600 rounded-xl`}>
            <View style={tailwind`flex flex-row justify-between`}>
              <Text style={tailwind`text-white text-2xl font-semibold`}>
                {header.activity}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('header');
                }}>
                <Text style={tailwind`text-white text-lg font-light`}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tailwind`py-2`}>
              <Text
                style={tailwind`text-white text-xl font-semibold leading-snug`}>
                {header.destination == '' ? '-' : header.destination}
              </Text>
              <View style={tailwind`flex-row`}>
                <Text style={tailwind`text-white font-semibold w-1/6`}>
                  Date
                </Text>
                <Text style={tailwind`text-white font-semibold`}>
                  {header.datestart == ''
                    ? '-'
                    : moment(header.datestart).format('DD MMM YYYY')}
                </Text>
              </View>

              <View style={tailwind`flex-row`}>
                <Text style={tailwind`text-white font-semibold w-1/6`}>To</Text>
                <Text style={tailwind`text-white font-semibold`}>
                  {header.dateend == ''
                    ? '-'
                    : moment(header.dateend).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
          {err.header && <Text style={{color: 'red'}}>Header required</Text>}

          <View style={tailwind`flex-row justify-between mt-3`}>
            <Text style={tailwind`text-gray-400 font-bold text-lg uppercase`}>
              cash detail
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('detail');
              }}>
              <Text
                style={tailwind`text-gray-400 font-medium text-lg capitalize`}>
                Add Cash
              </Text>
            </TouchableOpacity>
          </View>
          {err.details && <Text style={{color: 'red'}}>Field required</Text>}
          {details.map((data, key) => (
            <DetailList
              key={key}
              data={data}
              onDelete={() => dispatch(delDetails(data.id))}
            />
          ))}

          <View style={tailwind`flex-row justify-between my-4`}>
            <Text style={tailwind`font-bold text-lg text-black`}>
              Total Cash
            </Text>
            <Text style={tailwind`font-semibold text-lg text-black`}>
              {totalcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} IDR
            </Text>
          </View>

          <View style={tailwind`flex-row justify-between my-4`}>
            <Text style={tailwind`font-bold text-lg text-black`}>
              Attach File
            </Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Text style={tailwind`font-semibold text-lg text-gray-500`}>
                Add File
              </Text>
            </TouchableOpacity>
          </View>
          {err.docs && <Text style={{color: 'red'}}>File required</Text>}
          <View style={tailwind.style('py-4')}>
            {docs.map((data, key) => (
              <View key={key} style={tailwind`flex-row justify-between my-1`}>
                <Text style={tailwind.style('w-10/12')}> {data.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    let datadosc = docs;
                    let datanew = _.reject(datadosc, function (o) {
                      return !o.id != data.id;
                    });
                    setDocs(datanew);
                  }}>
                  <Icon
                    name="remove-circle"
                    size={24}
                    style={tailwind`text-red-500`}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TextInput
            multiline
            placeholder="Leave a Notes"
            numberOfLines={4}
            style={tailwind`px-4 border border-gray-600 rounded-md`}
            onChangeText={e => {
              setNotes(e);
            }}
          />
          {err.notes && <Text style={{color: 'red'}}>Notes required</Text>}

          <View style={tailwind.style('flex-row my-4')}>
            <TouchableOpacity
              onPress={() => setAgreement(!agreement)}
              style={tailwind`border border-black self-start rounded-[4px] p-[2px] mr-3`}>
              <View
                style={tailwind.style(
                  'h-4 w-4 rounded-[4px]',
                  agreement && 'bg-blue-500',
                )}
              />
            </TouchableOpacity>
            <Text style={{color: '#000'}}>Agreement</Text>
          </View>
          <View style={tailwind.style('flex-row my-4 py-3')}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={tailwind`rounded-full bg-blue-500 flex-1 py-3`}>
              <Text
                style={tailwind.style('text-white font-semibold text-center')}>
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showToastWithGravity('Maaf')}
              style={tailwind`rounded-full border border-red-500 flex-1 py-3`}>
              <Text
                style={tailwind.style(
                  'text-red-500 font-semibold text-center',
                )}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <RBSheet
            ref={refRBSheet}
            height={150}
            openDuration={150}
            customStyles={{
              container: {
                paddingVertical: 12,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: 'center',
              },
            }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Upload File</Text>
            <View style={tailwind`flex-row my-4`}>
              <TouchableOpacity
                onPress={cameraOpen}
                style={tailwind`items-center p-2 mx-2`}>
                <Icon name="camera" size={40} />
                <Text>Take A Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  pickGallery();
                }}
                style={tailwind`items-center p-2 mx-2`}>
                <Icon name="folder" size={40} />
                <Text>Browse File</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CashRequest;
