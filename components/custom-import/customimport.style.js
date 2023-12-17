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

    messageText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.regular,
        color: COLORS.gray1,
    },

    fileContainer: {
        width: "100%",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
    },

    fileContainerHeading: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray3,
    },

    fileContainerDetails: {
        flexDirection: "row",
        gap: 15,
        margin:4,
    },

    fileButton: {
        backgroundColor: COLORS.white4,
        borderRadius: 10,
        width: "40%",
        height: 40,
        justifyContent: "center",
    },

    fileButtonText: {
        color: COLORS.gray3,
        textAlign: 'center',
        fontFamily: FONT.regular,
        fontSize: SIZES.regular
    },

    fileText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.regular,
        color: COLORS.gray2,
        alignSelf: "center",
        width: "50%",
    },

    buttonsContainer: {
        gap: 5,
        width: "100%",
        flexDirection: "row",
        justifyContent:"center"
    },

    importButton: {
        backgroundColor: COLORS.main3,
        paddingVertical: 12,
        borderRadius: 8,
        width: "50%",
    },

    buttonText: {
        color: COLORS.white1,
        textAlign: 'center',
        fontFamily: FONT.regular,
        fontSize: SIZES.regular
    }

});

export default styles;