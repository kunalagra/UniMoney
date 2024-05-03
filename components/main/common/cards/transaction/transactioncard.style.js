import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../../../constants";

const styles = StyleSheet.create({

    cardContainer: {
        alignSelf: 'stretch',
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        backgroundColor: COLORS.white1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderRadius: 10,
        gap: 5
    },

    transactionDetailsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20, 
        flex: 1.3
    },

    transactionImage: {
        width: 24, 
        height: 24, 
        resizeMode: 'contain', 
        borderRadius: 6
    },

    detailsContainer: {
        gap: 6
    },

    transactionTitle: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    transactionTime: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.small, 
        color: COLORS.gray1
    },

    amountDetailsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        gap: 10
    },

    amountContainer: {
        flex: 0.7, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },

    amountText: (isExpense) => ({
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: isExpense? COLORS.gray3 : COLORS.green1
    }),
    
});

export default styles;