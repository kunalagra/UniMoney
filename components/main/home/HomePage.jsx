import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import { COLORS, images,icons } from '../../../constants'
import ExpenseCard from '../common/cards/expense/ExpenseCard';
import StreakBanner from './streakbanner/StreakBanner';
// import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import styles from './homepage.style';
import { Dialog, Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setUsername, setEmail } from '../../../store/profilecreation';
import { useDispatch, useSelector } from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import { setDailyIncome, setMonthlyIncome, setYearlyIncome, setDailyExpense, setMonthlyExpense, setYearlyExpense, setAllTransactions } from '../../../store/transactiondata';
import { getTransactionInfo } from 'transaction-sms-parser';
import { formatDateTime } from '../../../utils';

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
    const [loading, setLoading] = useState(true);

    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTransactions();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

    const [transactionsData, setTransactionsData] = useState([]);
    const [name, setName] = useState('');

    const { dailyincome, monthlyincome, yearlyincome, dailyexpense, monthlyexpense, yearlyexpense } = useSelector(state => state.transactiondata);


    const getBankMessages = async (prevData) => {
        // Example amount: Rs. 1,000.00 , Rs 7,38,373.267
        // get complete amount till the decimal point
        const amountRegex = /(?:Rs\.|Rs|INR|₹)\s?(\d+(?:,\d+)*(?:\.\d+)?)/i;
        const isCredited = (str) => {
            return /(?:credited|received|deposited|has sent)/i.test(str);
        };
        const bankKeywordsRegex = /(credited|debited|payment|withdraw|received|sent)/i;
        const spamKeywordsRegex = /(Congratulations|won|win|prize|lucky|offer|discount|sale|reward|requested money)/i;

        console.log('Permission granted');
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        
        let smsdata = [];
        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 5, // Increase maxCount to retrieve more messages
                // minDate: date.getTime() - 1000 * 60 * 60 * 24 * 30

            }),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                const parsedSmsList = JSON.parse(smsList);
                // console.log(parsedSmsList);
                parsedSmsList.filter((transaction) => {
                    const valid = bankKeywordsRegex.test(transaction.body);
                    const spam = spamKeywordsRegex.test(transaction.body);
                    if (valid && !spam) {
                        // console.log(transaction);
                        // const amount = amountRegex.exec(transaction.body);
                        // const amountValue = amount ? parseFloat(amount[1].replace(/,/g, '')) : null;
                    const transactionInfo = getTransactionInfo(transaction.body);
                    const type = isCredited(transaction.body) ? 'credit' : 'debit';
                    const name = transaction.address
                    const date = formatDateTime(transaction.date);
                    const amountValue = transactionInfo.transaction.amount;
                    const accNumber = transactionInfo.account.number;
                    const txid = transactionInfo.transaction.referenceNo;
                    if (amountValue && amountValue > 0 && !name.includes('+91')) {
                    // console.log(transaction.body);
                    // console.log({
                    //                 amount: amountValue ? parseFloat(amountValue) : 0,
                    //                 acc : accNumber ? accNumber : 0,
                    //                 timestamp: date,
                    //                 date: transaction.date,
                    //                 name: name ? name : 'Unknown',
                    //                 image: name.includes('BNK') ? images.bank : images.payments,
                    //                 type: type,
                    //                 txid: txid ? txid : 0,
                    //                 isExpense: type === 'debit' ? true : false,
                    //                 category: {
                    //                     name: 'ATM',
                    //                     image: images.cash_withdrawal
                    //                 }
                    //             });
                        smsdata.push(
                                {
                                    amount: amountValue ? parseFloat(amountValue) : 0,
                                    acc : accNumber ? accNumber : 0,
                                    timestamp: date,
                                    date: transaction.date,
                                    name: name ? name : 'Unknown',
                                    image: name.includes('BNK') ? images.bank : images.payments,
                                    type: type,
                                    txid: txid ? txid : 0,
                                    isExpense: type === 'debit' ? true : false,
                                    category: {
                                        name: 'ATM',
                                        image: images.cash_withdrawal
                                    }
                                }
                        );
                    }
                    }
                    return valid;
                });

                // const oldMessages = bankMessages.filter((sms) => {
                //     return new Date(sms.date) > date;
                // });
                const newtransactions = []
                // console.log(smsdata);
                // check if the sms is already present in the transactions
                // console.log(prevData);
                // console.log(smsdata);
                smsdata.forEach((sms) => {
                    const isPresent = prevData.find((transaction) => {
                        return transaction.date === sms.date && transaction.amount === sms.amount;
                    });
                    // console.log(isPresent);
                    if (!isPresent) {
                        newtransactions.push(sms);
                    }
                });
                // console.log(newtransactions);


                // dispatch(setAllTransactions(alllocaltransactions));
                // setTransactionsData(smsdata);
                // console.log(alllocaltransactions);
                // calculateDailyIncome(smsdata);
                // calculateMonthlyIncome(alllocaltransactions);
                // calculateYearlyIncome(alllocaltransactions);
                postNewTransaction(newtransactions);
                setLoading(false);
                
            }
        );
    }

    const postNewTransaction = async (transactions) => {
        const options = {
            method: 'POST',
            url: 'https://unimoney-backend.onrender.com/transaction/',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            },
            data: {
                List: transactions
            }
        };
        try {
            const response = await axios.request(options);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const calculateDailyIncome = async (transactionsData) => {
        // current day transactions
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const todayTransactions = transactionsData.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getDate() === today.getDate() && transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
        });
        const dailyIncome = todayTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc : acc + transaction.amount;
        }, 0);
        const dailyExpense = todayTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc + transaction.amount : acc;
        }, 0);
        dispatch(setDailyIncome(Math.round(dailyIncome)));
        dispatch(setDailyExpense(Math.round(dailyExpense)));
    }

    const calculateMonthlyIncome = async (transactionsData) => {
        // current month transactions
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const monthlyTransactions = transactionsData.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
        });
        // console.log(monthlyTransactions);
        const monthlyIncome = monthlyTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc : acc + transaction.amount;
        }, 0);
        const monthlyExpense = monthlyTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc + transaction.amount : acc;
        }, 0);
        dispatch(setMonthlyIncome(Math.round(monthlyIncome)));
        dispatch(setMonthlyExpense(Math.round(monthlyExpense)));
    }

    const calculateYearlyIncome = async (transactionsData) => {
        // current year transactions
        const today = new Date();
        const year = today.getFullYear();
        const yearlyTransactions = transactionsData.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getFullYear() === year;
        });
        const yearlyIncome = yearlyTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc : acc + transaction.amount;
        }, 0);
        const yearlyExpense = yearlyTransactions.reduce((acc, transaction) => {
            return transaction.isExpense ? acc + transaction.amount : acc;
        }, 0);
        dispatch(setYearlyIncome(Math.round(yearlyIncome)));
        dispatch(setYearlyExpense(Math.round(yearlyExpense)));
    }

    const fetchTransactions = async () => {
        const options = {
            method: 'GET',
            url: 'https://unimoney-backend.onrender.com/transaction/',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            const transactions = response.data;
            // sort transactions by date in descending order
            transactions.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            for (let i = 0; i < transactions.length; i++) {
                transactions[i].image = transactions[i].name.includes('BNK') ? images.bank : images.payments;
                transactions[i].isExpense = transactions[i].type === 'debit' ? true : false;
                transactions[i].timestamp = formatDateTime(transactions[i].date);
            }
            // set first 10 transactions to display on the homepage
            setTransactionsData(transactions.slice(0, 10));
            dispatch(setAllTransactions(transactions));
            calculateDailyIncome(transactions);
            calculateMonthlyIncome(transactions);
            calculateYearlyIncome(transactions);
            getBankMessages(transactions);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true);
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
                setName(response.data.user.username);
                dispatch(setUsername(response.data.user.username));
                dispatch(setEmail(response.data.user.email));
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchData();
        fetchTransactions();
    }, []);

    const data = [
        {
            mode: 'Daily',
            expense: dailyexpense,
            income: dailyincome
        },
        {
            mode: 'Monthly',
            expense: monthlyexpense,
            income: monthlyincome
        },
        {
            mode: 'Yearly',
            expense: yearlyexpense,
            income: yearlyincome
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

                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                    }
                >

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
                                Hey, {name}!
                            </Text>
                        </View>

                        <StreakBanner />

                    {loading ? <Text>Loading...</Text> : (
                        <>
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
                                        description={item.timestamp}
                                        amount={item.amount}
                                        isExpense={item.isExpense}
                                        navigateTo={navigateTo}
                                        category={item.category.name}
                                        id={item._id}
                                    />
                                ))}
                            </View>

                        </View>
                    </>)}
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}


export default HomePage

