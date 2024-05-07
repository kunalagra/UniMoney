import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import styles from './transactionbyinsights.style';
import TransactionCard from '../../common/cards/transaction/TransactionCard';
import { icons, COLORS } from '../../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';



const TransactionByInsights = (props) => {

    const { name, alltransactions } = props.route.params;
    const { ArrowleftIcon } = icons;

    const [refreshing, setRefreshing] = useState(false);

    const [transactionsData, setTransactionsData] = useState();

    const [loading, setLoading] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true);
        setTimeout(() => {
            setRefreshing(false);
            setLoading(false);
        }, 1000);
    }, []);


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        if (alltransactions) {

            const currentMonthTransactions = alltransactions.filter(item => {
                if (name === 'Month') {
                    return true;
                }
                return item.category.name === name;
            });

            setTransactionsData(currentMonthTransactions);
        }
    }, [alltransactions]);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

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
                        <View>
                            <Text style={styles.navHeading}>{name}</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
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
                                {transactionsData && 
                                <View style={styles.transactionsContainer}>
                                    {transactionsData.map((item, index) => (
                                        <TransactionCard
                                            key={index}
                                            name={item.name}
                                            image={item.image}
                                            description={item.timestamp}
                                            amount={item.amount}
                                            isExpense={item.isExpense}
                                            navigateTo={props.navigation.navigate}
                                            category={item.category.name}
                                            id={item._id}
                                            acc={item.acc}
                                        />
                                    ))}
                                </View>
                            }
                            </ScrollView>
                        )}
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

export default TransactionByInsights;