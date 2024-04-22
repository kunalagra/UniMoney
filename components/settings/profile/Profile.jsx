import React, { useCallback, useState } from 'react';
import {Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import { COLORS, icons, images } from '../../../constants';
import styles from './profile.style';
import { Icon, Input } from '@rneui/themed';

const Profile = (props) => {

  const [refreshing, setRefreshing] = useState(false);
  const { ArrowleftIcon, Loader } = icons;
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleUpdate = () => {
    if (username==='') {
      ToastAndroid.show('Username should contain atleast 3 characters', 3);
    } else if (email==='') {
      ToastAndroid.show('Email should not be empty', 3);
    } else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)) {
      ToastAndroid.show('Invalid email!!', 3);
    } else {
      setUpdating(true);
      setTimeout(() => {
        setUpdating(false);
        ToastAndroid.show('Details updated successfully!!', 3);
      }, 2000);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white2, flex: 1}}>
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
            <View style={{ position: 'relative', width: 200, height: 200, borderRadius: 100, backgroundColor: COLORS.white3, borderWidth: 5, borderColor: COLORS.white4, marginBottom: 20, padding: 4 }}>
                <Image
                  source={images.category}
                  style={{ width: '100%', height: '100%' }}
                />
                <View style={{ position: 'absolute', right: 20, bottom: 5, backgroundColor: COLORS.white3, borderWidth: 4, borderColor: COLORS.white4, padding: 4, borderRadius: 100 }}>
                  <Icon name={"photo-camera"} color={COLORS.gray1} size={24} onPress={() => {}} />
                </View>
            </View>
            <Input
                containerStyle={styles.inputOuterContainerStyle}
                inputContainerStyle={styles.inputInnerContainerStyle}
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={(e) => setUsername(e)}
                underlineColorAndroid="transparent"
                selectionColor={COLORS.gray2}
                placeholderTextColor={COLORS.gray2}
                leftIcon={<Icon name={"account-circle"} color={COLORS.gray1} size={24} onPress={() => {}} />}
                leftIconContainerStyle={{ paddingLeft: 15 }}
            />
            <Input
                containerStyle={styles.inputOuterContainerStyle}
                inputContainerStyle={styles.inputInnerContainerStyle}
                style={styles.input}
                placeholder='Email address'
                value={email}
                onChangeText={(e) => setEmail(e)}
                underlineColorAndroid="transparent"
                selectionColor={COLORS.gray2}
                placeholderTextColor={COLORS.gray2}
                leftIcon={<Icon name={"email"} color={COLORS.gray1} size={24} onPress={() => {}} />}
                leftIconContainerStyle={{ paddingLeft: 15 }}
            />
            <TouchableOpacity
                style={styles.updateBtn}
                onPress={handleUpdate}
                activeOpacity={0.7}
                disabled={updating}
                
            >
                { updating ? (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:10}}>
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
