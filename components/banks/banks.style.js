import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 70,
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

    accheader: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large - 2,
        color: COLORS.gray3
    },

    mainContainer: {
        gap: 20,
        flexDirection: 'column',
        paddingHorizontal: 6
    },

    accContainer: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'stretch', 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        backgroundColor: COLORS.white1,  
        justifyContent: 'space-between',
        ...SHADOWS.small
    },

    linkText: {
        color: COLORS.main3,
        fontFamily: FONT.medium
    },

    BankImage: {
        width: 40,
        height: 40,
    },

    bankAcc: {
        color: COLORS.gray3,
        fontFamily: FONT.medium
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 330,
        borderRadius: 10,
        backgroundColor: COLORS.white1,
        marginVertical: 20,
        paddingVertical: 12,
        paddingHorizontal: 12
    },

    bankDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        height: 45,
        backgroundColor: COLORS.white2,
        borderRadius: 8,
        ...SHADOWS.small,
        marginBottom: 5,
        gap: 20
    },

    closeButton: {
        backgroundColor: COLORS.gray1,
        alignSelf: 'stretch',
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    selectButton: {
        backgroundColor: COLORS.main3,
        alignSelf: 'stretch',
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10
    },
    bankHeader: {
        color: COLORS.gray3,
        fontSize: SIZES.large - 2,
        fontFamily: FONT.medium,
        marginTop: 20
    },
    bankContainer: {
        alignSelf: 'stretch',
        marginTop: 20,
        gap: 20,
        paddingHorizontal: 6
    },
    bankCard: {
        alignSelf: 'stretch',
        backgroundColor: COLORS.green0,
        gap: 10,
        borderRadius: 12,
        marginBottom: 10,
        ...SHADOWS.medium,
        paddingHorizontal: 14,
        paddingVertical: 20
    },
    bankName: {
        color: COLORS.black,
        fontSize: 16,
        fontFamily: FONT.medium
    }


})

export default styles;