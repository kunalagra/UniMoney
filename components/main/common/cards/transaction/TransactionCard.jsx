import { View, Text, TouchableOpacity, Image } from "react-native";
import { moneyTextHelper } from "../../../../../utils";
import styles from "./transactioncard.style";

const TransactionCard = ({ transaction, navigateTo }) => {
  return (
    <TouchableOpacity 
        style={styles.cardContainer}
        activeOpacity={0.6}
        onPress={() => navigateTo('TransactionDetailsPage')}
    >
        <View style={styles.transactionDetailsContainer}>
            <Image
                source={transaction.image}
                style={styles.transactionImage}
            />
            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} style={styles.transactionTitle}>
                    {transaction.name}
                </Text>
                <Text numberOfLines={1} style={styles.transactionTime}>
                    {transaction.time}
                </Text>
            </View>
        </View>
        <View style={styles.amountDetailsContainer}>
            <View style={styles.amountContainer}>
                <Text numberOfLines={1} style={styles.amountText(transaction.isExpense)}>
                    {'₹ '}
                </Text>
                <Text numberOfLines={1} style={styles.amountText(transaction.isExpense)}>
                    {moneyTextHelper(transaction.amount)}
                </Text>
            </View>
            <View>
                <Text style={styles.amountText(transaction.isExpense)}>
                    {'>'}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default TransactionCard