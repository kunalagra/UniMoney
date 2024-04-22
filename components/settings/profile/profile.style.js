import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20, 
        marginTop: 10, 
        marginBottom: 100,
        gap: 30, 
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

    detailsContainer: {
        width: '100%', 
        gap: 15,
        marginTop: 20,
        alignItems: 'center'
    },

    inputOuterContainerStyle: {
        width: '100%', 
        paddingHorizontal: 0, 
        height: 49,
    },

    inputInnerContainerStyle: {
        width: '100%', 
        borderColor: COLORS.gray1, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: 
        COLORS.white3,
        ...SHADOWS.medium
    },

    input: {
        alignSelf: 'center', 
        width: '100%', 
        height: 45, 
        fontSize: SIZES.small, 
        color: COLORS.gray2, 
        fontFamily: FONT.regular, 
        paddingHorizontal: 15,
    },

    updateBtn: [
        {
            backgroundColor: COLORS.main3,
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: 'center',
        },
        SHADOWS.medium
    ],

    updateText: {
        color: COLORS.white1,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold
    },

});

export default styles;