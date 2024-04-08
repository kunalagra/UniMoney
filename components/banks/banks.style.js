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

    accheader: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large - 2,
        color: COLORS.gray3
    },

    mainContainer: {
        gap: 20,
        flexDirection: 'column',
    },

    accContainer: {
        backgroundColor: COLORS.main4,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    BankImage: {
        width: 40,
        height: 40,
    },

    bankAcc: {
        color: COLORS.black,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '88%',
        margin: 22,
        borderRadius: 10,
        backgroundColor: COLORS.white1
    },

    bankDetails: {
        flexDirection: "row",
        alignItems: "center",
        width: "94%",
        marginHorizontal: 8,
        marginVertical: 2,
        height: 45,
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: "white",
        borderRadius: 2,
    },

    closeButton: {
        backgroundColor: COLORS.gray1,
        width: "94%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 15,
    },
    selectButton: {
        backgroundColor: COLORS.main3,
        width: "94%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: 10
    },
    bankHeader: {
        color: COLORS.gray3,
        fontSize: 16,
        fontFamily: FONT.medium,
        marginLeft: 20,
        marginTop: 20
    },
    bankContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
        gap: 20
    },
    bankCard: {
        flexDirection: "row",
        alignItems: "center",
        height: 150,
        width: "100%",
        backgroundColor: COLORS.gray1,
        gap: 10,
        borderRadius: 10
    },
    imageView: {
        backgroundColor: COLORS.lightGold1,
        height: "100%",
        width: "35%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    bankName: {
        color: COLORS.black,
        fontSize: 16,
        fontFamily: FONT.medium
    }


})

export default styles;