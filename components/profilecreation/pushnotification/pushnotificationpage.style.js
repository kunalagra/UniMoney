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

    midContainer: {
        width: '100%', 
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
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
    },

    optionContent: {
        maxWidth: '80%', 
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

    modalStyles: {
        backgroundColor: COLORS.white2, 
        width: '90%', 
        alignSelf: 'center',  
        padding: 20,
        borderRadius: 12
    },

    modalText: {
        color: COLORS.gray3,
        fontFamily: FONT.regular,
        fontSize: SIZES.regular
    },

    modalButtonsContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: 10
    },

    modalButton: {
        paddingHorizontal: 15,
    },

    bottomContainer: {
        padding: 10,
    },

    buttonsContainer: {
        marginTop: 20
    },

});

export default styles;