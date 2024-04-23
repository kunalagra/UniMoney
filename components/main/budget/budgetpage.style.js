import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({

    sectionContainer: {
        position: 'relative',
        height: '100%'
    },

    mainContainer: {
        width: '100%', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 80,
        paddingHorizontal: 10
    },

    navbar: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 15,
        paddingHorizontal: 10
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

    switchModeContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 15
    },

    switchText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    cardsContainer: {
        gap: 20
    },

    cardsHeader: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    addButtonContainer: {
        position: 'absolute', 
        bottom: 10, 
        left: 0,
        alignItems: 'center',
        width: '100%'
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
    },

    noCategoriesFoundText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.gray1,
    }
    
});

export default styles;