import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        minHeight: '100%'
    },

    chatButtonContainer: {
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        zIndex: 1
    },

    chatButton: {
        backgroundColor: COLORS.main3, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 8
    },

    chatIcon: {
        width: 40, 
        height: 40, 
        tintColor: COLORS.white1
    },

    chatModal: {
        backgroundColor: COLORS.white2, 
        width: '90%', 
        height: '90%', 
        alignSelf: 'center', 
        borderRadius: 12, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10, 
        gap: 10
    },

    chatModalHeader: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 10
    },

    chatModalHeadingContainer: {
        width: '50%', 
        flexGrow: 1
    },

    chatModalHeading: {
        color: COLORS.gray3, 
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        textAlign: 'center'
    },

    chatModalCloseIcon: {
        width: 20, 
        height: 20, 
        tintColor: COLORS.gray1
    },

    chatContainer: {
        width: '100%', 
        backgroundColor: COLORS.white3, 
        borderWidth: 1, 
        borderColor: COLORS.white5, 
        flexGrow: 1, 
        borderRadius: 8, 
        height: '10%'
    },

    userMessage: {
        backgroundColor: COLORS.main3, 
        alignSelf: 'flex-end', 
        padding: 8, 
        marginHorizontal: 5, 
        marginVertical: 2, 
        borderRadius: 10, 
        borderBottomRightRadius: 0
    },

    chatbotMessage: {
        backgroundColor: COLORS.gray1, 
        alignSelf: 'flex-start', 
        padding: 8, 
        marginHorizontal: 5, 
        marginVertical: 2, 
        borderRadius: 10, 
        borderBottomLeftRadius: 0
    },

    chatMessageText: {
        color: COLORS.white1, 
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular
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