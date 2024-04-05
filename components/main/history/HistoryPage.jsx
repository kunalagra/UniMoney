import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './historypage.style';
import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS, images, SIZES, FONT } from '../../../constants';
import React, { useState, useCallback } from 'react';
import { Dialog } from '@rneui/themed';
import MonthPicker from 'react-native-month-year-picker';
import CustomButton from '../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';


const HistoryPage = ({ navigateTo }) => {

    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

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
        const selectedDate = newDate || new Date(date);
        setDate(selectedDate);
        setIsMonthModalOpen(false);
    };

    const prevMonth = () => {
        if (date.getMonth()!==0) setDate(new Date(date.getFullYear(), date.getMonth()-1));
        else setDate(new Date(date.getFullYear()-1, 11));
    }
    
    const nextMonth = () => {
        if (date.getMonth()!==11) setDate(new Date(date.getFullYear(), date.getMonth()+1));
        else setDate(new Date(date.getFullYear()+1, 0));
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
                        <TouchableOpacity>
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
                        <View style={styles.transactionsHeadingContainer}>
                            <TouchableOpacity onPress={prevMonth}>
                                <Text style={styles.arrowText}>
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsMonthModalOpen(true)}
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
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.addButtonContainer}>
                    <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => navigateTo('AddTransactionPage')}>
                        <Text style={styles.addButtonText}>Add Transaction</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default HistoryPage;