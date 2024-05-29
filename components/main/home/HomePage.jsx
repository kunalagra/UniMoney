import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity,RefreshControl, PermissionsAndroid, ToastAndroid, Linking, Platform } from 'react-native';
import { COLORS, images } from '../../../constants'
import ExpenseCard from '../common/cards/expense/ExpenseCard';
import StreakBanner from './streakbanner/StreakBanner';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import styles from './homepage.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setUsername, setEmail, setImage } from '../../../store/profilecreation';
import { useDispatch, useSelector } from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import { setDailyIncome, setMonthlyIncome, setYearlyIncome, setDailyExpense, setMonthlyExpense, setYearlyExpense, setAllTransactions, setCategories } from '../../../store/transactiondata';
import { getTransactionInfo } from 'transaction-sms-parser';
import { formatDateTime } from '../../../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { REACT_APP_BACKEND_URL } from '@env';


const HomePage = ({ navigateTo }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
        fetchTransactions();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const { alltransactions } = useSelector(state => state.transactiondata);

    const [transactionsData, setTransactionsData] = useState(alltransactions);
    const [name, setName] = useState('');
    const [img , setImg] = useState('');

    const { dailyincome, monthlyincome, yearlyincome, dailyexpense, monthlyexpense, yearlyexpense } = useSelector(state => state.transactiondata);


    const getBankMessages = async (prevData) => {
        // Example amount: Rs. 1,000.00 , Rs 7,38,373.267
        // get complete amount till the decimal point
        // const amountRegex = /(?:Rs\.|Rs|INR|₹)\s?(\d+(?:,\d+)*(?:\.\d+)?)/i;
        // const isCredited = (str) => {
        //     return /(?:credited|received|deposited|has sent)/i.test(str);
        // };
        // const bankKeywordsRegex = /(credited|debited|payment|withdraw|withdrawn|received|sent|available balance)/i;
        // const spamKeywordsRegex = /(Congratulations|won|win|prize|lucky|offer|discount|sale|reward|requested money|RAZORPAY|PAYPAL)/i;

        console.log('Permission granted');
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        
        let smsdata = [];
        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 50, // Increase maxCount to retrieve more messages
                minDate: prevData[0].date,

            }),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                const parsedSmsList = JSON.parse(smsList);
                // console.log(parsedSmsList);
                parsedSmsList.filter((transaction) => {
                    // const valid = bankKeywordsRegex.test(transaction.body);
                    // const spam = spamKeywordsRegex.test(transaction.body);
                    const transactionInfo = getTransactionInfo(transaction.body);
                    if (transactionInfo.account.type && transactionInfo.transaction.amount && transactionInfo.transaction.type) {
                        // console.log(transaction);
                        // const amount = amountRegex.exec(transaction.body);
                        // const amountValue = amount ? parseFloat(amount[1].replace(/,/g, '')) : null;
                    // console.log(transaction.body);
                    // console.log(transactionInfo);
                    const type = transactionInfo.transaction.type;
                    const name = transactionInfo.transaction.merchant ? transactionInfo.transaction.merchant : transactionInfo.transaction.detail ? transactionInfo.transaction.detail : transaction.address;
                    const date = formatDateTime(transaction.date);
                    const amountValue = transactionInfo.transaction.amount;
                    const accNumber = transactionInfo.account.number;
                    const txid = transactionInfo.transaction.referenceNo;
                    if (amountValue && amountValue > 0 && !transaction.address.includes('+91')) {
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
                                        name: name.includes('BNK') ? 'Transfers':'Payments',
                                        image: name.includes('BNK') ? images.bank : images.payments,
                                    }
                                }
                        );
                    }
                    }
                });

                // const oldMessages = bankMessages.filter((sms) => {
                //     return new Date(sms.date) > date;
                // });
                // console.log(smsdata);

                const messages = smsdata.filter((sms, index, self) =>
                    sms.txid === 0 || index === self.findIndex((t) => (
                        (t.txid !== 0 && sms.txid !== 0 && t.txid === sms.txid)
                    ))
                );

                const newtransactions = []
                // console.log(messages);
                // check if the sms is already present in the transactions
                // console.log(prevData);
                // console.log(smsdata);
                messages.forEach((sms) => {
                    const isPresent = prevData.find((transaction) => {
                        return (transaction.date === sms.date && transaction.amount === sms.amount) || (transaction.txid !== 0 && transaction.txid === sms.txid);
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
            url: `${REACT_APP_BACKEND_URL}/transaction/`,
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
            url: `${REACT_APP_BACKEND_URL}/transaction/`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            const transactions = response.data;
            // sort transactions by date in descending order
            // transactions.sort((a, b) => {
            //     return new Date(b.date) - new Date(a.date);
            // });
            for (let i = 0; i < transactions.length; i++) {
                transactions[i].image = transactions[i].name.includes('BNK') ? images.bank : images.payments;
                transactions[i].isExpense = transactions[i].type === 'debit' ? true : false;
                transactions[i].timestamp = formatDateTime(transactions[i].date);
            }
            // set first 10 transactions to display on the homepage
            // console.log(transactions)
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

    const fetchData = async () => {
        // console.log(await AsyncStorage.getItem('token'));
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/auth/profile`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options).then(async (response) => {
                const options = {
                    method: 'GET',
                    url: `${REACT_APP_BACKEND_URL}/category/`,
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                    }
                };
                try {
                    const res = await axios.request(options);
                    dispatch(setCategories(res.data));
                    // console.log(res.data);
                } catch (error) {
                    console.log(error);
                }
                // console.log(Object.values(response.data.userInfo.bank));
                firstTime();
                setName(response.data.user.username);
                dispatch(setUsername(response.data.user.username));
                dispatch(setEmail(response.data.user.email));
                dispatch(setImage(response.data.user.image));
                setImg(response.data.user.image);
            });
        } catch (error) {
            // console.log("Error in fetching profile data");
            // console.log(await AsyncStorage.getItem('token'))
            console.log(error);
        }
        
    }

    const firstTime = async () => {
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/streak/visit`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            // console.log(response.data);
            fetchTransactions();
        } catch (error) {
            // console.log("Error in first time visit");
            console.log(error);
        }
    }

const checkAndRequestPermission = async (permission) => {
    const isGranted = await PermissionsAndroid.check(permission);
    if (!isGranted) {
        const result = await PermissionsAndroid.request(permission);
        return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

const fetchDataIfPermissionsGranted = async () => {
    try {
        const isNotificationPermissionAvailable = Platform.Version >= 33;
        const permissions = [
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            ...(isNotificationPermissionAvailable ? [PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] : [])
        ];

        const permissionsGranted = await Promise.all(permissions.map(checkAndRequestPermission));

        if (permissionsGranted.every(Boolean)) {
            fetchData();
        } else {
            ToastAndroid.show('Required permissions denied', ToastAndroid.SHORT);
            setTimeout(() => {
                Linking.openSettings();
            }, 2000);
        }
    } catch (err) {
        console.error(err.message);
    }
};

    useEffect(() => {
        setLoading(true);
        fetchDataIfPermissionsGranted();
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

                {loading? (
                    <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                    }
                    style={{ height: '100%'}}
                >

                        <SkeletonPlaceholder borderRadius={4} direction='right'>
                            <SkeletonPlaceholder.Item padding={10} gap={15} height={'100%'}>
                                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
                                    <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
                                    <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
                                </View>
                                <SkeletonPlaceholder.Item width={240} height={50} borderRadius={12} />
                                <SkeletonPlaceholder.Item height={150} borderRadius={12} alignSelf='stretch' />
                                <SkeletonPlaceholder.Item height={150} borderRadius={12} alignSelf='stretch' />
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <SkeletonPlaceholder.Item width={200} height={40} borderRadius={12} />
                                    <SkeletonPlaceholder.Item width={70} height={25} borderRadius={8} />
                                </View>
                                <SkeletonPlaceholder.Item height={60} borderRadius={12} alignSelf='stretch' />
                                <SkeletonPlaceholder.Item height={60} borderRadius={12} alignSelf='stretch' />
                                <SkeletonPlaceholder.Item height={60} borderRadius={12} alignSelf='stretch' />
                                <SkeletonPlaceholder.Item height={60} borderRadius={12} alignSelf='stretch' />
                                <SkeletonPlaceholder.Item height={60} borderRadius={12} alignSelf='stretch' />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                </ScrollView>
                ) : (
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
                                    style={[styles.navIcon, { tintColor: COLORS.gray1 }]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigateTo('SettingsPage')}
                            >
                                <Image
                                    source={img ? {uri: img} : images.profileicon}
                                    style={[styles.navIcon, !img ? {tintColor: COLORS.gray1} : {}]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>
                                Hey, {name===''? 'John' : name[0].toUpperCase() + name.split(' ')[0].slice(1).toLowerCase()}!
                            </Text>
                        </View>

                        <StreakBanner navigateTo={navigateTo} />

                        <View style={styles.expenseCardsContainer}>
                            <ScrollView
                                contentContainerStyle={styles.expenseCardsList}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            >
                                {data.map((item, index) => (
                                    <ExpenseCard item={item} key={index} navigateTo={navigateTo} />
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.recentTransactionsContainer}>
                            <View style={styles.transactionsHeadingContainer}>
                                <Text style={styles.transactionsHeading}>
                                    Recent Transactions
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => navigateTo('Main', {
                                        screen: 'History'
                                    })}
                                >
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
                                        acc={item.acc}
                                    />
                                ))}
                            </View>

                        </View>
                    </View>
                </ScrollView>
                )}

                {!loading && (
                    <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                        <TouchableOpacity style={{ padding: 14, backgroundColor: COLORS.main3, borderRadius: 100 }} onPress={() => navigateTo('AddTransactionPage')}>
                            <Image
                                source={images.plus_icon}
                                style={{ width: 30, height: 30, tintColor: COLORS.white1 }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </SafeAreaView>
    )
}


export default HomePage

