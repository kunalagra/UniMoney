import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white1,
        justifyContent: "center",
        alignItems: 'center',
    },

    mainContainer: {
        width: '70%', 
        gap: 50
    },

    logoNSignupBlock: {
        alignItems: "center", 
        gap: 30
    },

    logoContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },

    imageContainer: {
        width: 55, 
        aspectRatio: 1
    },

    image: {
        height: '100%',
        width: '100%'
    },

    logoText: {
        color: COLORS.gray3,
        fontSize: SIZES.xxLarge,
        lineHeight: SIZES.xxLarge,
        fontFamily: FONT.bold2,
    },

    signupContainer: {
        width: '100%', 
        gap: 10
    },

    inputOuterContainerStyle: {
        width: '100%', 
        paddingHorizontal: 0, 
        height: 49
    },

    inputInnerContainerStyle: {
        width: '100%', 
        borderColor: COLORS.gray1, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: 
        COLORS.white3
    },

    input: {
        alignSelf: 'center', 
        width: '100%', 
        height: 45, 
        fontSize: SIZES.small, 
        color: COLORS.gray2, 
        fontFamily: FONT.regular, 
        paddingHorizontal: 15
    },

    signupBtn: [
        {
            backgroundColor: COLORS.main3,
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 10,
            alignSelf: 'center',
        },
        SHADOWS.medium
    ],

    signupText: {
        color: COLORS.white1,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold
    },

    signupOptionsContainer: {
        gap: 20,
    },

    orViaLineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    orViaLine: {
        height: 1,
        width: 80, 
        backgroundColor: COLORS.gray1
    },

    orViaText: {
        color: COLORS.gray1, 
        fontSize: SIZES.small, 
        paddingHorizontal: 10,
        fontFamily: FONT.medium
    },

    signupOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    signupOption: [
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white2,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 10,
            gap: 6
        },
        SHADOWS.medium
    ],

    signupOptionText: {
        color: COLORS.gray2, 
        fontSize: SIZES.regular,
        fontFamily: FONT.bold
    },

    loginText: {
        color: COLORS.gray1,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        alignSelf: 'center'
    },

    textDecorate: {
        textDecorationLine: 'underline'
    }

});

export default styles;