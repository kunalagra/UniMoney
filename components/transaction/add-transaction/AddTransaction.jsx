import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../../constants";
import { useState, useEffect } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import styles from "./addtransaction.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from "@env";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { setAllTransactions } from '../../../store/transactiondata'
import { useSelector, useDispatch } from 'react-redux';
import { formatDateTime } from "../../../utils";

const CustomDropdown = ({data, value, setValue, icon='', setIcon}) => {
    return (
        <Dropdown
            style={{backgroundColor: COLORS.white3, borderColor: COLORS.white5, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, width: 200}}
            placeholderStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            selectedTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            data={data}
            itemTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            placeholder={data[0].label}
            labelField="label"
            valueField="value"
            renderLeftIcon={(item) => {
                return (
                    <>
                    {icon &&
                    <Image
                        source={{uri: icon}}
                        style={{width: 20, height: 20, marginRight: 10}}
                    />}
                    </>
                )
            }}
            renderItem={(item) => {
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center', margin:15}}>
                        {item.image &&
                        <Image
                            source={{uri: item.image}}
                            style={{width: 20, height: 20, marginRight: 10}}
                        />}
                        <Text style={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}>
                            {item.label}
                        </Text>
                    </View> 
                )         
            }}
            value={value}
            onChange={item => {
                setValue(item.value);
                if(icon){
                setIcon(item.image);
                }
            }}
        />
    )
}


const AddTransactionPage = (props) => {

    const dispatch = useDispatch();

    const { ArrowleftIcon } = icons;
    const { params } = props.route;
    const categoryName = params ? params.categoryName : null;
    const typeOfPaymentList = [
        { label: "Expense", value: "debit" },
        { label: "Income", value: "credit" },
    ];
    const { alltransactions } = useSelector(state => state.transactiondata);

    // const accountList = [
    //     { label: "PAYTM Bank", value: "paytm-bank" },
    //     { label: "Federal Bank", value: "federal-bank" },
    //     { label: "Kotak Mahindra Bank", value: "kotak-bank" },
    // ];

    // const categoryList = [
    //     { label: "ATM", value: "atm" },
    //     { label: "Bills", value: "bills" },
    //     { label: "Education", value: "education" },
    //     { label: "Entertainment", value: "entertainment" },
    //     { label: "Food & drinks", value: "food-and-drinks" },
    //     { label: "Fuel", value: "fuel" },
    //     { label: "Gadgets", value: "gadgets" },
    //     { label: "Groceries", value: "groceries" },
    //     { label: "Health", value: "health" },
    //     { label: "Household", value: "household" },
    //     { label: "House rent", value: "house-rent" },
    //     { label: "Insurance", value: "insurance" },
    //     { label: "Investment", value: "investment" },
    //     { label: "Payments", value: "payments" },
    //     { label: "Shopping", value: "shopping" },
    //     { label: "Transfers", value: "transfers" },
    //     { label: "Travel", value: "travel" },
    // ];

    const [accountList, setAccountList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState('');

    useEffect(() => {
        setLoading(true);
        const getInitialData = async () => {
            const options = {
                method: 'GET',
                url: `${REACT_APP_BACKEND_URL}/transaction/info`,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                },
            };
            try {
                const response = await axios(options);
                if (response.data.bank.length !== 0) {
                setAccountList(response.data.bank.map((item) => {
                    return {
                        label: item.id.name,
                        value: item.number
                    }
                }));
            }
            // add cash account to the list
            setAccountList((prev) => {
                return [
                    ...prev,
                    {
                        label: "Cash",
                        value: 0
                    }
                ]
            });
            setIcon(response.data.category[0].details.img);
                setCategoryList(response.data.category.map((item) => {
                    if (item.details)
                    return {
                        label: item.details.name,
                        value: item.details.name,
                        image: item.details.img
                    }
                }));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getInitialData();
    }, []);

    const postTransaction = async () => {
        if (amount === "" || category === "") {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            return;
        }
        const options = {
            method: 'POST',
            url: `${REACT_APP_BACKEND_URL}/transaction/add`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            },
            data: {
                    type: typeOfPayment,
                    amount: amount,
                    category: {
                        name: category
                    },
                    date: date.getTime(),
                    acc: account,
                    name: receiverID,
                    txid: 0,
                    comment: desc
            }
        }
        try {
            const response = await axios(options);

            // update the transaction list in the redux store with the new transaction
            const newTransaction = response.data;
            newTransaction.timestamp = formatDateTime(newTransaction.date);
            newTransaction.isExpense = newTransaction.type === 'debit' ? true : false;

            // add the new transaction to the list of all transactions in the redux store and sort it by date
            const newTransactionList = [...alltransactions, newTransaction].sort((a, b) => b.date - a.date);

            dispatch(setAllTransactions(newTransactionList));
            
            ToastAndroid.show("Transaction added successfully", ToastAndroid.SHORT);
            props.navigation.pop();
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



    const [typeOfPayment, setTypeOfPayment] = useState(typeOfPaymentList[0].value);
    const [account, setAccount] = useState(0);
    const [receiverID, setReceiverID] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState(categoryName ? categoryName : '');
    const [date, setDate] = useState(new Date());
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [amount, setAmount] = useState("");

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            { loading ? 
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity 
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon
                                style={styles.arrowleftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.navHeading}>
                                Add Transaction
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch' }}>
                        <SkeletonPlaceholder borderRadius={4} direction='right'>
                            <SkeletonPlaceholder.Item gap={15}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={150} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={150} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={150} height={80} borderRadius={10} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={150} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <SkeletonPlaceholder.Item width={150} height={40} borderRadius={10} />
                                    <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                                </View>
                                <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>    
                </View>
            : 
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity 
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon
                                style={styles.arrowleftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.navHeading}>
                                Add Transaction
                            </Text>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Type
                            </Text>
                            <CustomDropdown data={typeOfPaymentList} value={typeOfPayment} setValue={setTypeOfPayment} />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                { typeOfPayment === "debit" ? "Debit\n" : "Credit\n" }Account
                            </Text>
                            {accountList.length===0? (
                                <TouchableOpacity
                                    style={{ backgroundColor: COLORS.gray1, paddingVertical: 10, borderRadius: 8, width: 200 }}
                                    activeOpacity={0.85}
                                    onPress={() => props.navigation.navigate('Banks')}
                                >
                                    <Text style={styles.buttonText}>
                                        Add an account
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <CustomDropdown data={accountList} value={account} setValue={setAccount} />
                            )}
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                { typeOfPayment === "debit" ? "Receiver" : "Sender" }
                            </Text>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                placeholder="Name of person, place, etc."
                                value={receiverID}
                                onChangeText={(val) => setReceiverID(val)}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.main4}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <View>
                                <Text style={styles.rowHeader}>
                                    Description
                                </Text>
                                <Text style={[styles.rowHeader, { fontSize: SIZES.small }]}>
                                    (optional)
                                </Text>
                            </View>
                            <Input
                                containerStyle={[styles.inputOuterContainer, { height: 100 }]}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={[styles.inputStyle, { textAlignVertical: 'top' }]}
                                placeholder="Name of shop, product, etc."
                                value={desc}
                                onChangeText={(val) => setDesc(val)}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.main4}
                                placeholderTextColor={COLORS.gray3}
                                multiline
                                numberOfLines={5}
                                maxLength={200}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Category
                            </Text>
                            <CustomDropdown data={categoryList} value={category} setValue={setCategory} icon={icon} setIcon={setIcon} />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Date
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsDateModalOpen(true)}
                                style={styles.dateButtonStyle}
                            >
                                <Text style={styles.rowValueText}>
                                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                                </Text>
                                <Image
                                    source={images.calendar} 
                                    style={styles.calendarIcon}
                                />
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={isDateModalOpen}
                                date={date}
                                onConfirm={(date) => {
                                    const cur = new Date();
                                    if (date <= cur) {
                                        setIsDateModalOpen(false);
                                        setDate(date);
                                    }
                                }}
                                onCancel={() => {
                                    setIsDateModalOpen(false);
                                }}
                                maximumDate={new Date()}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Amount
                            </Text>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                placeholder="XXXXX"
                                inputMode="numeric"
                                value={amount}
                                onChangeText={(val) => {
                                    if (isNaN(val))
                                        setAmount('');
                                    else if (val <= Math.pow(10, 6))
                                        setAmount(val);
                                }}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.main4}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
                                leftIconContainerStyle={{ paddingLeft: 10 }}
                                leftIcon={<Icon name="currency-rupee" color={COLORS.gray3} size={17} />}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.upperButton}
                            activeOpacity={0.85}
                            onPress={() => {postTransaction()}}
                        >
                            <Text style={styles.buttonText}>
                                Save
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.lowerButton}
                            activeOpacity={0.85}
                            onPress={() => {props.navigation.pop()}}
                        >
                            <Text style={styles.buttonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
}

        </SafeAreaView>
    )
}

export default AddTransactionPage;