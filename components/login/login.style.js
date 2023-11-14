import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white1,
        justifyContent: "center",
        alignItems: 'center',
    },
    frame: {
        backgroundColor: COLORS.white1,
        // marginHorizontal: '15%',
        // marginVertical: '30%',
        height: '70%',
        width: '70%',
        alignContent: 'center',
        justifyContent: "flex-end",
        gap: 25,
    },
    header: {
        flexDirection: 'row',
        gap: 17.2,
        justifyContent: 'center',

    },
    heading: {
        color: COLORS.gray3,
        fontSize: SIZES.xxLarge,
        lineHeight: SIZES.xxLarge,
        fontFamily: FONT.bold,
    },
    logintext: {
        color: COLORS.white1,
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: COLORS.white3,
        shadowColor: COLORS.black,
        // elevation: 1,
        alignSelf: 'center',
        width: '100%',
        height: 45,
        fontSize: SIZES.small,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    break: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.large,
        marginBottom: SIZES.large,
    },
    googelbtu: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    acctext: {
        color: COLORS.gray1,
        fontFamily: FONT.medium,
        fontSize: SIZES.xSmall,
        alignSelf: 'center',
        lineHeight: SIZES.small,
        fontWeight: '500',
    },
    loginbtu: {
        backgroundColor: '#00B899',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        elevation: 4,
        marginTop: 10,
        alignSelf: 'center',
    },
    btu: {
        backgroundColor: '#F3F4F8',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        elevation: 4,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 10,
    }

});

export default styles;