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

    midContainer: {
        padding: 20,
        gap: 30
    },

    heading: {
        color: COLORS.gray3, 
        fontFamily: FONT.bold, 
        fontSize: SIZES.large
    },

    pushOptionsContainer: {
        gap: 20
    },

    optionContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
    },

    optionContent: {
        flex: 0.9, 
        gap: 5
    },

    optionTitle: {
        color: COLORS.gray3, 
        fontFamily: FONT.regular, 
        fontSize: SIZES.medium
    },  

    optionDesc: {
        color: COLORS.gray1, 
        fontFamily: FONT.regular, 
        fontSize: SIZES.small
    },  

    bottomContainer: {
        padding: 10,
    },

    buttonsContainer: {
        marginTop: 20
    },

});

export default styles;