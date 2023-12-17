import {Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native';
import styles from './transactiondetails.style';
import { COLORS, icons } from '../../../constants';
import { useState } from 'react';
import { spendingCategories } from '../../../utils';
import { transactionsData } from '../../../constants/fakeData';


const CategoryCard = ({id, category, selectedCategory, setSelectedCategory}) => {
    return (
        <TouchableOpacity 
            style={styles.categoryContainer}
            onPress={() => setSelectedCategory(id)}
            activeOpacity={0.6}
        >
            <View style={styles.categoryBackground(selectedCategory==id)}>
                <Image
                    source={category.image}
                    alt={category.name}
                    style={styles.categoryImage}
                />
            </View>
            <Text style={styles.categoryTitle}>{category.name}</Text>
        </TouchableOpacity>
    )
}

const TransactionDetailsPage = (props) => {

    const [selectedCategory, setSelectedCategory] = useState(0);

    const { ArrowleftIcon } = icons;

    const transaction = transactionsData[0];

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={COLORS.green1}
            />

            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={styles.upperContainer}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon
                                style={styles.arrowleftIcon}
                                fill={COLORS.white1}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.transactionDetailsContainer}>
                        <Text style={styles.paymentText}>
                            Payment successful
                        </Text>
                        <View style={styles.transactionContainer}>
                            <View style={styles.transactionDetails}>
                                <Image
                                    source={transaction.image}
                                    alt={transaction.name}
                                    style={styles.transactionImage}
                                />
                                <View style={styles.transactionTitleContainer}>
                                    <Text style={styles.transactionTitle}>
                                        {transaction.name}
                                    </Text>
                                    <Text style={styles.transactionTime}>
                                        {transaction.time}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.transactionAmount(transaction.isExpense)}>
                                    ₹ {transaction.amount}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.bottomText1}>
                            Your spend was categorised
                        </Text>
                        <Text style={styles.bottomText2}>
                            Tap to change it
                        </Text>
                    </View>
                    <View style={styles.categoriesConatainer}>
                        {spendingCategories.map((item, index) => (
                            <CategoryCard id={index} category={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} key={index} />
                        ))}
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default TransactionDetailsPage;