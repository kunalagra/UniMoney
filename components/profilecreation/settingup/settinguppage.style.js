import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white2
    },

    mainContainer: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'flex-start', 
        paddingTop: 10
    },

    midContainer: {
        width: '100%', 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 50,
        paddingHorizontal: 20
    },

    textContainer: {
        width: '100%',
        alignItems: 'flex-start'
    },

    heading: {
        color: COLORS.gray3, 
        fontFamily: FONT.bold, 
        fontSize: SIZES.large
    },

    heading2: {
        color: COLORS.main3
    },

    innerContainer: {
        width: '100%', 
        gap: 80
    },

    progressContainer: {
        width: '100%', 
        gap: 10
    },

    progressTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end'
    },

    progressText: {
        color: COLORS.gray3, 
        fontFamily: FONT.regular
    },

    progressPercentage: {
        color: COLORS.gray1, 
        fontFamily: FONT.regular, 
        fontSize: SIZES.small
    },

    progressBlock: {
        height: 12, 
        width: '100%', 
        backgroundColor: COLORS.white4, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        borderRadius: 20
    },
    
    currentProgress: (progress) => ({
        height: 12, 
        width: progress, 
        backgroundColor: COLORS.main3,
        borderRadius: 20
    }),

    imageBlock: {
        width: '100%', 
        alignItems: 'center'
    },

    imageContainer: {
        width: '90%', 
        aspectRatio: 1
    },

    image: {
        width: '100%', 
        height: '100%', 
        objectFit: 'contain'
    },


});

export default styles;