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

    insightsHeadingContainer: {
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

    analysisContainer: {
        marginBottom: 400, 
        gap: 30
    },

    tabsContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: COLORS.white4, 
        borderRadius: 10, 
        padding: 4
    },

    tabContainer: (isActive) => ({
        flex: 1, 
        paddingVertical: 10, 
        backgroundColor: isActive? COLORS.gray3 : 'transparent', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    }),

    tabContainerText: (isActive) => ({
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: isActive? COLORS.white1 : COLORS.gray3
    }),

    tabDesc: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.gray1
    },

    transactionsContainer: {
        gap : 10,
    },

    transactionsContainerHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    pieAnalysisContainer: {
        gap: 10
    },

    pieContainerHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    pieChartContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    pieCenterContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    pieCenterText1: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.white1
    },

    pieCenterText2: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.white1
    },

    pieCenterText3: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.small, 
        color: COLORS.white1
    },

    pieLegendsContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap', 
        marginBottom: 10
    },

    pieLegend: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: 140, 
        marginRight: 20
    },

    pieLegendDot: (color) => ({
        height: 10,  
        width: 10, 
        borderRadius: 5, 
        backgroundColor: color, 
        marginRight: 10
    }),

    pieLegendText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    lineAnalysisContainer: {
        gap: 20
    },

    lineContainerHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    lineChartContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    lineLegendsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    lineChartAxisText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    lineLegend: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginRight: 20
    },

    lineLegendDot: (color) => ({
        height: 10,  
        width: 10, 
        backgroundColor: color, 
        marginRight: 10
    }),

    lineLegendText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    bankCardsContainer:{
        width: '100%',
        gap: 8,
        flexDirection: 'row',
    },
    bankCard: {
        backgroundColor: COLORS.green0,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.small
    },
    bankName:{
        fontFamily: FONT.bold,
        fontSize: SIZES.regular,
        color: COLORS.black
    },
    
});

export default styles;