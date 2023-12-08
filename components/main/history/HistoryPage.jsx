import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import styles from './historypage.style';
import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS } from '../../../constants';
import React, { useState, useCallback } from 'react'

const HistoryPage = ({ navigateTo }) => {

    const { ArrowleftIcon, CalendarIcon, FilterIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

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
                            <TouchableOpacity>
                                <Text style={styles.arrowText}>
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.dateHeading}>
                                    October
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.headingIconsContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.arrowText}>
                                        {'>'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <CalendarIcon 
                                        style={styles.calendarIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FilterIcon 
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
                            <View style={styles.transactionsContainer}>
                                {transactionsData.map((item, index) => (
                                    <TransactionCard transaction={item} key={index} navigateTo={navigateTo} />
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