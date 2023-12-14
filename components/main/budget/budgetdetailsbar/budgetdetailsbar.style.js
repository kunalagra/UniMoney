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
        paddingBottom: 20, 
        paddingHorizontal: 5
    },

    cardContainer: {
        backgroundColor: COLORS.white1, 
        padding: 8, 
        borderRadius: 10
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
    }


});

export default styles;