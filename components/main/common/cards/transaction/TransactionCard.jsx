import { View, Text, TouchableOpacity, Image } from "react-native";
import { moneyTextHelper } from "../../../../../utils";
import styles from "./transactioncard.style";

const TransactionCard = ({ name, image, description, amount, isExpense, navigateTo }) => {
  return (
    <TouchableOpacity 
        style={styles.cardContainer}
        activeOpacity={0.6}
        onPress={() => navigateTo('TransactionDetailsPage')}
    >
        <View style={styles.transactionDetailsContainer}>
            <Image
                source={image}
                style={styles.transactionImage}
            />
            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} style={styles.transactionTitle}>
                    {name}
                </Text>
                <Text numberOfLines={1} style={styles.transactionTime}>
                    {description}
                </Text>
            </View>
        </View>
        <View style={styles.amountDetailsContainer}>
            <View style={styles.amountContainer}>
                <Text numberOfLines={1} style={styles.amountText(isExpense)}>
                    {'₹ '}
                </Text>
                <Text numberOfLines={1} style={styles.amountText(isExpense)}>
                    {moneyTextHelper(amount)}
                </Text>
            </View>
            <View>
                <Text style={styles.amountText(isExpense)}>
                    {'>'}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default TransactionCard