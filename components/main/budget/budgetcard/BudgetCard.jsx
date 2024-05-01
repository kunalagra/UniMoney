import { Image, Text, TouchableOpacity, View } from "react-native";
import { moneyTextHelper } from "../../../../utils";
import styles from "./budgetcard.style";


const BudgetCard = ({title="Monthly Budget", image=null, budgetSet, currentSpends, handlePress, isFocused=false }) => {

    const progress = Math.min(100, Math.round((currentSpends/budgetSet) * 100));
    
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            {image &&
                <Image
                    source={{uri: image}}
                    style={styles.cardImage}
                />
            }
            <View style={styles.cardDetailsContainer}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardHeading}>
                        {title}
                    </Text>
                    <Text style={styles.cardText}>
                        Spent ₹ {moneyTextHelper(currentSpends)} of ₹ {moneyTextHelper(budgetSet)}
                    </Text>
                </View>
                
                <View style={styles.cardProgressContainer}>
                    <View 
                        style={styles.cardProgress(progress)} 
                    />
                </View>

                <View style={styles.cardTextContainer}>
                    {!isFocused && (
                        <Text style={styles.cardText}>
                            Tap to view
                        </Text>
                    )}
                    <Text style={styles.cardText}>
                        Safe to spend: ₹ {(budgetSet/30).toFixed(2)} per day
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default BudgetCard;