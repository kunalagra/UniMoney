import React from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, icons, images } from '../../../constants'
import ExpenseCard from '../common/cards/expense/ExpenseCard';
import StreakBanner from './streakbanner/StreakBanner';
import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import styles from './homepage.style';

const HomePage = ({ navigateTo }) => {

    const { SettingsIcon } = icons;

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
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            <ScrollView>

                <View style={styles.mainContainer}>
                    <View style={styles.navbar}>
                        <TouchableOpacity>
                            <SettingsIcon 
                                style={styles.settingsIcon}
                                fill={COLORS.gray1}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={images.profileicon}
                                style={styles.profileImage}
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

        </SafeAreaView>
    )
}


export default HomePage

