import { View, SafeAreaView, StatusBar, Text, Image, Alert } from 'react-native';
import styles from './settinguppage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import axios from 'axios';
import SmsAndroid from 'react-native-get-sms-android';
import { getTransactionInfo } from 'transaction-sms-parser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_BACKEND_URL } from "@env";

let i = 0;
const SettingUpPage = () => {

    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('Preparing data');
    const progressList = [0.05, 0.15, 0.28, 0.47, 0.65, 0.89, 0.98, 1];
    const titlesList = [
        'Storing user info',
        'Storing user info',
        'Setting goals',
        'Setting goals',
        'Syncing all the messages',
        'Syncing all the messages',
        'Creating profile',
        'Creating profile'
    ];
    const navigation = useNavigation();
    const { username, email, password, ageGroup, gender, goals, goalsProgress, categories, categoriesLimits } = useSelector(state => state.profilecreation);


    const getBankMessages = async () => {
        // Example amount: Rs. 1,000.00 , Rs 7,38,373.267
        // get complete amount till the decimal point
        const amountRegex = /(?:Rs\.|Rs|INR|₹)\s?(\d+(?:,\d+)*(?:\.\d+)?)/i;
        const isCredited = (str) => {
            return /(?:credited|received|deposited|has sent)/i.test(str);
        };
        const bankKeywordsRegex = /(credited|debited|payment|withdraw|received|sent)/i;
        const spamKeywordsRegex = /(Congratulations|won|win|prize|lucky|offer|discount|sale|reward|requested money|RAZORPAY|PAYPAL)/i;

        console.log('Permission granted');
        const date = new Date();
        date.setMonth(date.getMonth() - 1);

        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 1000, // Increase maxCount to retrieve more messages
                // minDate: date.getTime() - 1000 * 60 * 60 * 24 * 30

            }),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                const parsedSmsList = JSON.parse(smsList);
                // console.log(parsedSmsList);
                let smsdata = [];
                parsedSmsList.filter((transaction) => {
                    const valid = bankKeywordsRegex.test(transaction.body);
                    const spam = spamKeywordsRegex.test(transaction.body);
                    if (valid && !spam) {
                        // console.log(transaction);
                        // const amount = amountRegex.exec(transaction.body);
                        // const amountValue = amount ? parseFloat(amount[1].replace(/,/g, '')) : null;
                    const transactionInfo = getTransactionInfo(transaction.body);
                    const type = isCredited(transaction.body) ? 'credit' : 'debit';
                    const name = transactionInfo.transaction.merchant ? transactionInfo.transaction.merchant : transactionInfo.transaction.detail ? transactionInfo.transaction.detail : transaction.address;
                    // const date = formatDateTime(transaction.date);
                    const amountValue = transactionInfo.transaction.amount;
                    const accNumber = transactionInfo.account.number;
                    const txid = transactionInfo.transaction.referenceNo;
                    if (amountValue && amountValue > 0 && !transaction.address.includes('+91') && transactionInfo.account.type){
                        smsdata.push(
                                {
                                    amount: amountValue ? parseFloat(amountValue) : 0,
                                    acc : accNumber ? accNumber : 0,
                                    date: transaction.date,
                                    name: name ? name : 'Unknown',
                                    // image: name.includes('BNK') ? images.bank : images.payments,
                                    type: type,
                                    txid: txid ? txid : 0,
                                    category: name.includes('BNK') ? 'Transfers':'Payments',
                                }
                        );
                    }
                    }
                    return valid;
                });

                const messages = smsdata.filter((sms, index, self) =>
                    index === self.findIndex((t) => (
                        (t.txid!==0 && sms.txid!==0 && t.txid === sms.txid) && t.amount === sms.amount && t.type === sms.type
                    ))
                );

                // console.log(messages);
                userRegistration(messages);
            }
        );
    }


    const userRegistration = async (transactiondata) => {
        // console.log({
        //     username: username,
        //     email: email,
        //     password: password,
        //     userInfo : {
        //         age: ageGroup,
        //         gender: gender,
        //         goals: goals,
        //         goalsProgress: goalsProgress,
        //         categoriesLimits: categoriesLimits
        //     },
        //     transaction: transactiondata,
        // });

        const options = {
            method: 'POST',
            url: `${REACT_APP_BACKEND_URL}/auth/register`,
            data : {
                username: username,
                email: email,
                password: password,
                userInfo : {
                    age: ageGroup,
                    gender: gender,
                    goals: goals,
                    goalsProgress: goalsProgress,
                    categoriesLimits: categoriesLimits
                },
                transaction: transactiondata,
            }
        }

        try {
            const response = await axios.request(options);
            setProgress(0.98);
            setTitle('Creating profile');
            if (response.status === 201) {
                const options = {
                    method: 'POST',
                    url: `${REACT_APP_BACKEND_URL}/auth/login`,
                    data: {
                        email: email,
                        password: password
                    }
                };
                try {
                    const response = await axios.request(options);
                    if (response.status === 200) {
                        setProgress(1);
                        // console.log(response.data.token);
                        AsyncStorage.setItem('token', response.data.token);
                        setTimeout(() => {
                            navigation.navigate('Main');
                        }, 1000);
                    }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 401) {
                        alert('Invalid email or password');
                    }
                }

            }
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Error",
                "Something went wrong. Please try again later.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignUp' }],
                        }),
                        style: "cancel"
                    }
                ]
            );
        }

    };


    useEffect( () => {

        const interval = setInterval( async () => {
            if (progress===0.89) {
                clearInterval(interval);
                try { 
                    await getBankMessages();
                }
                catch (e) {
                    console.log(e);
                }
            }else {
                setTitle(titlesList[i]);
                setProgress(progressList[i]);
                i++;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [progress]);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={''}
                        title2={''}
                        progress={0}
                        currentPageNum={'★'}
                        last={true}
                    />

                    <View style={styles.midContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.heading}>
                                We are crafting your
                            </Text>
                            <Text style={[ styles.heading, styles.heading2 ]}>
                                saving experience...
                            </Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressTextContainer}>
                                    <Text style={styles.progressText}>
                                        {title}
                                    </Text>
                                    <Text style={styles.progressPercentage}>
                                        {Math.floor(progress * 100)}%
                                    </Text>
                                </View>
                                <View style={styles.progressBlock}>
                                    <View style={styles.currentProgress(progress)} />
                                </View>
                                <View style={styles.progressTextContainer}>
                                    <Text style={styles.progressText}>
                                        {progress>=0.89? 'Stay online!! It may take up to two minutes...' : ''}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.imageBlock}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={images.saving_in_wallet}
                                        style={styles.image}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingUpPage;