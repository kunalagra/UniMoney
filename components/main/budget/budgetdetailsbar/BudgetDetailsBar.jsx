import { BottomSheet,Icon, Input } from "@rneui/themed";
import { COLORS, icons } from "../../../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import BudgetCard from "../budgetcard/BudgetCard";
import styles from "./budgetdetailsbar.style";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
// import { spendingCategories } from "../../../../utils";
// import { budgetModeCategories } from "../../../../constants/fakeData";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from "@env";

const BudgetDetailsBar = ({ visible, setVisibility, selectedCategory, setSelectedCategory, handleBudgetPress, isAddCategory, setIsAddCategory, budgetModeCategories, setRefreshing, navigateTo}) => {

    const { details, currentSpend, limit } = selectedCategory;
    const { Categories } = useSelector(state => state.transactiondata);


    const { WalletIcon, DocumentIcon, AddIcon } = icons;

    const [remainingCategories, setRemainingCategories] = useState([]);

    const [value, setValue] = useState("");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        // console.log(budgetModeCategories);
        // console.log(Categories);
        if (isAddCategory) {
            const tmp = [];
            for (let i = 0; i < Categories.length; i++) {
                let found = false;
                for (let j = 0; j < budgetModeCategories.length; j++) {
                    if (budgetModeCategories[j].details.name === Categories[i].details.name) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tmp.push({ title: Categories[i].details.name, img: Categories[i].details.img, currentSpend: 0, limit: 0 })
                }
            }
            setRemainingCategories([...tmp]);
            if (tmp.length > 0) {
                setSelectedCategory(tmp[0]);
                setTitle(tmp[0].title);
            }
        }

    }, [visible]);

    if (isAddCategory && remainingCategories.length === 0) {
        return (
            <BottomSheet
                onBackdropPress={() => { setVisibility(false); setIsAddCategory(false); }}
                isVisible={visible}
            >
                <View style={styles.container}>

                    <View style={styles.barHandle} />

                    <View style={styles.mainContainer}>
                        <View style={styles.newCategoryContainer}>
                            <Text style={styles.categoryTitle}>
                                No other categories found
                            </Text>
                        </View>
                    </View>

                </View>
            </BottomSheet>
        )
    }

    return (
        <BottomSheet
            onBackdropPress={() => { setVisibility(false); setIsAddCategory(false); }}
            isVisible={visible}
        >
            <View style={styles.container}>

                <View style={styles.barHandle} />

                <View style={styles.mainContainer}>
                    {
                        isAddCategory ?
                            (
                                <View style={styles.newCategoryContainer}>
                                    <Text style={styles.categoryTitle}>
                                        Category
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdownStyle}
                                        placeholderStyle={styles.dropdownText}
                                        selectedTextStyle={styles.dropdownText}
                                        data={remainingCategories}
                                        itemTextStyle={styles.dropdownText}
                                        placeholder={remainingCategories.length > 0 ? remainingCategories[0].title : ""}
                                        labelField="title"
                                        valueField="title"
                                        value={value}
                                        onChange={item => {
                                            setValue(item.title);
                                            setTitle(item.title);
                                            setSelectedCategory(item);
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={styles.cardContainer}>
                                    <BudgetCard
                                        title={details ? details.name : ''}
                                        image={details ? details.img : ''}
                                        currentSpends={currentSpend}
                                        budgetSet={limit}
                                        handlePress={() => { }}
                                    />
                                </View>
                            )
                    }

                </View>

                <View style={styles.optionsContainer}>
                    {isAddCategory ?
                        <View style={{paddingHorizontal: 20, 
                            marginBottom: 10, 
                            gap: 20,
                            width: '100%'}}>
                            <View style={{flexDirection: 'column', gap:2}}>
                                <Text style={styles.sheetHeading}>
                                {title}
                            </Text>
                            <Text style={{fontSize: 12, color: COLORS.gray3}}>
                                    set budget limit
                                </Text>
                            </View>
                            <Input
                                containerStyle={styles.inputOuterContainer}
                                inputContainerStyle={styles.inputInnerContainer}
                                style={styles.inputStyle}
                                inputMode="numeric"
                                value={amount}
                                onChangeText={(e) => setAmount(e)}
                                placeholder="(At least ₹ 1,000)"
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.green0}
                                placeholderTextColor={COLORS.gray2}
                                leftIconContainerStyle={{ paddingLeft: 10 }}
                                leftIcon={
                                    <View style={styles.leftIconContainerStyle}>
                                        <Icon name="currency-rupee" color={COLORS.gray1} size={17} />
                                        <Text style={styles.letIconContainerText}>
                                            Amount
                                        </Text>
                                    </View>
                                }
                            />

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                activeOpacity={0.85}
                                onPress={async () => {
                                    if (amount < 1000) {
                                        alert("Amount should be at least ₹ 1,000");
                                        return;
                                    }
                                    if (title === 'Monthly Budget') {
                                        await AsyncStorage.setItem('monthlyBudgetLimit', amount);
                                        setVisibility(false);
                                    } else {
                                        console.log(title, amount);
                                        const options = {
                                            method: 'PUT',
                                            url: `${REACT_APP_BACKEND_URL}/category/limit`,
                                            headers: {
                                                "Content-type": "application/json",
                                                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                                            },
                                            data: {
                                                name: title,
                                                limit: amount
                                            }
                                        }
                                        try {
                                            const response = await axios(options);
                                            console.log(response.data);
                                            setVisibility(false);
                                            setRefreshing(true);
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    Save Category
                                </Text>
                            </TouchableOpacity>
                        </View> : <>
                            <TouchableOpacity
                                style={styles.optionContainer}
                                onPress={handleBudgetPress}
                            >
                                <WalletIcon
                                    width={30}
                                    height={30}
                                    fill={COLORS.gray3}
                                    style={styles.iconStyle}
                                />
                                <Text style={styles.iconText}>
                                    {isAddCategory ? "Set" : "Update"} budget
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionContainer}
                                onPress={() => {
                                    if (details.name === "Monthly Budget") {
                                        navigateTo('TransactionByCat', { name: "Month" }),
                                            setVisibility(false);
                                    } else {
                                        navigateTo('TransactionByCat', { name: details.name }),
                                            setVisibility(false);
                                }

                                }}
                            >
                                <DocumentIcon
                                    width={30}
                                    height={30}
                                    fill={COLORS.main3}
                                />
                                <Text style={styles.iconText}>
                                    Transactions
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionContainer}
                                onPress={() => {
                                    navigateTo('AddTransactionPage', { categoryName: details.name === "Monthly Budget" ? "Payments" : details.name }),
                                        setVisibility(false);
                                }

                                }>
                                <AddIcon
                                    width={30}
                                    height={30}
                                    fill={COLORS.gray3}
                                />
                                <Text style={styles.iconText}>
                                    Add expense
                                </Text>
                            </TouchableOpacity>
                        </>}
                </View>
            </View>
        </BottomSheet>
    )
}

export default BudgetDetailsBar;