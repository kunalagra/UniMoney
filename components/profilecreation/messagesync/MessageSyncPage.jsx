import { View, SafeAreaView, StatusBar, Image, PermissionsAndroid, Linking } from 'react-native';
import styles from './messagesyncpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import SmsAndroid from 'react-native-get-sms-android';
import { getTransactionInfo } from 'transaction-sms-parser';

const MessageSyncPage = (props) => {

    const [isGranted, setIsGranted] = useState(false);

    const requestReadSmsPermission = async () => {
        try {
            const permCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);
            if (permCheck === PermissionsAndroid.RESULTS.GRANTED) {
                setIsGranted(true);
            } else {
                const permReq = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_SMS,
                    {
                        title: "Unimoney",
                        message: "Allow us to read SMS messages"
                    }
                );
                if (permReq === PermissionsAndroid.RESULTS.GRANTED) {
                    setIsGranted(true);
                } else {
                    Linking.openSettings();
                }
            }
        } catch (err) {
            // console.log(err.message);
        }
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // give time in 12 hour format
        const time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`;
        const dayStr = day < 10 ? `0${day}` : day;

        return `${dayStr} ${months[month]} ${year} ${time}`;
    }


    const getBankMessages = async () => {
        const amountRegex = /(?:Rs\.?|INR|₹)\s?(\d+(?:,\d{3})*(?:\.\d{2})?)/;

        const isCredited = (str) => {
            return /(?:credited|received|deposited|sent)/i.test(str);
        };
        const nameRegex = /(?:from|to)\s(.+?)\s(.+?)/i;
        const bankKeywordsRegex = /(credited|debited|payment|withdraw|settlement|received|sent)/i;

        console.log('Permission granted');

        const date = new Date();
        date.setMonth(date.getMonth() - 1);

        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 100, // Increase maxCount to retrieve more messages
            }),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                const parsedSmsList = JSON.parse(smsList);

                const bankMessages = parsedSmsList.filter((sms) => {
                    return bankKeywordsRegex.test(sms.body);
                });

                const oldMessages = bankMessages.filter((sms) => {
                    return new Date(sms.date) > date;
                });

                oldMessages.forEach((transaction) => {
                    const amount = amountRegex.exec(transaction.body);
                    const amountValue = amount ? parseFloat(amount[1].replace(/,/g, '')) : null;
                    const type = isCredited(transaction.body) ? 'credit' : 'debit';
                    const name = transaction.address
                    const date = formatDateTime(transaction.date);

                    console.log({ amountValue, type, name, date });
                });
            }
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2 }}>
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