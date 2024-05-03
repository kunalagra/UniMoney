import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../../../constants";

const styles = StyleSheet.create({

    cardContainer: {
        borderRadius: 10, 
        shadowRadius: 10,
        ...SHADOWS.medium, 
    },

    gradientBackground: {
        width: 320, 
        borderRadius: 10, 
        position: 'relative'
    },

    cardDetailsContainer: {
        alignSelf: 'stretch',
        padding: 15, 
        gap: 15
    },

    imageContainer: {
        position: 'absolute', 
        bottom: 5, 
        left: 0 
    },

    image: {
        width: 60, 
        height: 60, 
        resizeMode: 'contain'
    },

    tabsContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20
    },

    tabTextContainer: (isSelected) => ({
        backgroundColor: isSelected? COLORS.gold2 : 'transparent',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 7,
    }),

    tabText: (isSelected) => ({
        color: isSelected? COLORS.white1 : COLORS.gray3,
        fontFamily: FONT.bold,
        fontSize: SIZES.small
    }),

    amountContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    amountText: (isExpense) => ({
        fontFamily: FONT.bold, 
        fontSize: SIZES.xxLarge, 
        color: isExpense? COLORS.gray3 : COLORS.green1
    }),

    insightsLinkContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    insightsLink: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.small - 2, 
        color: COLORS.gray3
    },

    insightsLinkText: {
        textDecorationLine: 'underline'
    }
    
});

export default styles;