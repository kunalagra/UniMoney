import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../../constants";

const styles = StyleSheet.create({

    container: {
        position: 'relative', 
        backgroundColor: COLORS.white2, 
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
        backgroundColor: COLORS.white5, 
        borderRadius: 10
    },

    mainContainer: {
        paddingHorizontal: 20, 
        marginBottom: 40, 
        gap: 20
    },

    sheetHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    inputOuterContainer: {
        paddingHorizontal: 0, 
        height: 49
    },

    inputInnerContainer: {
        borderColor: COLORS.gray1, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: COLORS.white3
    },

    inputStyle: {
        alignSelf: 'center',
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
    }
    
    
});

export default styles;