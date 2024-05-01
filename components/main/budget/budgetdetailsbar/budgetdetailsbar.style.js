import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({

    container: {
        position: 'relative', 
        width: '100%', 
        backgroundColor: COLORS.main3, 
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40, 
        paddingTop: 40
    },

    barHandle: {
        width: 40, 
        height: 5, 
        position: 'absolute', 
        top: 10, 
        left: '50%', 
        transform: [{ translateX: -20 }], 
        backgroundColor: COLORS.white3, 
        borderRadius: 10
    },

    mainContainer: {
        paddingVertical: 10, 
        paddingBottom: 10, 
        paddingHorizontal: 5
    },

    cardContainer: {
        backgroundColor: COLORS.white1, 
        padding: 8, 
        borderRadius: 10
    },

    newCategoryContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 10
    },

    categoryTitle: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular + 1, 
        color: COLORS.white1
    },

    dropdownStyle: {
        backgroundColor: COLORS.white2, 
        borderColor: COLORS.white5, 
        borderWidth: 1, 
        borderRadius: 8, 
        paddingHorizontal: 8, 
        width: 180
    },

    dropdownText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.medium-2, 
        color: COLORS.gray3
    },

    optionsContainer: {
        backgroundColor: COLORS.white1, 
        paddingVertical: 30, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 25
    },

    optionContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 5
    },

    iconStyle: {
        stroke: COLORS.gray3
    },

    iconText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.xSmall, 
        color: COLORS.gray3
    },
    buttonContainer: {
        backgroundColor: COLORS.main3, 
        paddingVertical: 12, 
        borderRadius: 8
    },
    buttonText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.white1, 
        textAlign: 'center'
    },
    
    inputOuterContainer: {
        width: '100%', 
        paddingHorizontal: 0, 
        height: 49
    },

    inputInnerContainer: {
        width: '100%', 
        borderColor: COLORS.gray1, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: COLORS.white3
    },

    inputStyle: {
        alignSelf: 'center',
        width: '100%', 
        height: 45, 
        fontSize: SIZES.regular, 
        color: COLORS.gray2, 
        fontFamily: FONT.medium, 
        paddingHorizontal: 15
    },

    leftIconContainerStyle: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 5
    },

    letIconContainerText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.gray1
    },
    sheetHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

});

export default styles;