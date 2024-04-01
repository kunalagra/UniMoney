import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, images } from '../../../constants'
import ExpenseCard from '../common/cards/expense/ExpenseCard';
import StreakBanner from './streakbanner/StreakBanner';
// import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import styles from './homepage.style';
import { Dialog, Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setUsername, setEmail } from '../../../store/profilecreation';
import { useDispatch } from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';

const ChatModal = ({ visible, setVisibility }) => {

    const messagesA = ['Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!'];
    const messagesB = ['Hey, Jonhhy!', 'How can I help you?'];

    return (
        <Dialog
            isVisible={visible}
            onDismiss={() => setVisibility(false)}
            onBackdropPress={() => setVisibility(false)}
            overlayStyle={styles.chatModal}
        >
            <View style={styles.chatModalHeader}>
                <View style={styles.chatModalHeadingContainer}>
                    <Text style={styles.chatModalHeading}>
                        Wanna chat?
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => setVisibility(false)}
                >
                    <Image
                        source={images.closeicon}
                        style={styles.chatModalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.chatContainer}>
                <ScrollView
                >
                    {messagesA.map((item, index) => (
                        <View
                            style={styles.userMessage}
                            key={index}
                        >
                            <Text style={styles.chatMessageText}>
                                {item}
                            </Text>
                        </View>
                    ))}
                    {messagesB.map((item, index) => (
                        <View
                            style={styles.chatbotMessage}
                            key={index}
                        >
                            <Text style={styles.chatMessageText}>
                                {item}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.userInputContainer}>
                <Input
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={styles.inputInnerContainer}
                    style={styles.inputStyle}
                    placeholder="Wanna say something..."
                    underlineColorAndroid="transparent"
                    selectionColor={COLORS.gray3}
                    placeholderTextColor={COLORS.gray3}
                    numberOfLines={1}
                />
                <TouchableOpacity
                    style={styles.inputSendButton}
                >
                    <Image
                        source={images.sendicon}
                        style={styles.inputSendIcon}
                    />
                </TouchableOpacity>
            </View>
        </Dialog>
    )
}

const HomePage = ({ navigateTo }) => {

    const dispatch = useDispatch();

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

    const [transactionsData, setTransactionsData] = useState([]);

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
                minDate: date.getTime() - 1000 * 60 * 60 * 24 * 90

            }),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                const parsedSmsList = JSON.parse(smsList);

                const bankMessages = parsedSmsList.filter((sms) => {
                    return bankKeywordsRegex.test(sms.body);
                });

                // const oldMessages = bankMessages.filter((sms) => {
                //     return new Date(sms.date) > date;
                // });

                bankMessages.forEach((transaction) => {
                    const amount = amountRegex.exec(transaction.body);
                    const amountValue = amount ? parseFloat(amount[1].replace(/,/g, '')) : null;
                    const type = isCredited(transaction.body) ? 'credit' : 'debit';
                    const name = transaction.address
                    const date = formatDateTime(transaction.date);
                    console.log({ name, amountValue, type, date });
                    if (amountValue && amountValue > 0) {
                        setTransactionsData((prevData) => {
                            return [
                                ...prevData,
                                {
                                    name: name ? name : 'Unknown',
                                    image: name.includes('BNK') ? images.bank : images.payments,
                                    time: date,
                                    amount: amountValue ? amountValue : 0,
                                    isExpense: type === 'debit' ? true : false
                                }
                            ]
                        });
                    }
                });
            }
        );
    };
    

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://unimoney-backend.onrender.com/auth/profile',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                }
            };
            try {
                const response = await axios.request(options);
                dispatch(setUsername(response.data.user.username));
                dispatch(setEmail(response.data.user.email));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        getBankMessages();
    }, [])

    const data = [
        {
            mode: 'Daily',
            expense: 523,
            income: 179
        },
        {
            mode: 'Monthly',
            expense: 32300,
            income: 47900
        },
        {
            mode: 'Yearly',
            expense: 830000,
            income: 1200523
        },
    ];

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            <View style={styles.container}>

                {
                    !isChatModalOpen &&
                    <View
                        style={styles.chatButtonContainer}
                    >
                        <TouchableOpacity
                            style={styles.chatButton}
                            activeOpacity={0.85}
                            onPress={() => setIsChatModalOpen(true)}
                        >
                            <Image
                                source={images.chaticon}
                                style={styles.chatIcon}
                            />
                        </TouchableOpacity>
                    </View>
                }

                <ChatModal visible={isChatModalOpen} setVisibility={setIsChatModalOpen} />

                <ScrollView>

                    <View style={styles.mainContainer}>
                        <View style={styles.navbar}>
                            <TouchableOpacity
                                onPress={() => navigateTo('BillsPage')}
                            >
                                <Image
                                    source={images.alarm_fill}
                                    style={styles.navIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigateTo('SettingsPage')}
                            >
                                <Image
                                    source={images.profileicon}
                                    style={styles.navIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>
                                Hey, John!
                            </Text>
                        </View>

                        <StreakBanner />

                        <View style={styles.expenseCardsContainer}>
                            <ScrollView
                                contentContainerStyle={styles.expenseCardsList}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            >
                                {data.map((item, index) => (
                                    <ExpenseCard item={item} key={index} />
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.recentTransactionsContainer}>
                            <View style={styles.transactionsHeadingContainer}>
                                <Text style={styles.transactionsHeading}>
                                    Recent Transactions
                                </Text>
                                <TouchableOpacity>
                                    <Text style={styles.showAllText}>
                                        Show all
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.transactionsContainer}>
                                {transactionsData.map((item, index) => (
                                    <TransactionCard
                                        key={index}
                                        name={item.name}
                                        image={item.image}
                                        description={item.time}
                                        amount={item.amount}
                                        isExpense={item.isExpense}
                                        navigateTo={navigateTo}
                                    />
                                ))}
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}


export default HomePage

