import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";

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

    mainContainer: {
        gap: 20
    },

    profileContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',  
        borderRadius: 12,
        paddingHorizontal: 10, 
        paddingVertical: 16,
        ...SHADOWS.medium, paddingBottom: 20
    },

    profileDetails: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20
    },

    profileImage: {
        width: 50, 
        height: 50, 
        resizeMode: 'contain',
        borderColor: COLORS.gray2,
    },

    profileTitleContainer: {
        gap: 2
    },

    profileName: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium + 1, 
        color: COLORS.gray3
    },

    profileEmail: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.small, 
        color: COLORS.gray2
    },

    profileContainerArrow: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.gray2
    },

    optionContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    optionDetailsContainer: {
        width: '70%',
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20, 
    },

    optionImage: {
        width: 24, 
        height: 24, 
        tintColor: COLORS.gray3, 
        resizeMode: 'contain'
    },

    optionTitleContainer: {
        gap: 2
    },

    optionTitle: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    },

    optionDesc: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.small, 
        color: COLORS.gray1
    }

})

export default styles;