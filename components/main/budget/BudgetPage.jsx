import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Switch } from 'react-native'
import styles from './budgetpage.style';
import { icons, COLORS } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
// import { budgetModeCategories } from '../../../constants/fakeData';
import BudgetCard from './budgetcard/BudgetCard';
import BudgetDetailsBar from './budgetdetailsbar/BudgetDetailsBar';
import AmountBottomBar from './amountbottombar/AmountBottomBar';
import { useSelector } from 'react-redux';


const BudgetPage = ({ navigateTo }) => {

    const { ArrowleftIcon } = icons;
    const [isBudgetMode, setIsBudgetMode] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isBottomBarOpen, setIsBottomBarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [isAmountBarOpen, setIsAmountBarOpen] = useState(false);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const { Categories, alltransactions} = useSelector(state => state.transactiondata);
    const [budgetModeCategories, setBudgetModeCategories] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // calculate current month spendings in each category 
        const currentMonthTransactions = alltransactions.filter(item => {
            const date = new Date(item.date);
            return date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear();
        });
        
        // get categories only those limit is greater than 0
        const categories = Categories.filter(item => item.limit > 0).map(category => {
            const transactions = currentMonthTransactions.filter(item => item.category.name == category.details.name);
            const currentSpend = transactions.reduce((acc, item) => acc + item.amount, 0);
            return { ...category, currentSpend: Math.round(currentSpend) };
        });
        // console.log(categories);

        setBudgetModeCategories(categories);

        setTimeout(() => setLoading(false), 1000);


    }, [Categories]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            <View style={styles.sectionContainer}>

                <BudgetDetailsBar
                    visible={isBottomBarOpen}
                    setVisibility={setIsBottomBarOpen}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleBudgetPress={() => {
                        setIsBottomBarOpen(false);
                        setIsAmountBarOpen(true);
                    }}
                    isAddCategory={isAddCategory}
                    setIsAddCategory={setIsAddCategory}
                />

                <AmountBottomBar
                    visible={isAmountBarOpen}
                    setVisibility={setIsAmountBarOpen}
                    title={selectedCategory.title}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                    }
                >
                    <View style={styles.mainContainer}>
                        <View style={styles.navbar}>
                            <TouchableOpacity
                                onPress={() => { }}
                            >
                                <ArrowleftIcon
                                    style={styles.arrowLeftIcon}
                                    fill={COLORS.gray3}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.navHeading}>Budget Dashboard</Text>
                            </View>
                        </View>

                        <View style={styles.switchModeContainer}>
                            <Text style={styles.switchText}>
                                Budget mode
                            </Text>
                            <Switch
                                trackColor={{ false: COLORS.gray1, true: COLORS.main4 }}
                                thumbColor={isBudgetMode ? COLORS.main3 : COLORS.white4}
                                onValueChange={() => setIsBudgetMode(prev => !prev)}
                                value={isBudgetMode}
                            />
                        </View>

                        {isBudgetMode &&
                            <View style={styles.cardsContainer}>

                                <BudgetCard
                                    currentSpends={8000}
                                    budgetSet={20000}
                                    handlePress={() => {
                                        setSelectedCategory({ title: "Monthly Budget", image: null, currentSpend: 8000, budgetSet: 20000 });
                                        setIsBottomBarOpen(true);
                                    }}
                                />

                                <Text style={styles.cardsHeader}>
                                    Categories
                                </Text>
                                { loading ? <Text>Loading...</Text> :
                                budgetModeCategories.map((item, index) => (
                                    <BudgetCard
                                        key={index}
                                        title={item.details.name}
                                        image={item.details.img}
                                        currentSpends={item.currentSpend}
                                        budgetSet={item.limit}
                                        handlePress={() => {
                                            setSelectedCategory(item);
                                            setIsBottomBarOpen(true);
                                        }}
                                    />
                                ))
                            }

                            </View>
                        }

                    </View>
                </ScrollView>

                {isBudgetMode &&
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.addButton}
                            onPress={() => {setIsAddCategory(true); setIsBottomBarOpen(true);}}
                        >
                            <Text style={styles.buttonText}>
                                Add Category
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>

        </SafeAreaView>
    )
}

export default BudgetPage;