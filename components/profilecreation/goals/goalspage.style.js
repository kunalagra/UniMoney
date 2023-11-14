import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS } from "../../../constants";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white2
    },

    mainContainer: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'space-between', 
        paddingTop: 10
    },

    bottomContainer: {
        padding: 10,
    },

    cardsContainer: {
        gap: 10
    },

    goalCardContainer: (goalSelected) => ({
        width: '100%', 
        height: 60, 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        alignItems: 'center', 
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: goalSelected===1? COLORS.main3 : COLORS.white4,  
    }),

    cardBackground: (goalSelected) => ({
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        opacity: goalSelected===1? 0.3 : 1,
        backgroundColor: goalSelected===1? COLORS.main3 : COLORS.white3,
        borderRadius: 8, 
    }),

    cardTitle: {
        marginLeft: 20,
        color: COLORS.gray3,
        fontFamily: FONT.regular,
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