import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        minHeight: '100%'
    },

    mainContainer: {
        width: '100%', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    userInputContainer: {
        width: '100%', 
        height: 52, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 5
    },

    inputOuterContainer: {
        width: '80%', 
        paddingHorizontal: 0, 
        height: 50, 
        flexGrow: 1
    },

    inputInnerContainer: {
        borderColor: COLORS.white5, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: COLORS.white3
    },

    inputStyle: {
        fontSize: SIZES.regular, 
        color: COLORS.gray2, 
        fontFamily: FONT.regular, 
        paddingHorizontal: 15
    },

    inputSendButton: {
        backgroundColor: COLORS.main3, 
        paddingVertical: 12, 
        paddingHorizontal: 12, 
        borderRadius: 8
    },

    inputSendIcon: {
        width: 24, 
        height: 24, 
        tintColor: COLORS.white1
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

    navIcon: {
        width: 32, 
        height: 32, 
        resizeMode: 'contain'
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