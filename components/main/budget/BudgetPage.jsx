import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Switch } from 'react-native'
import styles from './budgetpage.style';
import { icons, COLORS } from '../../../constants';
import React, { useState, useCallback } from 'react';
import { budgetModeCategories } from '../../../constants/fakeData';
import BudgetCard from './budgetcard/BudgetCard';
import BudgetDetailsBar from './budgetdetailsbar/BudgetDetailsBar';
import AmountBottomBar from './amountbottombar/AmountBottomBar';


const BudgetPage = (props) => {

    const { ArrowleftIcon } = icons;
    const [isBudgetMode, setIsBudgetMode] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isBottomBarOpen, setIsBottomBarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [isAmountBarOpen, setIsAmountBarOpen] = useState(false);

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

                <BudgetDetailsBar 
                    visible={isBottomBarOpen}
                    setVisibility={setIsBottomBarOpen}
                    selectedCategory={selectedCategory}
                    handleBudgetPress={() => {
                        setIsBottomBarOpen(false);
                        setIsAmountBarOpen(true);
                    }}
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
                                onPress={() => {}}
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
                                trackColor={{false: COLORS.gray1, true: COLORS.main4}}
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
                                        setIsBottomBarOpen(true);
                                        setSelectedCategory({title: "Monthly Budget", image: null, currentSpend: 8000, budgetSet: 20000});
                                    }} 
                                />

                                <Text style={styles.cardsHeader}>
                                    Categories
                                </Text>

                                {budgetModeCategories.map((item, index) => (
                                    <BudgetCard 
                                        key={index}
                                        title={item.title} 
                                        image={item.image} 
                                        currentSpends={item.currentSpend} 
                                        budgetSet={item.budgetSet} 
                                        handlePress={() => {
                                            setIsBottomBarOpen(true);
                                            setSelectedCategory(item);
                                        }}
                                    />
                                ))}

                            </View>
                        }

                    </View>
                </ScrollView>
                
                { isBudgetMode && 
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity 
                            activeOpacity={0.85} 
                            style={styles.addButton} 
                            onPress={() => {}}
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