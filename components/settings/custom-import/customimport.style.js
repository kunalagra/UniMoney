import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


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
        gap: 30,
    },

    messageText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.regular,
        color: COLORS.gray1,
    },

    sampleFileLink: {
        textDecorationLine: 'underline'
    },

    fileContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
    },

    fileContainerHeading: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium - 1,
        color: COLORS.gray3,
    },

    fileContainerDetails: {
        flexDirection: "row",
        gap: 15,
        padding: 4,
        backgroundColor: COLORS.white3,
        borderRadius: 8,
        borderColor: COLORS.white5,
        borderWidth: 1,
        borderStyle: 'dashed'
    },

    fileButton: {
        backgroundColor: COLORS.white5,
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    fileButtonText: {
        color: COLORS.gray2,
        textAlign: 'center',
        fontFamily: FONT.regular,
        fontSize: SIZES.regular
    },

    fileName: (exists) => ({
        fontFamily: FONT.regular,
        fontSize: SIZES.regular,
        color: exists? COLORS.gray3 : COLORS.gray1,
        alignSelf: "center",
        width: "50%",
    }),

    buttonContainer: {
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