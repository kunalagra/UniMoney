import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({

    container: {
        alignSelf: 'stretch',
        paddingHorizontal: 20
    },

    cardContainer: {
        borderRadius: 10, 
        elevation: 10,
        ...SHADOWS.medium, 
    },

    gradientBackground: {
        alignSelf: 'stretch',
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
        flex: 1, 
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
        width: 135, 
        height: '100%', 
        resizeMode: 'contain'
    }

});

export default styles;