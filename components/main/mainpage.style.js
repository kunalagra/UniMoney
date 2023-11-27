import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
    
    tabBarStyle: {
        height: 67,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 8
    },

    tabBarItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
    },

    tabBarLabelStyle: {
        fontSize: 11,
        fontFamily: FONT.regular
    },

    iconStrokeStyle: (x, y, isFocused) => ({
        width: x,
        height: y,
        stroke: isFocused? COLORS.main3 : COLORS.gray3
    }),

    iconFillStyle: (x, y, isFocused) => ({
        width: x,
        height: y,
        fill: isFocused? COLORS.main3 : COLORS.gray3
    }),

});

export default styles;