import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import styles from "./addtransaction.style";

const CustomDropdown = ({data, value, setValue}) => {
    return (
        <Dropdown
            style={{backgroundColor: COLORS.white3, borderColor: COLORS.white5, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, width: 180}}
            placeholderStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            selectedTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            data={data}
            itemTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            placeholder={data[0].label}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
        />
    )
}


const AddTransactionPage = (props) => {

    const { ArrowleftIcon } = icons;

    const typeOfPaymentList = [
        { label: "Expense", value: "expense" },
        { label: "Income", value: "income" },
    ];

    const accountList = [
        { label: "PAYTM Bank", value: "paytm-bank" },
        { label: "Federal Bank", value: "federal-bank" },
        { label: "Kotak Mahindra Bank", value: "kotak-bank" },
    ];

    const categoryList = [
        { label: "ATM", value: "atm" },
        { label: "Bills", value: "bills" },
        { label: "Education", value: "education" },
        { label: "Entertainment", value: "entertainment" },
        { label: "Food & drinks", value: "food-and-drinks" },
        { label: "Fuel", value: "fuel" },
        { label: "Gadgets", value: "gadgets" },
        { label: "Groceries", value: "groceries" },
        { label: "Health", value: "health" },
        { label: "Household", value: "household" },
        { label: "House rent", value: "house-rent" },
        { label: "Insurance", value: "insurance" },
        { label: "Investment", value: "investment" },
        { label: "Payments", value: "payments" },
        { label: "Shopping", value: "shopping" },
        { label: "Transfers", value: "transfers" },
        { label: "Travel", value: "travel" },
    ];

    const [typeOfPayment, setTypeOfPayment] = useState(typeOfPaymentList[0].label);
    const [debitAcc, setDebitAcc] = useState(accountList[0].label);
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState(categoryList[0].label);
    const [date, setDate] = useState(new Date());
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [amount, setAmount] = useState("");

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
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
                                Debit Account
                            </Text>
                            <CustomDropdown data={accountList} value={debitAcc} setValue={setDebitAcc} />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Description
                            </Text>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                placeholder="Name of shop, product, etc."
                                value={desc}
                                onChangeText={(val) => setDesc(val)}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.gray3}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Category
                            </Text>
                            <CustomDropdown data={categoryList} value={category} setValue={setCategory} />
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
                                selectionColor={COLORS.gray3}
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
                            onPress={() => {}}
                        >
                            <Text style={styles.buttonText}>
                                Save & Add more
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.lowerButton}
                            activeOpacity={0.85}
                            onPress={() => props.navigation.pop()}
                        >
                            <Text style={styles.buttonText}>
                                Save & Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default AddTransactionPage;