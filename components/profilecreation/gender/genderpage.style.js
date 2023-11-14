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
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    genderCardContainer: (selectedGender, gender) => ({
        width: '31%', 
        height: 140, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: selectedGender===gender? COLORS.main3 : COLORS.white4, 
        opacity: selectedGender===gender? 1 : 1
    }),

    cardBackground: (selectedGender, gender) => ({
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        opacity: selectedGender===gender? 0.3 : 1,
        backgroundColor: selectedGender===gender? COLORS.main3 : COLORS.white3,
    }),

    iconContainer: (selectedGender, gender) => ({
        width: 60, 
        height: 60, 
        backgroundColor: selectedGender===gender? COLORS.main3 : COLORS.white4, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 100, 
        marginBottom: 10,
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