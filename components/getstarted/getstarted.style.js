import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerWaveContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },
    
    headerWaveImage: {
        height: 150, 
        aspectRatio: 0.79,
    },

    textContainer: {
        alignSelf: 'stretch',
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
    },

    heading: {
        color: COLORS.gray3,
        fontSize: SIZES.xxxLarge,
        lineHeight: 50,
        fontFamily: FONT.bold2,
    },

    tagline: {
        color: COLORS.gray3, 
        fontSize: SIZES.medium,
        fontFamily: FONT.bold
    },
      
    getStartedButton: [
        {
            marginTop: 20,
            backgroundColor: COLORS.main3,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 8
        },
        SHADOWS.small
    ],
    
    getStartedButtonText: {
      color: COLORS.white1, 
      fontSize: SIZES.medium, 
      fontFamily: FONT.bold
    },

    footerWaveContainer: {
        alignSelf: 'stretch'
    },

    footerWaveImage: {
        aspectRatio: 1.8,
        justifyContent: 'flex-end'
    },

    footerRectangle: {
        alignSelf: 'stretch',
        height: 100, 
        backgroundColor: COLORS.main3
    }
})


export default styles;
