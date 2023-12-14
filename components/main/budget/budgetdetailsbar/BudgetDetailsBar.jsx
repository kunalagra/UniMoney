import { BottomSheet } from "@rneui/themed";
import { COLORS, FONT, SIZES, icons } from "../../../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import BudgetCard from "../budgetcard/BudgetCard";
import styles from "./budgetdetailsbar.style";


const BudgetDetailsBar = ({ visible, setVisibility, selectedCategory, handleBudgetPress }) => {

    const { title, image, currentSpend, budgetSet } = selectedCategory;

    const { WalletIcon, DocumentIcon, AddIcon } = icons;

    return (
        <BottomSheet
            onBackdropPress={() => setVisibility(false)}
            isVisible={visible}
        >
            <View style={styles.container}>

                <View style={styles.barHandle} />

                <View style={styles.mainContainer}>
                    <View style={styles.cardContainer}>
                        <BudgetCard 
                            title={title}
                            image={image}
                            currentSpends={currentSpend}
                            budgetSet={budgetSet}
                            handlePress={() => {}}
                        />
                    </View>
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
                            Update budget
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