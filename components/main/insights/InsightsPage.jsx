import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image, useWindowDimensions } from 'react-native'
import styles from './insightspage.style';
import { chartColors, incomeData, monthlyExpense, monthlyIncome, spendsData } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS, images, FONT, SIZES } from '../../../constants';
import React, { useState, useCallback } from 'react';
import { moneyTextHelper } from '../../../utils';
import { LineChart, PieChart } from 'react-native-gifted-charts';

const getMaxPortion = (categories) => {
    let res = {category: categories[0].name, value: categories[0].amount};
    for(let i=0; i<categories.length; i++) {
        if (categories[i].amount > res.value) {
            res.value = categories[i].amount;
            res.category = categories[i].name;
        }
    }
    return res;
}

const InsightsPage = (props) => {

    const { ArrowleftIcon } = icons;

    const totalSpends = 26371;
    const totalIncome = 31270;
    const [isExpenseSelected, setIsExpenseSelected] = useState(true);
    const maxExpense = getMaxPortion(spendsData);
    const maxIncome = getMaxPortion(incomeData);

    const expenseSplitData = spendsData.map((item, index) => {
        return {
            name: item.name,
            value: item.amount,
            color: chartColors[index],
            focused: maxExpense.value==item.amount
          };
    });

    const incomeSplitData = incomeData.map((item, index) => {
        return {
            name: item.name,
            value: item.amount,
            color: chartColors[index],
            focused: maxIncome.value==item.amount
          };
    });

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
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <ArrowleftIcon 
                                style={styles.arrowLeftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.navHeading}>Insights Report</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.insightsHeadingContainer}>
                            <TouchableOpacity>
                                <Text style={styles.arrowText}>
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {}}
                            >
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
                                <TouchableOpacity
                                    onPress={() => {}}
                                >
                                    <Image
                                        source={images.calendar} 
                                        style={styles.calendarIcon}
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
                            <View style={styles.analysisContainer}>
                                <View style={styles.tabsContainer}>
                                    <TouchableOpacity 
                                        style={styles.tabContainer(isExpenseSelected)}
                                        onPress={() => setIsExpenseSelected(true)}
                                    >
                                        <Text style={styles.tabContainerText(isExpenseSelected)}>
                                            ₹ {moneyTextHelper(totalSpends)}
                                        </Text>
                                        <Text style={styles.tabDesc}>
                                            Total spends
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.tabContainer(!isExpenseSelected)}
                                        onPress={() => setIsExpenseSelected(false)}
                                    >
                                        <Text style={styles.tabContainerText(!isExpenseSelected)}>
                                            ₹ {moneyTextHelper(totalIncome)}
                                        </Text>
                                        <Text style={styles.tabDesc}>
                                            Total income
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.transactionsContainer}>
                                    <Text style={styles.transactionsContainerHeading}>
                                        This is where you {isExpenseSelected? "spent" : "earned"}
                                    </Text>
                                    {isExpenseSelected? 
                                        spendsData.map((item, index) => (
                                            <TransactionCard 
                                                key={index} 
                                                name={item.name}
                                                image={item.image}
                                                description={`${Math.round((item.amount/totalSpends).toFixed(2) * 100)}% of total spends`}
                                                amount={item.amount}
                                                isExpense={true}
                                                navigateTo={() => {}} 
                                            />
                                        )) : 
                                        incomeData.map((item, index) => (
                                            <TransactionCard 
                                                key={index} 
                                                name={item.name}
                                                image={item.image}
                                                description={`${Math.round((item.amount/totalIncome).toFixed(2) * 100)}% of total income`}
                                                amount={item.amount}
                                                isExpense={false}
                                                navigateTo={() => {}} 
                                            />
                                        ))
                                    }
                                </View>

                                <View style={styles.pieAnalysisContainer}>
                                    <Text style={styles.pieContainerHeading}>
                                        {isExpenseSelected? "Expense" : "Income"} split across categories
                                    </Text>
                                    <View style={styles.pieChartContainer}>
                                        <PieChart
                                            data={isExpenseSelected? expenseSplitData : incomeSplitData}
                                            donut
                                            showGradient
                                            sectionAutoFocus
                                            focusOnPress
                                            radius={90}
                                            toggleFocusOnPress
                                            innerRadius={60}
                                            innerCircleColor={'#232B5D'}
                                            centerLabelComponent={() => {
                                                const item = isExpenseSelected? maxExpense : maxIncome;
                                                return (
                                                <View style={styles.pieCenterContainer}>
                                                    <Text
                                                    style={styles.pieCenterText1}>
                                                        {Math.round((item.value/(isExpenseSelected? totalSpends : totalIncome)).toFixed(2) * 100)}%
                                                    </Text>
                                                    <Text style={styles.pieCenterText2}>
                                                        {item.category}
                                                    </Text>
                                                    <Text style={styles.pieCenterText3}>
                                                        (max portion)
                                                    </Text>
                                                </View>
                                                );
                                            }}
                                        />
                                    </View>
                                    <View style={styles.pieLegendsContainer}>
                                        {
                                            isExpenseSelected? 
                                            expenseSplitData.map((item, index) => (
                                                <View key={index} style={styles.pieLegend} >
                                                    <View style={styles.pieLegendDot(item.color)} />
                                                    <Text style={styles.pieLegendText}>
                                                        {item.name}: {Math.round((item.value/totalSpends).toFixed(2) * 100)}%
                                                    </Text>
                                                </View>
                                            )) : 
                                            incomeSplitData.map((item, index) => (
                                                <View key={index} style={styles.pieLegend} >
                                                    <View style={styles.pieLegendDot(item.color)} />
                                                    <Text style={styles.pieLegendText}>
                                                        {item.name}: {Math.round((item.value/totalSpends).toFixed(2) * 100)}%
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </View>

                                <View style={styles.lineAnalysisContainer}>
                                    <Text style={styles.lineContainerHeading}>
                                        Income vs Expense
                                    </Text>
                                    <View style={styles.lineChartContainer}>
                                        <LineChart
                                            data={monthlyExpense}
                                            data2={monthlyIncome}
                                            color1={COLORS.gray1}
                                            color2={COLORS.main3}
                                            dataPointsColor1={COLORS.gray1}
                                            dataPointsColor2={COLORS.main3}
                                            yAxisTextStyle={styles.lineChartAxisText}
                                            xAxisLabelTextStyle={styles.lineChartAxisText}
                                            maxValue={50}
                                            noOfSections={5}
                                            spacing={40}
                                            thickness={3}
                                            yAxisLabelSuffix={'K'}
                                            showVerticalLines
                                            curved
                                            textShiftX={-5}
                                            textShiftY={-5}
                                            textColor={COLORS.gray2}
                                        />
                                    </View>
                                    <View style={styles.lineLegendsContainer}>
                                        <View style={styles.lineLegend} >
                                            <View style={styles.lineLegendDot(COLORS.gray1)} />
                                            <Text style={styles.lineLegendText}>
                                                Expense
                                            </Text>
                                        </View>
                                        <View style={styles.lineLegend} >
                                            <View style={styles.lineLegendDot(COLORS.main3)} />
                                            <Text style={styles.lineLegendText}>
                                                Income
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default InsightsPage;