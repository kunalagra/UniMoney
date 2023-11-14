import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


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

    goalCardContainer: {
        width: '100%', 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: COLORS.white4,  
    },

    cardTitle: {
        marginLeft: 20,
        color: COLORS.gray3,
        fontFamily: FONT.regular,
    },

    sliderTitlesContainer: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    sliderTitle: {
        color: COLORS.gray3, 
        fontFamily: FONT.regular, 
        fontSize: SIZES.small
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