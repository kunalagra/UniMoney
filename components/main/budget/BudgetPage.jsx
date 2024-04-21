import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Switch } from 'react-native'
import styles from './budgetpage.style';
import { icons, COLORS } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
// import { budgetModeCategories } from '../../../constants/fakeData';
import BudgetCard from './budgetcard/BudgetCard';
import BudgetDetailsBar from './budgetdetailsbar/BudgetDetailsBar';
import AmountBottomBar from './amountbottombar/AmountBottomBar';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const BudgetPage = ({ navigateTo }) => {

    const { ArrowleftIcon } = icons;
    const [isBudgetMode, setIsBudgetMode] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isBottomBarOpen, setIsBottomBarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [isAmountBarOpen, setIsAmountBarOpen] = useState(false);
    const [isMonthlyBudget, setIsMonthlyBudget] = useState(false);
    const [MonthlyBudgetLimit, setMonthlyBudgetLimit] = useState(20000);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const {alltransactions, monthlyexpense } = useSelector(state => state.transactiondata);
    const [budgetModeCategories, setBudgetModeCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [Categories, setCategories] = useState([]);

    const getsettings = async () => {
        const isMonthlyBudget = await AsyncStorage.getItem('isMonthlyBudget');
        const monthlyBudgetLimit = await AsyncStorage.getItem('monthlyBudgetLimit');
        setIsMonthlyBudget(isMonthlyBudget === 'true');
        setMonthlyBudgetLimit( monthlyBudgetLimit ? parseInt(monthlyBudgetLimit) : 20000);
        return isMonthlyBudget === 'true';
    }

    useEffect(() => {
        const getsettings = async () => {
            const isMonthlyBudget = await AsyncStorage.getItem('BudgetMode');
            setIsBudgetMode(isMonthlyBudget === 'true');
        }
        getsettings();
        // console.log(isBudgetMode)
    }, [])

    useEffect(() => {
        // console.log(monthlyexpense);
        getsettings();
    }, [refreshing]);

    const getCategory = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://unimoney-backend.onrender.com/category/',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const res = await axios.request(options);
            const Categories = res.data;
            setCategories(res.data)
            const currentMonthTransactions = alltransactions.filter(item => {
                const date = new Date(item.date);
                return date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear();
            });

            const spends = currentMonthTransactions.filter((item) => item.isExpense);
    
            const categories = Categories.filter(item => item.limit > 0).map(category => {
                const transactions = spends.filter(item => item.category.name == category.details.name);
                const currentSpend = transactions.reduce((acc, item) => acc + item.amount, 0);
                return { ...category, currentSpend: Math.round(currentSpend) };
            });
            // console.log(categories);
    
            setBudgetModeCategories(categories);
            setRefreshing(false);
    
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory();
    }, [refreshing]);

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
                        setIsAddCategory(false);
                    }}
                    isAddCategory={isAddCategory}
                    setIsAddCategory={setIsAddCategory}
                    budgetModeCategories={budgetModeCategories}
                    setRefreshing={setRefreshing}
                    navigateTo={navigateTo}
                />

                <AmountBottomBar
                    visible={isAmountBarOpen}
                    setVisibility={setIsAmountBarOpen}
                    setRefreshing={setRefreshing}
                    title={selectedCategory.details ? selectedCategory.details.name : selectedCategory.title}
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
                                onValueChange={() => {setIsBudgetMode(prev => !prev),
                                    AsyncStorage.setItem('BudgetMode', (!isBudgetMode).toString());
                                    getCategory();
                                }}
                                value={isBudgetMode}
                            />
                        </View>

                        {isBudgetMode && getsettings() &&
                            <View style={styles.cardsContainer}>
                                {isMonthlyBudget &&
                                    <BudgetCard
                                        currentSpends={monthlyexpense}
                                        budgetSet={MonthlyBudgetLimit}
                                        handlePress={() => {
                                            setSelectedCategory({ details: { name: "Monthly Budget", img: null }, currentSpend: monthlyexpense, limit: MonthlyBudgetLimit });
                                            setIsBottomBarOpen(true);
                                        }}
                                    />
                                }

                                <Text style={styles.cardsHeader}>
                                    Categories
                                </Text>
                                {loading ? <Text>Loading...</Text> :
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
                            onPress={() => { setIsAddCategory(true); setIsBottomBarOpen(true); }}
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