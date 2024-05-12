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

    mainContainer: {
        gap: 20
    },
});

export default styles;