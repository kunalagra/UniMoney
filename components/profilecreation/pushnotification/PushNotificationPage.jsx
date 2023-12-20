import {Text, View, SafeAreaView, StatusBar, Switch, PermissionsAndroid } from 'react-native';
import styles from './pushnotificationpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import { pushNotificationOptions } from '../../../utils';

const PushOption = ({ title, description, index, setIsPushed, isPushed }) => {
    
    return (
        <View style={styles.optionContainer}>
            <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDesc}>{description}</Text>
            </View>
            <View>
            <Switch
                trackColor={{false: COLORS.gray1, true: COLORS.main4}}
                thumbColor={isPushed[index] ? COLORS.main3 : COLORS.white4}
                onValueChange={() => {
                    const tmp = [...isPushed];
                    tmp[index] = !isPushed[index];
                    setIsPushed([...tmp]);
                }}
                value={isPushed[index]}
            />
            </View>
        </View>
    )
}


const PushNotificationPage = (props) => {

    const [isGranted, setIsGranted] = useState(false);
    const [isPushed, setIsPushed] = useState([false, false, false]);

    const requestPostNudgePermission = async () => {
        try {
            const permCheck = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (permCheck===PermissionsAndroid.RESULTS.GRANTED) {
                setIsGranted(true);
            } else {
                const permReq = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    {
                        title: "Unimoney",
                        message: "Allow us to push notifications"
                    }
                );  
                setIsGranted(permReq === PermissionsAndroid.RESULTS.GRANTED);
            }
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
                        title2={"You're almost done!"}
                        progress={'100%'}
                        currentPageNum={4}
                    />

                    <View style={styles.midContainer}>
                        <View>
                            <Text style={styles.heading}>
                                Push or not to push - you choose!
                            </Text>
                        </View>
                        <View style={styles.pushOptionsContainer}>
                            {pushNotificationOptions.map((item, index) => (
                                <PushOption 
                                    key={index}
                                    index={index}
                                    title={item.title}
                                    description={item.desc}
                                    setIsPushed={setIsPushed}
                                    isPushed={isPushed}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonsContainer}>
                            <CustomButton
                                title={'Continue'}
                                handlePress={() => {
                                    if (isGranted || isPushed.filter(p => p===true).length===0)
                                        props.navigation.navigate('SettingUpPage')
                                    else 
                                        requestPostNudgePermission()
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PushNotificationPage;