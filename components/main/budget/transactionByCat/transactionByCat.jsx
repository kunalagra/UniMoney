import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './transactionbycat.style';
// import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../../common/cards/transaction/TransactionCard';
import { icons, COLORS, images, SIZES, FONT } from '../../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import { Dialog } from '@rneui/themed';
import MonthPicker from 'react-native-month-year-picker';
import CustomButton from '../../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from "@env";



const TransactionByCat = (props) => {

    const { name } = props.route.params;
    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

    const [transactionsData, setTransactionsData] = useState();

    const { alltransactions } = useSelector(state => state.transactiondata);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [date, setDate] = useState(new Date());
    const [filterDate, setFilterDate] = useState({start: new Date(), end: new Date()});
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isFilterStartOpen, setIsFilterStartOpen] = useState(false);
    const [isFilterEndOpen, setIsFilterEndOpen] = useState(false);
    const [bankData, setBankData] = useState([{id: {name: 'All Banks'}}]);
    const [bankNumber, setBankNumber] = useState(0);

    const onValueChange = (event, newDate) => {
        setIsMonthModalOpen(false);
        const selectedDate = newDate || new Date(date);
        setDate(selectedDate);
    };

    const prevMonth = () => {
        console.log(date.getMonth(), date.getFullYear());
        if (date.getMonth()!==0) setDate(new Date(date.getFullYear(), date.getMonth()-1));
        else setDate(new Date(date.getFullYear()-1, 11));
    }
    
    const nextMonth = () => {
        console.log(date.getMonth(), date.getFullYear());
        if (date.getMonth()!==11) setDate(new Date(date.getFullYear(), date.getMonth()+1));
        else setDate(new Date(date.getFullYear()+1, 0));
    }

    useEffect(() => {
        // filter transactions by bank acc and then by date
        // console.log(name)
        if (alltransactions) {

            const currentMonthTransactions = alltransactions.filter(item => {
                const date = new Date(item.date);
                if (name === 'Month') {
                    return true;
                }
                return date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear() && item.category.name === name;
            });

            const spends = currentMonthTransactions.filter((item) => item.isExpense);

            setTransactionsData(spends);
        }
    }, [date, alltransactions]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: `${REACT_APP_BACKEND_URL}/bank/my`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
                }
            };
            try {
                const response = await axios(options);
                setBankData([...bankData, ...response.data]);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    // const filterByDate = () => {
    //     // console.log(bankNumber);
    //     if (bankNumber) {
    //         let tmp = alltransactions.filter((item) => {
    //             let itemDate = new Date(item.date);
    //             return itemDate >= filterDate.start && itemDate <= filterDate.end && item.category.name === name;
    //         });

    //         setTransactionsData(tmp);
    //     }
    //     else {
    //         // console.log(filterDate);
    //         let tmp = alltransactions.filter((item) => {
    //             let itemDate = new Date(item.date);
    //             return itemDate >= filterDate.start && itemDate <= filterDate.end;
    //         });

    //         setTransactionsData(tmp);
    //     } 
    //     setIsFilterModalOpen(false);
    // }

    // const FilterDatePicker = ({isStart}) => {
    //     return (
    //         <View style={styles.filterDatesContainer(isStart)}>
    //             <Text style={styles.filterDateText}>
    //                 {isStart? 'Start' : 'End'} Date
    //             </Text>
    //             <TouchableOpacity 
    //                 style={styles.filterDateValueContainer}
    //                 onPress={() => {
    //                     isStart? setIsFilterStartOpen(true) : setIsFilterEndOpen(true);
    //                 }}
    //             >
    //                 <Text style={styles.filterDateText}>
    //                     {isStart?
    //                         `${filterDate.start.getDate()}-${filterDate.start.getMonth()+1}-${filterDate.start.getFullYear()}`:
    //                         `${filterDate.end.getDate()}-${filterDate.end.getMonth()+1}-${filterDate.end.getFullYear()}`
    //                     }
    //                 </Text>
    //             </TouchableOpacity>
    //             <DatePicker
    //                 modal
    //                 open={isStart? isFilterStartOpen : isFilterEndOpen}
    //                 date={isStart? filterDate.start : filterDate.end}
    //                 onConfirm={(date) => {
    //                     if (isStart) {
    //                         setIsFilterStartOpen(false)
    //                         if (date > filterDate.end) {
    //                             setFilterDate({...filterDate, start: date, end: date});
    //                         } else {
    //                             setFilterDate({...filterDate, start: date});
    //                         }
    //                     } else {
    //                         setIsFilterEndOpen(false);
    //                         setFilterDate({...filterDate, end: date});
    //                     }
    //                 }}
    //                 onCancel={() => {
    //                     if (isStart) setIsFilterStartOpen(false);
    //                     else setIsFilterEndOpen(false)
    //                 }}
    //                 mode='date'
    //                 maximumDate={isStart? new Date() : filterDate.start}
    //             />
    //         </View>
    //     )
    // }
    

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            {isMonthModalOpen && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date(2014, 1)}
                    maximumDate={new Date(new Date().getFullYear(), new Date().getMonth())}
                    locale="en"
                />
            )}

            <View style={styles.sectionContainer}>

                <View style={styles.mainContainer}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon 
                                style={styles.arrowLeftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View style={{ width: '60%'}}>
                            <Text style={styles.navHeading}>{name}</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        {/* <View style={styles.transactionsHeadingContainer}>
                            <TouchableOpacity onPress={prevMonth}>
                                <Text style={styles.arrowText}>
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            >
                                <Text style={styles.dateHeading}>
                                    {months[date.getMonth()]} {date.getFullYear()}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.headingIconsContainer}>
                                <TouchableOpacity onPress={nextMonth}>
                                    <Text style={styles.arrowText}>
                                        {'>'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsMonthModalOpen(true)}
                                >
                                    <Image
                                        source={images.calendar} 
                                        style={styles.calendarIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsFilterModalOpen(prev => !prev)} style={{position: 'relative'}}>
                                    {isFilterModalOpen && (
                                        <View style={styles.filterDot} />
                                    )}
                                    <Image 
                                        source={images.filter}
                                        style={styles.filterIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View> */}

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                            }
                        >
                            {/* {isFilterModalOpen && (
                                <View style={styles.filterModal}>
                                    <ScrollView 
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    >
                                        <View style={styles.bankCardsContainer}>
                                        {bankData && bankData.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.bankCard}
                                                onPress={() => {setBankNumber(item.number)}}
                                            >
                                                <Text style={styles.bankName}>
                                                    {item.id.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                        </View>
                                    </ScrollView>
                                    <View style={styles.filterDatePickersContainer}>
                                        <FilterDatePicker isStart={true} />
                                        <FilterDatePicker isStart={false} />
                                    </View>
                                    <CustomButton title="Filter" handlePress={() => { filterByDate() }}  />
                                </View>
                            )} */}
                            {transactionsData && 
                            <View style={styles.transactionsContainer}>
                                {transactionsData.map((item, index) => (
                                    <TransactionCard
                                        key={index}
                                        name={item.name}
                                        image={item.category.img}
                                        timestamp={item.timestamp}
                                        amount={item.amount}
                                        isExpense={item.isExpense}
                                        navigateTo={props.navigation.navigate}
                                        category={item.category.name}
                                        id={item._id}
                                        accountNumber={item.acc}
                                        url={true}
                                        tnxid={item.txid}
                                        description={item.comment}
                                    />
                                ))}
                            </View>
                        }
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.addButtonContainer}>
                    <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => props.navigation.navigate('AddTransactionPage')}>
                        <Text style={styles.addButtonText}>Add Transaction</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default TransactionByCat;