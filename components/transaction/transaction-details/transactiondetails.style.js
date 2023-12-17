import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({

    upperContainer: {
        backgroundColor: COLORS.green1, 
        padding: 20, 
        paddingBottom: 50, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 50
    },

    navbar: {
        width: '100%'
    },

    arrowleftIcon: {
        width: 24, 
        height: 24
    },

    transactionDetailsContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20
    },

    paymentText: {
        color: COLORS.white1, 
        fontFamily: FONT.bold, 
        fontSize: SIZES.medium + 2
    },

    transactionContainer: {
        backgroundColor: COLORS.white1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 30, 
        paddingVertical: 20, 
        borderRadius: 18, 
        gap: 12
    },

    transactionDetails: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20
    },

    transactionImage:{
        width: 40, 
        height: 40, 
        resizeMode: 'contain'
    },

    transactionTitleContainer: {
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        gap: 4
    },

    transactionTitle: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3     
    },

    transactionTime: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.small, 
        color: COLORS.gray1
    },

    transactionAmount: (isExpense) => ({
        fontFamily: FONT.medium, 
        fontSize: SIZES.xxLarge, 
        color: isExpense? COLORS.gray3 : COLORS.green1
    }),

    bottomContainer: {
        padding: 20, 
        gap: 30,
        paddingBottom: 100
    },

    bottomTextContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 6
    },

    bottomText1: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium + 2, 
        color: COLORS.gray3
    },

    bottomText2: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.small, 
        color: COLORS.gray3
    },

    categoriesConatainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        rowGap: 15, 
        columnGap: 10
    },

    categoryContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    categoryBackground: (isActive) => ({
        padding: 5, 
        backgroundColor: isActive? COLORS.orange1 : 'transparent', 
        borderRadius: 8
    }),

    categoryImage: {
        width: 40, 
        height: 40, 
        resizeMode: 'contain'
    },

    categoryTitle: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.small, 
        color: COLORS.gray3
    }

});

export default styles;