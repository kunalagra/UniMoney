import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20, 
        marginTop: 10, 
        marginBottom: 100,
        gap: 30, 
        height: '100%'
    },

    navbar: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 20
    },

    arrowleftIcon: {
        width: 24, 
        height: 24
    },

    navHeader: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large - 2, 
        color: COLORS.gray3
    },

    cardContainer: {
        width: '100%', 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        backgroundColor: COLORS.white1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderRadius: 10
    },

    transactionDetailsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20, 
        width: '50%'
    },

    transactionImage: {
        width: 28, 
        height: 28, 
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
        width: '30%', 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        gap: 10
    },

    amountContainer: {
        width: '70%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },

    amountText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    addButtonContainer: {
        position: 'absolute', 
        bottom: 20, 
        left: '50%', 
        transform: [{ translateX: -68 }]
    },

    addButton: {
        backgroundColor: COLORS.main3, 
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 12, 
        ...SHADOWS.small
    },

    buttonText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.white1
    }


})

export default styles;