import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './insightspage.style';
import { chartColors } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS, images } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import { moneyTextHelper } from '../../../utils';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import CustomButton from '../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import { useSelector } from 'react-redux';

const getMaxPortion = (categories) => {
    if (categories.length === 0) return {category: '', value: 0};
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

    const { alltransactions, Categories } = useSelector(state => state.transactiondata);
    const [spendsData, setSpendsData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [totalSpends, setTotalSpends] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState([]);

    const [isExpenseSelected, setIsExpenseSelected] = useState(true);
    

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [date, setDate] = useState(new Date());
    const [filterDate, setFilterDate] = useState({start: new Date(), end: new Date()});
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isFilterStartOpen, setIsFilterStartOpen] = useState(false);
    const [isFilterEndOpen, setIsFilterEndOpen] = useState(false);

    const [maxExpense, setMaxExpense] = useState({category: '', value: 0});
    const [maxIncome, setMaxIncome] = useState({category: '', value: 0});

    const [expenseSplitData, setExpenseSplitData] = useState([]);
    const [incomeSplitData, setIncomeSplitData] = useState([]);

    useEffect(() => {
        const monthWiseTransactions = alltransactions.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear();
        });

        const spends = monthWiseTransactions.filter((item) => item.isExpense);
        const income = monthWiseTransactions.filter((item) => !item.isExpense);

        
        let spendsData = Categories.map((category) => {
            const categoryTransactions = spends.filter((item) => item.category.name === category.details.name);
            return {
                name: category.details.name,
                image: category.details.img,
                amount: categoryTransactions.reduce((acc, item) => acc + item.amount, 0)
            }
        }
    );
    
    
    let incomeData = Categories.map((category) => {
        const categoryTransactions = income.filter((item) => item.category.name === category.details.name);
        return {
            name: category.details.name,
            image: category.details.img,
            amount: categoryTransactions.reduce((acc, item) => acc + item.amount, 0)
        }
    }
);
        spendsData = spendsData.filter((item) => item.amount > 0);
        incomeData = incomeData.filter((item) => item.amount > 0);

        const totalSpends = spends.reduce((acc, item) => acc + item.amount, 0);
        const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

        setSpendsData(spendsData);
        setIncomeData(incomeData);
        setTotalSpends(Math.round(totalSpends));
        setTotalIncome(Math.round(totalIncome));

        const maxExpense = getMaxPortion(spendsData);
        const maxIncome = getMaxPortion(incomeData);

        setMaxExpense(maxExpense);
        setMaxIncome(maxIncome);

        const expenseSplitData = spendsData.map((item, index) => ({
            name: item.name,
            value: item.amount,
            color: chartColors[index],
            focused: maxExpense.value==item.amount
        }));

        const incomeSplitData = incomeData.map((item, index) => ({
            name: item.name,
            value: item.amount,
            color: chartColors[index],
            focused: maxIncome.value==item.amount
        }));
        
        setExpenseSplitData(expenseSplitData);
        setIncomeSplitData(incomeSplitData);

        let allMonthsWiseExpenses = [];
        let allMonthsWiseIncomes = [];

    for (let i=0; i<12; i++) {
        const monthWiseTransactions = alltransactions.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === i && itemDate.getFullYear() === date.getFullYear();
        }
    );

    const spends = monthWiseTransactions.filter((item) => item.isExpense);
    const income = monthWiseTransactions.filter((item) => !item.isExpense);

    const totalSpends = spends.reduce((acc, item) => acc + item.amount, 0);
    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

    // if (totalSpends === 0 && totalIncome === 0) continue;

    allMonthsWiseExpenses.push({label: `${months[i]} ${date.getFullYear()}`, value: Math.round(totalSpends/100000), dataPointText: `${Math.round(totalSpends/100000)}K`});
    allMonthsWiseIncomes.push({label: `${months[i]} ${date.getFullYear()}`, value: Math.round(totalIncome/100000), dataPointText: `${Math.round(totalIncome/100000)}K`});

    }
    // console.log(allMonthsWiseExpenses);
    // console.log(allMonthsWiseIncomes);
    setMonthlyExpense(allMonthsWiseExpenses);
    setMonthlyIncome(allMonthsWiseIncomes);

        
    }, [alltransactions, Categories, date]);



    const onValueChange = (event, newDate) => {
        setIsMonthModalOpen(false);
        const selectedDate = newDate || new Date(date);
        setDate(selectedDate);
    };

    const prevMonth = () => {
        if (date.getMonth()!==0) setDate(new Date(date.getFullYear(), date.getMonth()-1));
        else setDate(new Date(date.getFullYear()-1, 11));
    }
    
    const nextMonth = () => {
        if (date.getMonth()!==11) setDate(new Date(date.getFullYear(), date.getMonth()+1));
        else setDate(new Date(date.getFullYear()+1, 0));
    }

    const FilterDatePicker = ({isStart}) => {
        return (
            <View style={styles.filterDatesContainer(isStart)}>
                <Text style={styles.filterDateText}>
                    {isStart? 'Start' : 'End'} Date
                </Text>
                <TouchableOpacity 
                    style={styles.filterDateValueContainer}
                    onPress={() => {
                        isStart? setIsFilterStartOpen(true) : setIsFilterEndOpen(true);
                    }}
                >
                    <Text style={styles.filterDateText}>
                        {isStart?
                            `${filterDate.start.getDate()}-${filterDate.start.getMonth()+1}-${filterDate.start.getFullYear()}`:
                            `${filterDate.end.getDate()}-${filterDate.end.getMonth()+1}-${filterDate.end.getFullYear()}`
                        }
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={isStart? isFilterStartOpen : isFilterEndOpen}
                    date={isStart? filterDate.start : filterDate.end}
                    onConfirm={(date) => {
                        if (isStart) {
                            setIsFilterStartOpen(false)
                            if (date > filterDate.end) {
                                setFilterDate({...filterDate, start: date, end: date});
                            } else {
                                setFilterDate({...filterDate, start: date});
                            }
                        } else {
                            setIsFilterEndOpen(false);
                            setFilterDate({...filterDate, end: date});
                        }
                    }}
                    onCancel={() => {
                        if (isStart) setIsFilterStartOpen(false);
                        else setIsFilterEndOpen(false)
                    }}
                    mode='date'
                    maximumDate={isStart? new Date() : filterDate.start}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            {isMonthModalOpen && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date(2014, 1)}
                    maximumDate={new Date(new Date().getFullYear(), new Date().getMonth())}
                    locale="en"
                />
            )}
            { spendsData && 
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
                            <TouchableOpacity onPress={prevMonth}>
                                <Text style={styles.arrowText}>
                                    {'<'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsMonthModalOpen(true)}
                            >
                                <Text style={styles.dateHeading}>
                                    {months[date.getMonth()]} {date.getFullYear()}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.headingIconsContainer}>
                                <TouchableOpacity onPress={nextMonth} disabled={date.getMonth()===new Date().getMonth() && date.getFullYear()===new Date().getFullYear()}>
                                    <Text style={styles.arrowText}>
                                        {'>'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsMonthModalOpen(true)}
                                >
                                    <Image
                                        source={images.calendar} 
                                        style={styles.calendarIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsFilterModalOpen(prev => !prev)} style={{position: 'relative'}}>
                                    {isFilterModalOpen && (
                                        <View style={styles.filterDot} />
                                    )}
                                    <Image 
                                        source={images.filter}
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
                            {isFilterModalOpen && (
                                <View style={styles.filterModal}>
                                    <View style={styles.filterDatePickersContainer}>
                                        <FilterDatePicker isStart={true} />
                                        <FilterDatePicker isStart={false} />
                                    </View>
                                    <CustomButton title="Filter" />
                                </View>
                            )}
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
                                                url={true}
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
                                                url={true}
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
                                            innerCircleColor={COLORS.darkblue1}
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
                                            yAxisLabelSuffix={'L'}
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
}
        </SafeAreaView>
    )
}

export default InsightsPage;