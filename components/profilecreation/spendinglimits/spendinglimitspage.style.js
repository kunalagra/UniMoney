import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white2,
        justifyContent: 'space-between'
    },

    mainContainer: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'space-between', 
        paddingTop: 10
    },


    inputOuterContainerStyle: {
        width: '100%', 
        paddingHorizontal: 0, 
        height: 49
    },

    inputInnerContainerStyle: {
        width: '100%', 
        borderColor: COLORS.gray1, 
        borderRadius: 8, 
        borderWidth: 1, 
        backgroundColor: COLORS.white3
    },

    input: {
        alignSelf: 'center', 
        width: '100%', 
        height: 45, 
        fontSize: SIZES.small, 
        color: COLORS.gray2, 
        fontFamily: FONT.regular, 
        paddingHorizontal: 15
    },

    inputLeftIconContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 5
    },

    inputLeftIconText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.gray1
    },

    bottomContainer: {
        padding: 10,
    },

    cardsContainer: {
        gap: 10,
        justifyContent: 'center',
    },

    categoryCardContainer: {
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