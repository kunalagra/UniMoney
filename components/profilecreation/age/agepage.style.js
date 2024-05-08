import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS } from "../../../constants";


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
        gap: 10
    },

    ageCardContainer: (selectedAgeGroup, ageGroup) => ({
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: selectedAgeGroup===ageGroup? COLORS.main3 : COLORS.white4,  
        opacity: selectedAgeGroup===ageGroup? 1 : 1,
        backgroundColor: selectedAgeGroup===ageGroup? COLORS.main4 : COLORS.white3,
    }),

    cardTitle: {
        color: COLORS.gray3,
        fontFamily: FONT.regular
    },

    buttonContainer: {
        marginTop: 20,
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