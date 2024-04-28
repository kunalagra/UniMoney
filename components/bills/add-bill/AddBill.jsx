import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../../constants";
import { useState, useEffect } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import styles from "./addbill.style";
import { useSelector } from "react-redux";
import PushNotification from "react-native-push-notification";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BACKEND_URL } from "@env";

const CustomDropdown = ({ data, value, setValue }) => {
    return (
        <Dropdown
            style={{ backgroundColor: COLORS.white3, borderColor: COLORS.white5, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, width: 180 }}
            placeholderStyle={{ fontFamily: FONT.regular, fontSize: SIZES.medium - 2, color: COLORS.gray3 }}
            selectedTextStyle={{ fontFamily: FONT.regular, fontSize: SIZES.medium - 2, color: COLORS.gray3 }}
            data={data}
            itemTextStyle={{ fontFamily: FONT.regular, fontSize: SIZES.medium - 2, color: COLORS.gray3 }}
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

    PushNotification.configure({
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            props.navigation.navigate('BillsPage');
        },
        requestPermissions: Platform.OS === 'ios',
        popInitialNotification: true,
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

    });

    PushNotification.requestPermissions();


    const { ArrowleftIcon } = icons;

    const { Categories } = useSelector(state => state.transactiondata);
    const [categoryList, setCategoryList] = useState(Categories.map((item) => {
        if (item.details)
            return {
                label: item.details.name,
                value: item.details.name
            }
    }));


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

    const reminderList = [
        { label: "Does not repeat", value: "does-not-repeat" },
        { label: "Monthly", value: "monthly" },
        { label: "Bi-Monthly", value: "bi-monthly" },
        { label: "Quarterly", value: "quarterly" },
        { label: "Every 6 months", value: "every-6-months" },
        { label: "Yearly", value: "yearly" },
    ]

    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState(categoryList[0].label);
    const [date, setDate] = useState(new Date());
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [reminder, setReminder] = useState("");

    const setReminderValue = async () => {
        // console.log('Reminder set');
        if (name === '' || amount === '' || category === '' || reminder === '') {
            alert('Please fill all the fields');
            return;
        }

        const options = {
            method: 'POST',
            url: `${REACT_APP_BACKEND_URL}/reminder/create`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            },
            data: {
                title: name,
                date: date,
                amount: amount,
                category: category,
                description: desc,
                repeat: reminder
            }
        };
        try {
            const response = await axios.request(options).then((res) => {
                PushNotification.localNotificationSchedule({
                    channelId: "reminders",
                    title: name,
                    message: `You have a reminder for ${name} of amount ${amount}. ${desc}`,
                    date: date,
                    allowWhileIdle: true,
                    // repeatType: reminder === "does-not-repeat" ? '' : reminder === "monthly" ? 'month' : reminder === "bi-monthly" ? 'month' : reminder === "quarterly" ? 'month' : reminder === "every-6-months" ? 'month' : 'year',
                });
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2 }}>
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
                                Add Reminder
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.messageText}>
                        Easily add bill / reminders for House rent, Society charges, Educational free, Insurance, etc with its recurring schedule and UniMoney will send you timely reminders.
                    </Text>

                    <View style={styles.mainContainer}>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Category
                            </Text>
                            <CustomDropdown data={categoryList} value={category} setValue={setCategory} />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Name
                            </Text>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                placeholder="Name of biller, policy, person, etc."
                                value={name}
                                onChangeText={(val) => setName(val)}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.green1}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Description{'\n'}(optional)
                            </Text>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                placeholder="Reference, Account number, etc."
                                value={desc}
                                onChangeText={(val) => setDesc(val)}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.green1}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
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
                                selectionColor={COLORS.green1}
                                placeholderTextColor={COLORS.gray3}
                                numberOfLines={1}
                                leftIconContainerStyle={{ paddingLeft: 10 }}
                                leftIcon={<Icon name="currency-rupee" color={COLORS.gray3} size={17} />}
                            />
                        </View>

                        <View style={styles.rowField}>
                            <Text style={styles.rowHeader}>
                                Reminder
                            </Text>
                            <CustomDropdown data={reminderList} value={reminder} setValue={setReminder} />
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
                                    setDate(date);
                                    setIsDateModalOpen(false);
                                }}
                                onCancel={() => {
                                    setIsDateModalOpen(false);
                                }}
                                mode="datetime"
                                minimumDate={new Date()}
                            />
                        </View>


                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.upperButton}
                            activeOpacity={0.85}
                            onPress={() => { setReminderValue() }}
                        >
                            <Text style={styles.buttonText}>
                                Save & Add more
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.lowerButton}
                            activeOpacity={0.85}
                            onPress={() => { props.navigation.pop(), setReminderValue() }}
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