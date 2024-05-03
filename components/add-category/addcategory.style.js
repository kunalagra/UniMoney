import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({

    container: {
        gap: 40,
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 1,
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

    navHeading: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large - 2,
        color: COLORS.gray3
    },

    mainContainer: {
        gap: 20,
        height: "40%",
    },

    rowField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    rowHeader: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray3
    },

    inputOuterContainer: {
        width: 200,
        paddingHorizontal: 0,
        height: 50
    },

    inputInnerContainer: {
        alignSelf: 'stretch',
        borderColor: COLORS.white5,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: COLORS.white3
    },

    inputStyle: {
        alignSelf: 'stretch',
        fontSize: SIZES.medium - 2,
        color: COLORS.gray2,
        fontFamily: FONT.regular,
        paddingHorizontal: 15
    },

    imageRowField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "55%",
    },

    imageRowHeader: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray3,
        alignSelf: "center"
    },

    imageContainer: {
        width: 200,
        height: "100%",
        borderWidth: 1,
        borderColor: COLORS.white5,
        borderRadius: 8
    },

    imageStyle: {
        width: 'auto',
        height: "100%",
        borderRadius: 8
    },

    imageButton: {
        width: 200,
        height: "12%",
        backgroundColor: COLORS.main3,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end"
    },

    buttonsContainer: {
        gap: 5,
        marginBottom: 20
    },

    upperButton: {
        backgroundColor: COLORS.main3,
        paddingVertical: 12,
        borderRadius: 8
    },

    lowerButton: {
        backgroundColor: COLORS.gray1,
        paddingVertical: 12,
        borderRadius: 8
    },

    buttonText: {
        color: COLORS.white1,
        textAlign: 'center',
        fontFamily: FONT.regular,
        fontSize: SIZES.regular
    }

});

export default styles;