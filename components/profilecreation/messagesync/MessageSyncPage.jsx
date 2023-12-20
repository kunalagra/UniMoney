import { View, SafeAreaView, StatusBar, Image, PermissionsAndroid } from 'react-native';
import styles from './messagesyncpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';

const MessageSyncPage = (props) => {

    const [isGranted, setIsGranted] = useState(false);
    
    const requestReadSmsPermission = async () => {
        try {
            const res = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: "Unimoney",
                    message: "Allow us to read SMS messages"
                }
            );  
            setIsGranted(res === PermissionsAndroid.RESULTS.GRANTED);
          } catch (err) {
            // console.log(err.message);
          }
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Synchronize'}
                        title2={'Allow us to read SMS messages'}
                        progress={'33%'}
                        currentPageNum={4}
                    />

                    <View style={styles.midContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={images.smssync}
                                style={styles.image}
                            />
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title={"Continue"}
                                handlePress={() => {
                                    if (isGranted)
                                        props.navigation.navigate('TransactionSyncPage');
                                    else { 
                                        requestReadSmsPermission();
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MessageSyncPage;