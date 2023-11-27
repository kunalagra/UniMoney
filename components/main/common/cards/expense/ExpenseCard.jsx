import LinearGradient from "react-native-linear-gradient";
import { COLORS, images } from "../../../../../constants";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "./expensecard.style";



const ExpenseCard = ({ item }) => {

    const [isExpenseSelected, setExpenseSelected] = useState(true);

  return (
    <View 
        style={styles.cardContainer}
    >
        <LinearGradient
            colors={[ COLORS.lightGold1, COLORS.lightGold2, COLORS.gold1 ]}
            style={styles.gradientBackground}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        >
            <View style={styles.cardDetailsContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={images.coinstack}
                        style={styles.image}
                    />
                </View>
                <View style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={styles.tabTextContainer(isExpenseSelected)}
                        activeOpacity={0.85}
                        onPress={() => setExpenseSelected(prev => !prev)}
                        >
                        <Text
                            style={styles.tabText(isExpenseSelected)}
                        >Daily Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.tabTextContainer(!isExpenseSelected)}
                        activeOpacity={0.85}
                        onPress={() => setExpenseSelected(prev => !prev)}
                        >
                        <Text
                            style={styles.tabText(!isExpenseSelected)}
                        >Daily Income</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText(isExpenseSelected)}>
                        ₹ 1,359
                    </Text>
                </View>
                <View
                    style={styles.insightsLinkContainer}
                >
                    <TouchableOpacity 
                        activeOpacity={0.5}
                    >
                        <Text style={styles.insightsLink}>
                            <Text style={styles.insightsLinkText}>
                                Check your spendings 
                            </Text>
                            {' >'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    </View>
  )
}

export default ExpenseCard;