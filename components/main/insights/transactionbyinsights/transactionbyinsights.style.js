import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({

    sectionContainer: {
        position: 'relative',
        height: '100%'
    },

    mainContainer: {
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
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
        paddingHorizontal: 20, 
        gap: 20
    },

    transactionsHeadingContainer: {
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

    filterDot: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        backgroundColor: COLORS.main3, 
        borderRadius: 100, 
        width: 10, 
        height: 10, 
        zIndex: 1
    },

    filterDatePickersContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 20
    },

    filterModal: {
        marginBottom: 10, 
        gap: 15, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 10
    },

    filterDatesContainer: (isStart) => ({
        gap: 10, 
        alignItems: isStart? 'flex-end' : 'flex-start'
    }),

    filterDateText: {
        fontFamily: FONT.medium, 
        color: COLORS.gray3, 
        fontSize: SIZES.regular
    },

    filterDateValueContainer: {
        padding: 6, 
        borderRadius: 4, 
        backgroundColor: COLORS.white3
    },

    transactionsContainer: {
        gap : 10,
        marginBottom: 200
    },

    addButtonContainer: { 
        position: 'absolute', 
        bottom: 50, 
        alignSelf: 'center'
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