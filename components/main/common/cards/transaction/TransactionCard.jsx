import { View, Text, TouchableOpacity, Image } from "react-native";
import { moneyTextHelper } from "../../../../../utils";
import styles from "./transactioncard.style";

const TransactionCard = ({ name, image, timestamp, amount, isExpense, navigateTo,category, id, url, accountNumber, tnxid=null, description=null }) => {
  return (
    <TouchableOpacity 
        style={styles.cardContainer}
        activeOpacity={0.6}
        onPress={() => navigateTo('TransactionDetailsPage', {name, image, time: timestamp, amount, category, id, isExpense, acc: accountNumber, url, tnxid, description})}
    >
        <View style={styles.transactionDetailsContainer}>
            <Image
                source={ url ? {uri: image} : image}
                style={styles.transactionImage}
            />
            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} style={styles.transactionTitle}>
                    {name}
                </Text>
                <Text numberOfLines={1} style={styles.transactionTime}>
                    {timestamp}
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