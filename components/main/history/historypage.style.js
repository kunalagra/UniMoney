import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({

    sectionContainer: {
        position: 'relative'
    },

    mainContainer: {
        width: '100%', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 15, 
        paddingHorizontal: 20
    },

    arrowLeftIcon: {
        width: 24, 
        height: 24,
    },

    navHeading: {
        color: COLORS.gray3, 
        fontFamily: FONT.medium, 
        fontSize: SIZES.large - 2
    },

    container: {
        width: '100%', 
        paddingHorizontal: 20, 
        gap: 20
    },

    transactionsHeadingContainer: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    arrowText: {
        color: COLORS.gray3, 
        fontFamily: FONT.medium, 
        fontSize: SIZES.large
    },

    dateHeading: {
        color: COLORS.gray3, 
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium
    },

    headingIconsContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20
    },

    calendarIcon: {
        width: 24, 
        height: 24,
        tintColor: COLORS.main3
    },

    filterIcon: {
        width: 28, 
        height: 28,
        tintColor: COLORS.main3
    },

    transactionsContainer: {
        gap : 10,
        marginBottom: 400
    },

    addButtonContainer: { 
        position: 'absolute', 
        bottom: 195, 
        left: '50%', 
        transform: [{ translateX: -75 }]
    },

    addButton: {
        backgroundColor: COLORS.main3, 
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 12, 
        ...SHADOWS.small 
    },

    addButtonText: {
        fontFamily: FONT.medium, 
        color: COLORS.white1,
        fontSize: SIZES.regular
    }

});

export default styles;