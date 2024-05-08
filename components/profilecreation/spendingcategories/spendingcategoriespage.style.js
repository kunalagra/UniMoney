import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white2
    },

    mainContainer: {
        height: '100%', 
        justifyContent: 'space-between', 
        paddingTop: 10
    },

    bottomContainer: {
        padding: 10,
    },

    cardsContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
        rowGap: 15
    },

    categoryCardContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 8
    },

    categoryImageContainer: (categorySelected) => ({
        width: 55, 
        height: 55, 
        padding: 5, 
        backgroundColor: categorySelected===1? COLORS.orange1 : COLORS.white2, 
        borderRadius: 12
    }),

    cardTitle: {
        color: COLORS.gray3,
        fontFamily: FONT.regular,
        fontSize: SIZES.small
    },

    buttonsContainer: {
        marginTop: 20,
        gap: 5
    },

    buttonContainer: {
        backgroundColor: COLORS.main3,
        paddingVertical: 12,
        borderRadius: 8,
    },

    buttonTitle: {
        color: COLORS.white1, 
        textAlign: 'center',
        fontFamily: FONT.regular
    }


});

export default styles;