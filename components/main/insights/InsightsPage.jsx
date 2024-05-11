import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import styles from './insightspage.style';
import { chartColors } from '../../../constants/fakeData';
import TransactionCard from '../common/cards/transaction/TransactionCard';
import { icons, COLORS, images, SIZES } from '../../../constants';
import React, { useState, useCallback, useEffect } from 'react';
import { moneyTextHelper } from '../../../utils';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import CustomButton from '../../profilecreation/common/button/CustomButton';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { REACT_APP_BACKEND_URL } from '@env';

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

const abbToWord = {'Cr': 'Crores', 'L': 'Lakhs', 'K': 'Thousands', 'Rs': 'Rupees'};
const abbToVal = {'Cr': 10000000, 'L': 100000, 'K': 1000, 'Rs': 1};

const convertToLimitLabel = (value) => {
    if (value >= 10000000) return 'Cr';
    else if (value >= 100000) return 'L';
    else if (value >= 1000) return 'K';
    return 'Rs';
}

const convertToLimitValue = (value) => {
    if (value===0) return 0;
    if (value <= 100) return 100;
    if (value <= 1000) return getNearestValue(value, 100, 1000);
    if (value <= 10000) return getNearestValue(value, 1000, 10000);
    if (value <= 100000) return getNearestValue(value, 10000, 100000);
    if (value <= 1000000) return getNearestValue(value, 100000, 1000000);
    if (value <= 10000000) return getNearestValue(value, 1000000, 10000000);
    if (value <= 100000000) return getNearestValue(value, 10000000, 100000000);
    return 1000000000;
}

const getNearestValue = (value, start, end) => {
    let nearestValue = start;
    for (let i=start; i<=end; i+=start) {
        if (value <= i) {
            nearestValue = i;
            break;
        }
    }
    return nearestValue;
}

const maxLimitValue = (value) => {
    if (value===0) return 0;
    if (value >= 10000000) return Math.ceil(value/10000000) * 10000000;
    else if (value >= 100000) return Math.ceil(value/100000) * 100000;
    else if (value >= 1000) return Math.ceil(value/1000) * 1000;
    return 1000;
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
    const [maxYValue, setMaxYValue] = useState(0);
    const [maxYLabel, setMaxYLabel] = useState('Rs');
    const [loading, setLoading] = useState(true);

    const [isExpenseSelected, setIsExpenseSelected] = useState(true);
    const [lineGraphSelected, setLineGraphSelected] = useState(0);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [date, setDate] = useState(new Date());
    const [filterDate, setFilterDate] = useState({start: new Date(date.getFullYear(), date.getMonth()), end: new Date()});
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isFilterStartOpen, setIsFilterStartOpen] = useState(false);
    const [isFilterEndOpen, setIsFilterEndOpen] = useState(false);
    const [bankData, setBankData] = useState([]);
    const [bankNumber, setBankNumber] = useState(null);
    

    const [maxExpense, setMaxExpense] = useState({category: '', value: 0});
    const [maxIncome, setMaxIncome] = useState({category: '', value: 0});

    const [expenseSplitData, setExpenseSplitData] = useState([]);
    const [incomeSplitData, setIncomeSplitData] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [spendTransactions, setSpendTransactions] = useState([]);
    const [incomeTransactions, setIncomeTransactions] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: `${REACT_APP_BACKEND_URL}/bank/my`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
                }
            };
            try {
                const response = await axios(options);
                setBankData([...response.data]);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        let monthWiseTransactions = [];
        if (isFilter) {
            if (bankNumber) {
                monthWiseTransactions = alltransactions.filter((item) => {
                    let itemDate = new Date(item.date);
                    return itemDate >= filterDate.start && itemDate <= filterDate.end && item.acc === bankNumber;
                });
            }
            else {
                monthWiseTransactions = alltransactions.filter((item) => {
                    let itemDate = new Date(item.date);
                    return itemDate >= filterDate.start && itemDate <= filterDate.end;
                });
            }
        } else {
            monthWiseTransactions = alltransactions.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear();
            });
        }

        const spends = monthWiseTransactions.filter((item) => item.isExpense);
        const income = monthWiseTransactions.filter((item) => !item.isExpense);
        setSpendTransactions(spends);
        setIncomeTransactions(income);
        
        let spendsData = Categories.map((category) => {
            const categoryTransactions = spends.filter((item) => item.category.name === category.details.name);
            return {
                name: category.details.name,
                image: category.details.img,
                amount: categoryTransactions.reduce((acc, item) => acc + item.amount, 0)
            }
        });
    
    
        let incomeData = Categories.map((category) => {
            const categoryTransactions = income.filter((item) => item.category.name === category.details.name);
            return {
                name: category.details.name,
                image: category.details.img,
                amount: categoryTransactions.reduce((acc, item) => acc + item.amount, 0)
            }
        });
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
        let maxY = 0;
        let maxYL = 'Rs';

        for (let i=0; i<12; i++) {
            const monthWiseTransactions = alltransactions.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate.getMonth() === i && itemDate.getFullYear() === date.getFullYear();
            });

            const spends = monthWiseTransactions.filter((item) => item.isExpense);
            const income = monthWiseTransactions.filter((item) => !item.isExpense);

            const totalSpends = spends.reduce((acc, item) => acc + item.amount, 0);
            const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);

            // if (totalSpends === 0 && totalIncome === 0) continue;

            allMonthsWiseExpenses.push({label: `${months[i]}`, value: totalSpends, dataPointText: `${totalSpends}`});
            allMonthsWiseIncomes.push({label: `${months[i]}`, value: totalIncome, dataPointText: `${totalIncome}`});
            
            maxY = convertToLimitValue(Math.max(maxY, maxLimitValue(totalSpends), maxLimitValue(totalIncome)));
            maxYL = convertToLimitLabel(maxY);
        }
        
        for (let i=0; i<12; i++) {
            allMonthsWiseExpenses[i] = {...allMonthsWiseExpenses[i], value: (allMonthsWiseExpenses[i].value/abbToVal[maxYL]).toFixed(2), dataPointText: `${(allMonthsWiseExpenses[i].value/abbToVal[maxYL]).toFixed(2)}`};
            allMonthsWiseIncomes[i] = {...allMonthsWiseIncomes[i], value: (allMonthsWiseIncomes[i].value/abbToVal[maxYL]).toFixed(2), dataPointText: `${(allMonthsWiseIncomes[i].value/abbToVal[maxYL]).toFixed(2)}`};
        }

        setMaxYValue(maxY/abbToVal[maxYL]);
        setMaxYLabel(maxYL);
        setMonthlyExpense(allMonthsWiseExpenses);
        setMonthlyIncome(allMonthsWiseIncomes);
        setRefreshing(false);
        setLoading(false);

        
    }, [alltransactions, Categories, date, refreshing]);



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

    const RadioButton = ({ selected=false }) => {
        return (
            <View style={{ height: 18, width: 18, borderRadius: 12, borderWidth: 2, borderColor: selected? COLORS.main3 : COLORS.gray1, alignItems: 'center', justifyContent: 'center' }}>
              {
                selected ?
                  <View style={{
                    height: 10,
                    width: 10,
                    borderRadius: 6,
                    backgroundColor: COLORS.main3,
                  }}/>
                  : null
              }
            </View>
        );
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
                            onPress={() => props.navigation.navigate('Home')}
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
                        {!isFilter && (
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
                                        {isFilter && (
                                            <View style={styles.filterDot} />
                                        )}
                                        <Image 
                                            source={images.filter}
                                            style={styles.filterIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {(loading || monthlyExpense.length===0 || monthlyIncome.length===0 || maxYValue===0) ? (
                            <View style={{ alignSelf: 'stretch' }}>
                                <SkeletonPlaceholder direction='right'>
                                    <SkeletonPlaceholder.Item gap={15}>
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={80} borderRadius={12} />
                                        <SkeletonPlaceholder.Item width={200} height={20} borderRadius={6} marginTop={10} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                        <SkeletonPlaceholder.Item width={230} height={30} borderRadius={6} marginTop={10} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={200} borderRadius={12} />
                                        <SkeletonPlaceholder.Item width={230} height={30} borderRadius={6} marginTop={10} />
                                        <SkeletonPlaceholder.Item alignSelf='stretch' height={200} borderRadius={12} />
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
                            {(isFilterModalOpen || isFilter) && (
                                <View style={styles.filterModal}>
                                    <ScrollView 
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    >
                                        <View style={styles.bankCardsContainer}>
                                        {bankData && bankData.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[styles.bankCard, item.number===bankNumber && { backgroundColor: COLORS.main3 }]}
                                                onPress={() => {setBankNumber(item.number)}}
                                            >
                                                <Text numberOfLines={1} style={[styles.bankName, item.number===bankNumber && { color: COLORS.white1 }]}>
                                                    {item.id.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                        </View>
                                    </ScrollView>
                                    <View style={styles.filterDatePickersContainer}>
                                        <FilterDatePicker isStart={true} />
                                        <FilterDatePicker isStart={false} />
                                    </View>
                                    <CustomButton 
                                        title={isFilter? 'Clear Filter' : 'Filter'} 
                                        inlineStyles={[isFilter && { backgroundColor: COLORS.gray1 }]} 
                                        handlePress={() => { 
                                            if (isFilter) {
                                                setIsFilter(false);
                                                setRefreshing(true);
                                                setBankNumber(null);
                                                setFilterDate({start: new Date(date.getFullYear(), date.getMonth()), end: new Date()});
                                            } else {
                                                setIsFilter(true);
                                                setIsFilterModalOpen(false);
                                                setRefreshing(true);
                                            }
                                        }} 
                                    />
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
                                                acc={item.acc}
                                                navigateTo={() => { props.navigation.navigate('TransactionByInsights', { alltransactions: spendTransactions, name: item.name }) }} 
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
                                                acc={item.acc}
                                                navigateTo={() => { props.navigation.navigate('TransactionByInsights', { alltransactions: incomeTransactions, name: item.name }) }}
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
                                                        {item.name}: {Math.round((item.value/totalIncome).toFixed(2) * 100)}%
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </View>

                                <View style={styles.lineAnalysisContainer}>
                                    <Text style={styles.lineContainerHeading}>
                                        Yearly Pattern
                                    </Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => setLineGraphSelected(0)}>
                                            <RadioButton selected={lineGraphSelected===0} />
                                            <Text style={[styles.lineContainerHeading, { fontSize: SIZES.medium - 1, color: lineGraphSelected===0? COLORS.gray3 : COLORS.gray1 }]}>
                                                Both                                                
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => setLineGraphSelected(1)}>
                                            <RadioButton selected={lineGraphSelected===1} />
                                            <Text style={[styles.lineContainerHeading, { fontSize: SIZES.medium - 1, color: lineGraphSelected===1? COLORS.gray3 : COLORS.gray1 }]}>
                                                Income                                                
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => setLineGraphSelected(2)}>
                                            <RadioButton selected={lineGraphSelected===2} />
                                            <Text style={[styles.lineContainerHeading, { fontSize: SIZES.medium - 1, color: lineGraphSelected===2? COLORS.gray3 : COLORS.gray1 }]}>
                                                Expense                                              
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.lineContainerHeading, { fontSize: SIZES.medium - 1 }]}>
                                        {lineGraphSelected===0? "Income vs Expense" : lineGraphSelected===1? "Income" : "Expense"} (in {abbToWord[maxYLabel]})
                                    </Text>
                                    <Text style={[styles.lineContainerHeading, { marginTop: -10, textAlign: 'center', fontSize: SIZES.regular }]}>
                                        F.Y. {date.getFullYear()}
                                    </Text>
                                    { monthlyExpense.length>0 && monthlyIncome.length>0 && (
                                    <View style={styles.lineChartContainer}>
                                        {lineGraphSelected===0? (
                                            <LineChart
                                                data={monthlyExpense}
                                                data2={monthlyIncome}
                                                color1={COLORS.gray1}
                                                color2={COLORS.main3}
                                                dataPointsColor1={COLORS.gray1}
                                                dataPointsColor2={COLORS.main3}
                                                yAxisTextStyle={styles.lineChartAxisText}
                                                xAxisLabelTextStyle={styles.lineChartAxisText}
                                                maxValue={maxYValue}
                                                noOfSections={5}
                                                spacing={50}
                                                verticalLinesSpacing={50}
                                                thickness={3}
                                                yAxisLabelSuffix={maxYLabel}
                                                showVerticalLines
                                                curved
                                                textShiftX={-5}
                                                textShiftY={-5}
                                                textColor={COLORS.gray2}
                                                textFontSize={SIZES.regular-1}
                                                textFontSize1={SIZES.regular-1}
                                            />
                                        ) : lineGraphSelected===1? (
                                            <LineChart
                                                data={monthlyIncome}
                                                color1={COLORS.main3}
                                                dataPointsColor1={COLORS.main3}
                                                yAxisTextStyle={styles.lineChartAxisText}
                                                xAxisLabelTextStyle={styles.lineChartAxisText}
                                                maxValue={maxYValue}
                                                noOfSections={5}
                                                spacing={50}
                                                verticalLinesSpacing={50}
                                                thickness={3}
                                                yAxisLabelSuffix={maxYLabel}
                                                showVerticalLines
                                                curved
                                                textShiftX={-5}
                                                textShiftY={-5}
                                                textColor={COLORS.gray2}
                                                textFontSize={SIZES.regular-1}
                                            />
                                        ) : (
                                            <LineChart
                                                data={monthlyExpense}
                                                color1={COLORS.gray1}
                                                dataPointsColor1={COLORS.gray1}
                                                yAxisTextStyle={styles.lineChartAxisText}
                                                xAxisLabelTextStyle={styles.lineChartAxisText}
                                                maxValue={maxYValue}
                                                noOfSections={5}
                                                spacing={50}
                                                verticalLinesSpacing={50}
                                                thickness={3}
                                                yAxisLabelSuffix={maxYLabel}
                                                showVerticalLines
                                                curved
                                                textShiftX={-5}
                                                textShiftY={-5}
                                                textColor={COLORS.gray2}
                                                textFontSize={SIZES.regular-1}
                                            />
                                        )}
                                    </View>)}
                                    <View style={styles.lineLegendsContainer}>
                                        {lineGraphSelected!==1 && (
                                            <View style={styles.lineLegend} >
                                                <View style={styles.lineLegendDot(COLORS.gray1)} />
                                                <Text style={styles.lineLegendText}>
                                                    Expense
                                                </Text>
                                            </View>
                                        )}
                                        {lineGraphSelected!==2 && (
                                            <View style={styles.lineLegend} >
                                                <View style={styles.lineLegendDot(COLORS.main3)} />
                                                <Text style={styles.lineLegendText}>
                                                    Income
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        )}

                    </View>
                </View>
            </View>
}
        </SafeAreaView>
    )
}

export default InsightsPage;