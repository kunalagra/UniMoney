import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './transactionbybank.style';
import TransactionCard from '../../main/common/cards/transaction/TransactionCard';
import { icons, COLORS, images, SIZES, FONT } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import CustomButton from '../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_BACKEND_URL } from '@env';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const TransactionByBank = (props) => {

    const { details } = props.route.params;
    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

    const [transactionsData, setTransactionsData] = useState([]);

    const [loading, setLoading] = useState(true);

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

    const handleDelete = async () => {
        const options = {
            method: 'DELETE',
            url: `${REACT_APP_BACKEND_URL}/bank/${details.id._id}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios(options);
            // console.log(response.data);
            props.navigation.navigate('Banks')
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // filter transactions by bank acc and then by date
        setLoading(true);
        if (alltransactions) {
            let tmp = alltransactions.filter((item) => item.acc === details.number);
            tmp = tmp.filter((item) => {
                let itemDate = new Date(item.date);
                return itemDate >= new Date(date.getFullYear(), date.getMonth()) && itemDate < new Date(date.getFullYear(), date.getMonth()+1);
            });
            setTransactionsData(tmp);    
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [date, alltransactions]);

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
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon 
                                style={styles.arrowLeftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.navHeading} numberOfLines={1}>{details.id.name}</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
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
                        </View>

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
                                {isFilterModalOpen && (
                                    <View style={styles.filterModal}>
                                        <View style={styles.filterDatePickersContainer}>
                                            <FilterDatePicker isStart={true} />
                                            <FilterDatePicker isStart={false} />
                                        </View>
                                        <CustomButton title="Filter" />
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
                                ) : (
                                    <View style={{ marginTop: 200 }}>
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
                        <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => props.navigation.navigate('AddTransactionPage')}>
                            <Text style={styles.addButtonText}>Add Transaction</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.85} style={styles.deleteButton} onPress={() => {handleDelete()}}>
                            <Text style={styles.addButtonText}>Remove Bank</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            </View>

        </SafeAreaView>
    )
}

export default TransactionByBank;