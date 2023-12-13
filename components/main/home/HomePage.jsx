import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONT, SIZES, icons, images } from '../../../constants'
import ExpenseCard from '../common/cards/expense/ExpenseCard';
import StreakBanner from './streakbanner/StreakBanner';
import { transactionsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import styles from './homepage.style';
import { Dialog, Input } from '@rneui/themed';

const ChatModal = ({visible, setVisibility}) => {

    const messagesA = ['Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!', 'Hello', 'Iam Jonhhy!!', 'I want some help!'];
    const messagesB = ['Hey, Jonhhy!', 'How can I help you?'];

    return (
        <Dialog
            isVisible={visible} 
            onDismiss={() => setVisibility(false)} 
            onBackdropPress={() => setVisibility(false)}
            overlayStyle={{
                backgroundColor: COLORS.white2, width: '90%', height: '90%', alignSelf: 'center', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', padding: 10, gap: 10
            }}
        >
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                <View style={{width: '50%', flexGrow: 1}}>
                    <Text style={{color: COLORS.gray3, fontFamily: FONT.medium, fontSize: SIZES.medium, textAlign: 'center'}}>
                        Wanna chat?
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => setVisibility(false)}
                >
                    <Image 
                        source={images.closeicon}
                        style={{width: 20, height: 20, tintColor: COLORS.gray1}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', backgroundColor: COLORS.white3, borderWidth: 1, borderColor: COLORS.white5, flexGrow: 1, borderRadius: 8, height: '10%'}}>
                <ScrollView 
                >
                    {messagesA.map((item, index) => (
                        <View
                            style={{backgroundColor: COLORS.main3, alignSelf: 'flex-end', padding: 8, marginHorizontal: 5, marginVertical: 2, borderRadius: 10, borderBottomRightRadius: 0}}
                            key={index}
                        >
                            <Text style={{color: COLORS.white1, fontFamily: FONT.regular, fontSize: SIZES.regular}}>
                                {item}
                            </Text>
                        </View>
                    ))}
                    {messagesB.map((item, index) => (
                        <View
                            style={{backgroundColor: COLORS.gray1, alignSelf: 'flex-start', padding: 8, marginHorizontal: 5, marginVertical: 2, borderRadius: 10, borderBottomLeftRadius: 0}}
                            key={index}
                        >
                            <Text style={{color: COLORS.white1, fontFamily: FONT.regular, fontSize: SIZES.regular}}>
                                {item}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{width: '100%', height: 52, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5}}>
                <Input
                    containerStyle={{width: '80%', paddingHorizontal: 0, height: 50, flexGrow: 1}}
                    inputContainerStyle={{borderColor: COLORS.white5, borderRadius: 8, borderWidth: 1, backgroundColor: COLORS.white3}}
                    style={{fontSize: SIZES.medium-2, color: COLORS.gray2, fontFamily: FONT.regular, paddingHorizontal: 15}}
                    placeholder="Wanna say something..."
                    underlineColorAndroid="transparent"
                    selectionColor={COLORS.gray3}
                    placeholderTextColor={COLORS.gray3}
                    numberOfLines={1}
                />
                <TouchableOpacity
                    style={{backgroundColor: COLORS.main3, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8}}
                >
                    <Image
                        source={images.sendicon}
                        style={{width: 24, height: 24, tintColor: COLORS.white1}}
                    />
                </TouchableOpacity>
            </View>
        </Dialog>
    )
}

const HomePage = ({ navigateTo }) => {

    const { SettingsIcon } = icons;
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

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

            <View style={{position: 'relative'}}>

                {
                    !isChatModalOpen && 
                    <View 
                        style={{position: 'absolute', bottom: 10, right: 10, zIndex: 1}}
                    >
                        <TouchableOpacity
                            style={{backgroundColor: COLORS.main3, borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 8}}
                            activeOpacity={0.85}
                            onPress={() => setIsChatModalOpen(true)}
                        >
                            <Image 
                                source={images.chaticon}
                                style={{width: 40, height: 40, tintColor: COLORS.white1}}
                            />
                        </TouchableOpacity>
                    </View>
                }

                <ChatModal visible={isChatModalOpen} setVisibility={setIsChatModalOpen} />

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
            </View>

        </SafeAreaView>
    )
}


export default HomePage

