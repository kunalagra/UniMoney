import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './historypage.style';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS, images, SIZES, FONT } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import CustomButton from '../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { REACT_APP_BACKEND_URL } from "@env";

const HistoryPage = ({ navigateTo }) => {

    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const [transactionsData, setTransactionsData] = useState([]);

    const { alltransactions } = useSelector(state => state.transactiondata);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [date, setDate] = useState(new Date());
    // set start data to 1st of the month and end date to current date
    const [filterDate, setFilterDate] = useState({start: new Date(date.getFullYear(), date.getMonth()), end: new Date()});
    // const [isFilterByDate, setIsFilterByDate] = useState(false);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isFilterStartOpen, setIsFilterStartOpen] = useState(false);
    const [isFilterEndOpen, setIsFilterEndOpen] = useState(false);
    const [bankData, setBankData] = useState([]);
    const [bankNumber, setBankNumber] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);

    const onValueChange = (event, newDate) => {
        setIsMonthModalOpen(false);
        const selectedDate = newDate || new Date(date);
        setDate(selectedDate);
    };

    const prevMonth = () => {
        if (date.getMonth()!==0) setDate(new Date(date.getFullYear(), date.getMonth()-1));
        else setDate(new Date(date.getFullYear()-1, 11));
    }
    
    const nextMonth = () => {
        if (date.getMonth()!==11) setDate(new Date(date.getFullYear(), date.getMonth()+1));
        else setDate(new Date(date.getFullYear()+1, 0));
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // console.log(alltransactions);
        if (alltransactions) {
            let tmp = alltransactions.filter((item) => {
                if (!item ) return false;
                let itemDate = new Date(item.date);
                return itemDate >= new Date(date.getFullYear(), date.getMonth()) && itemDate < new Date(date.getFullYear(), date.getMonth()+1);
            });

            setTransactionsData(tmp);
        }
    }, [date, alltransactions]);

    useEffect(() => {
        setLoading(true);
        setBankData([]);
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
                setBankData([...response.data]);
            }
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const filterByDate = (bankNumber) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        if (bankNumber) {
            let tmp = alltransactions.filter((item) => {
                let itemDate = new Date(item.date);
                return itemDate >= filterDate.start && itemDate <= filterDate.end && item.acc === bankNumber;
            });

            setTransactionsData(tmp);
            setIsFiltered(true);
        }
        else {
            let tmp = alltransactions.filter((item) => {
                let itemDate = new Date(item.date);
                return itemDate >= filterDate.start && itemDate <= filterDate.end;
            });

            setTransactionsData(tmp);
        } 
        setIsFilterModalOpen(false);
    }

    const FilterDatePicker = ({isStart}) => {
        return (
            <View style={styles.filterDatesContainer(isStart)}>
                <Text style={styles.filterDateText}>
                    {isStart? 'Start' : 'End'} Date
                </Text>
                <TouchableOpacity 
                    style={styles.filterDateValueContainer}
                    onPress={() => {
                        isStart? setIsFilterStartOpen(true) : setIsFilterEndOpen(true);
                    }}
                >
                    <Text style={styles.filterDateText}>
                        {isStart?
                            `${filterDate.start.getDate()}-${filterDate.start.getMonth()+1}-${filterDate.start.getFullYear()}`:
                            `${filterDate.end.getDate()}-${filterDate.end.getMonth()+1}-${filterDate.end.getFullYear()}`
                        }
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={isStart? isFilterStartOpen : isFilterEndOpen}
                    date={isStart? filterDate.start : filterDate.end}
                    onConfirm={(date) => {
                        if (isStart) {
                            setIsFilterStartOpen(false)
                            if (date > filterDate.end) {
                                setFilterDate({...filterDate, start: date, end: date});
                            } else {
                                setFilterDate({...filterDate, start: date});
                            }
                        } else {
                            setIsFilterEndOpen(false);
                            setFilterDate({...filterDate, end: date});
                        }
                    }}
                    onCancel={() => {
                        if (isStart) setIsFilterStartOpen(false);
                        else setIsFilterEndOpen(false)
                    }}
                    mode='date'
                    maximumDate={isStart? new Date() : filterDate.start}
                />
            </View>
        )
    }
    

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
                            onPress={() => navigateTo('Home')}
                        >
                            <ArrowleftIcon 
                                style={styles.arrowLeftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.navHeading}>All Transactions</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        {!isFiltered && (
                        <View style={styles.transactionsHeadingContainer}>

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
                                <TouchableOpacity onPress={nextMonth} disabled={date.getMonth()===new Date().getMonth() && date.getFullYear()===new Date().getFullYear()}>
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
                                    {isFiltered && (
                                        <View style={styles.filterDot} />
                                    )}
                                    <Image 
                                        source={images.filter}
                                        style={styles.filterIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}

                        {loading? (
                            <View style={{ alignSelf: 'stretch' }}>
                                <SkeletonPlaceholder borderRadius={4} direction='right'>
                                    <SkeletonPlaceholder.Item gap={15}>
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            </View>
                        ) : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                                }
                            >
                                {(isFilterModalOpen || isFiltered) && (
                                    <View style={styles.filterModal}>
                                        <ScrollView 
                                            showsHorizontalScrollIndicator={false}
                                            horizontal
                                        >
                                            <View style={styles.bankCardsContainer}>
                                            {bankData && bankData.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[styles.bankCard, item.number===bankNumber && { backgroundColor: COLORS.main3 }]}
                                                    onPress={() => {setBankNumber(item.number)}}
                                                >
                                                    <Text numberOfLines={1} style={[styles.bankName, item.number===bankNumber && { color: COLORS.white1 }]}>
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
                                        <CustomButton 
                                            title={isFiltered? "Clear Filter" : "Filter"}
                                            inlineStyles={[isFiltered && { backgroundColor: COLORS.gray1 }]} 
                                            handlePress={() => { 
                                                if (isFiltered) {
                                                    setBankNumber(null);
                                                    setIsFiltered(false);
                                                    setFilterDate({start: new Date(date.getFullYear(), date.getMonth()), end: new Date()});
                                                    filterByDate(null);
                                                } else {
                                                    filterByDate(bankNumber);
                                                }
                                            }}  
                                        />
                                    </View>
                                )}
                                {transactionsData.length > 0? (
                                    <View style={styles.transactionsContainer}>
                                        {transactionsData.map((item, index) => (
                                            <TransactionCard
                                                key={index}
                                                name={item.name}
                                                image={item.category.img}
                                                timestamp={item.timestamp}
                                                amount={item.amount}
                                                isExpense={item.isExpense}
                                                navigateTo={navigateTo}
                                                category={item.category.name}
                                                id={item._id}
                                                accountNumber={item.acc}
                                                url={true}
                                                tnxid={item.txid}
                                                description={item.comment}
                                            />
                                        ))}
                                    </View>
                                ) : (
                                    <View style={{ marginTop: 150 }}>
                                        <Text style={{ fontFamily: FONT.medium, color: COLORS.gray1, fontSize: SIZES.regular, textAlign: 'center'}}>
                                            No transactions found
                                        </Text>
                                    </View>
                                )}
                            </ScrollView>
                        )}

                    </View>
                </View>

                {!loading && (
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => navigateTo('AddTransactionPage')}>
                            <Text style={styles.addButtonText}>Add Transaction</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </SafeAreaView>
    )
}

export default HistoryPage;