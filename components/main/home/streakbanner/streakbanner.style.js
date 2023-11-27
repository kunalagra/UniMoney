import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        paddingHorizontal: 20
    },

    cardContainer: {
        borderRadius: 10, 
        elevation: 10,
        ...SHADOWS.medium, 
    },

    gradientBackground: {
        width: '100%', 
        height: 150, 
        paddingHorizontal: 8, 
        paddingVertical: 5, 
        borderRadius: 10
    },

    detailsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    textContainer: {
        width: '50%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    upperText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.xLarge, 
        color: COLORS.lightblue1
    },

    lowerText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.xxLarge, 
        color: COLORS.white1
    },

    imageContainer: {
        height: '100%', 
        aspectRatio: 1
    },

    image: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain'
    }

});

export default styles;