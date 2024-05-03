import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        minHeight: '100%'
    },

    mainContainer: { 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
        alignSelf: 'stretch',
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

    navIcon: {
        width: 32, 
        height: 32, 
        resizeMode: 'contain'
    },

    nameContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 20
    },

    nameText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.xLarge, 
        color: COLORS.gray3
    },

    expenseCardsContainer: {
        alignSelf: 'stretch',
    },

    expenseCardsList: {
        gap: 10, 
        paddingHorizontal: 20, 
        paddingBottom: 5
    },

    recentTransactionsContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 20, gap: 20
    },

    transactionsHeadingContainer: {
        alignSelf: 'stretch',
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