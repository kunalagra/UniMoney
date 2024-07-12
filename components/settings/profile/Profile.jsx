import React, { useCallback, useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, images } from '../../../constants';
import styles from './profile.style';
import { Icon, Input } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_BACKEND_URL, REACT_APP_IMAGE_KEY } from '@env';
import { setImage, setUsername, setEmail } from '../../../store/profilecreation';

const Profile = (props) => {

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const { ArrowleftIcon, Loader } = icons;
  const { username: user_name, email: user_email, image } = useSelector(state => state.profilecreation);
  const [updating, setUpdating] = useState(false);
  const [username, setLocalUsername] = useState(user_name || '');
  const [email, setLocalEmail] = useState(user_email || '');
  const [imageData, setImageData] = useState('');
  const [imageUri, setImageUri] = useState(image || '');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleUpdate = async () => {
    if (username === '') {
      ToastAndroid.show('Username should contain atleast 3 characters', 3);
    } else if (email === '') {
      ToastAndroid.show('Email should not be empty', 3);
    } else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)) {
      ToastAndroid.show('Invalid email!!', 3);
    } else {
      setUpdating(true);
      if (imageData === '') {
        const option = {
          method: 'PUT',
          url: `${REACT_APP_BACKEND_URL}/auth/profile`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
          },
          data: {
            username: username,
            email: email,
          }
        }
        try {
          const res = await axios.request(option);
          dispatch(setUsername(username));
          dispatch(setEmail(email));
        }
        catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          setUpdating(false);
          ToastAndroid.show('Details updated successfully!!', 3);
        }, 1000);
      }
      else {
        const formData = new FormData();
        formData.append('key', REACT_APP_IMAGE_KEY)
        formData.append('image', imageData);
        try {
          const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }).then(async (response) => {
            // console.log(response.data.data.url);
            dispatch(setImage(response.data.data.url));
            const option = {
              method: 'PUT',
              url: `${REACT_APP_BACKEND_URL}/auth/profile`,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
              },
              data: {
                username: username,
                email: email,
                image: response.data.data.url,
              }
            }
            console.log({
              username: username,
              email: email,
              image: response.data.data.url,
            });
            try {
              const res = await axios.request(option);
              dispatch(setUsername(username));
              dispatch(setEmail(email));
            }
            catch (error) {
              console.log(error);
            }
          });
        }
        catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          setUpdating(false);
          ToastAndroid.show('Details updated successfully!!', 3);
        }, 2000);
      }
    }
  }


  const chooseImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      saveToPhotos: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else {
        setImageData(response.assets[0].base64);
        setImageUri(response.assets[0].uri);
        ToastAndroid.show('Profile picture updated successfully!!', 3);
      }
    });
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white2, flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white2} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
        }
      >
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => props.navigation.pop()}
            >
              <ArrowleftIcon
                style={styles.arrowleftIcon}
                fill={COLORS.gray3}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.navHeader}>
                Profile
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <TouchableOpacity
              style={{ position: 'relative', width: 200, height: 200, borderRadius: 100, backgroundColor: COLORS.white3, borderWidth: 5, borderColor: COLORS.white4, marginBottom: 20, padding: 4 }}
              activeOpacity={0.5}
              onPress={chooseImage}
            >
              <Image
                source={imageUri ? { uri: imageUri } : images.profileicon}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }}
              />
              <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 5, backgroundColor: COLORS.white3, borderWidth: 4, borderColor: COLORS.white4, padding: 4, borderRadius: 100 }} onPress={chooseImage}>
                <Icon name={"photo-camera"} color={COLORS.gray1} size={24} onPress={chooseImage} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Input
              containerStyle={styles.inputOuterContainerStyle}
              inputContainerStyle={styles.inputInnerContainerStyle}
              style={styles.input}
              placeholder='Username'
              value={username}
              onChangeText={(e) => setLocalUsername(e)}
              underlineColorAndroid="transparent"
              selectionColor={COLORS.main4}
              placeholderTextColor={COLORS.gray2}
              leftIcon={<Icon name={"account-circle"} color={COLORS.gray1} size={24} onPress={() => { }} />}
              leftIconContainerStyle={{ paddingLeft: 15 }}
            />
            <Input
              containerStyle={styles.inputOuterContainerStyle}
              inputContainerStyle={styles.inputInnerContainerStyle}
              style={styles.input}
              placeholder='Email address'
              value={email}
              onChangeText={(e) => setLocalEmail(e)}
              underlineColorAndroid="transparent"
              selectionColor={COLORS.main4}
              placeholderTextColor={COLORS.gray2}
              leftIcon={<Icon name={"email"} color={COLORS.gray1} size={24} onPress={() => { }} />}
              leftIconContainerStyle={{ paddingLeft: 15 }}
            />
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={handleUpdate}
              activeOpacity={0.7}
              disabled={updating}

            >
              {updating ? (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                  <Loader height={20} width={20}></Loader>
                  <Text style={styles.updateText}>
                    Updating...
                  </Text>
                </View>
              ) : (
                <Text style={styles.updateText}>
                  Update
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
