import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../constants";

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
        backgroundColor: COLORS.white3, 
        borderRadius: 12, 
        borderWidth: 2, 
        borderColor: COLORS.white5, 
        paddingHorizontal: 10, 
        paddingVertical: 16
    },

    profileDetails: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20
    },

    profileImage: {
        width: 50, 
        height: 50, 
        // tintColor: COLORS.gray1, 
        resizeMode: 'contain',
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
        fontSize: SIZES.regular, 
        color: COLORS.gray1
    },

    profileContainerArrow: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.gray1
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