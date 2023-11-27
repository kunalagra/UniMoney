import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS, images } from "../../../constants";

const styles = StyleSheet.create({

    mainContainer: {
        width: '100%', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: 10, 
        paddingHorizontal: 20
    },

    settingsIcon: {
        width: 32, 
        height: 32, 
        stroke: COLORS.gray1
    },

    profileImage: {
        width: 32, 
        height: 32, 
        resizeMode: 'contain',
        tintColor: COLORS.gray1
    },

    nameContainer: {
        width: '100%', 
        paddingHorizontal: 20
    },

    nameText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.xLarge, 
        color: COLORS.gray3
    },

    expenseCardsContainer: {
        width: '100%'
    },

    expenseCardsList: {
        gap: 10, 
        paddingHorizontal: 20, 
        paddingBottom: 5
    },

    recentTransactionsContainer: {
        width: '100%', 
        paddingHorizontal: 20, gap: 20
    },

    transactionsHeadingContainer: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between'
    },

    transactionsHeading: {
        color: COLORS.gray3, 
        fontFamily: FONT.bold, 
        fontSize: SIZES.medium 
    },

    showAllText: {
        color: COLORS.gray1, 
        fontFamily: FONT.bold, 
        fontSize: SIZES.small, 
        textDecorationLine: 'underline'
    },

    transactionsContainer: {
        gap : 10
    }

});

export default styles;