import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
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

