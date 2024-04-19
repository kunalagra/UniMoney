import { BottomSheet } from "@rneui/themed";
import { COLORS, icons } from "../../../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import BudgetCard from "../budgetcard/BudgetCard";
import styles from "./budgetdetailsbar.style";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { spendingCategories } from "../../../../utils";
import { budgetModeCategories } from "../../../../constants/fakeData";


const BudgetDetailsBar = ({ visible, setVisibility, selectedCategory, setSelectedCategory, handleBudgetPress, isAddCategory, setIsAddCategory }) => {

    const { details, currentSpend, limit } = selectedCategory;

    const { WalletIcon, DocumentIcon, AddIcon } = icons;

    const [remainingCategories, setRemainingCategories] = useState([]);

    const [value, setValue] = useState("");

    useEffect(() => {

        if (isAddCategory) {
            const tmp = [];
            for (let i=0; i<spendingCategories.length; i++) {
                let found = false;
                for (let j=0; j<budgetModeCategories.length; j++) {
                    if (budgetModeCategories[j].title===spendingCategories[i].name) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tmp.push({title: spendingCategories[i].name, image: spendingCategories[i].image, currentSpend: 0, budgetSet: 0})
                }
            }
            setRemainingCategories([...tmp]);
            if (tmp.length > 0) {
                setSelectedCategory(tmp[0]);
            }
        }

    }, [visible]);

    if (isAddCategory && remainingCategories.length===0) {
        return (
            <BottomSheet
                onBackdropPress={() => {setVisibility(false); setIsAddCategory(false);}}
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
            onBackdropPress={() => {setVisibility(false); setIsAddCategory(false);}}
            isVisible={visible}
        >
            <View style={styles.container}>

                <View style={styles.barHandle} />

                <View style={styles.mainContainer}>
                    {
                        isAddCategory?
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
                                    placeholder={remainingCategories.length > 0? remainingCategories[0].title : ""}
                                    labelField="title"
                                    valueField="title"
                                    value={value}
                                    onChange={item => {
                                        setValue(item.title);
                                        setSelectedCategory(item);
                                    }}
                                    /> 
                            </View>
                        ) : (
                            <View style={styles.cardContainer}>
                                <BudgetCard 
                                    title={ details ? details.name: ''}
                                    image={ details ? details.img: ''}
                                    currentSpends={currentSpend}
                                    budgetSet={limit}
                                    handlePress={() => {}}
                                />
                            </View>
                        )
                    }
                    
                </View>

                <View style={styles.optionsContainer}>
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
                            {isAddCategory? "Set" : "Update"} budget
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionContainer}
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
                    >
                        <AddIcon  
                            width={30}
                            height={30}
                            fill={COLORS.gray3}
                        />
                        <Text style={styles.iconText}>
                            Add expense
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

export default BudgetDetailsBar;