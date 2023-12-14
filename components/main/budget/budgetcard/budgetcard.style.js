import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../../../constants";

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: 10
    },

    cardImage: {
        width: 40, 
        height: 40, 
        resizeMode: 'contain'
    },

    cardDetailsContainer: {
        gap: 5, 
        flexGrow: 1, 
        width: '70%'
    },

    cardTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    cardHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    cardText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.small, 
        color: COLORS.gray1
    },

    cardProgressContainer: {
        height: 10, 
        backgroundColor: COLORS.white5, 
        borderRadius: 10
    },

    cardProgress: (progress) => ({
        width: `${progress}%`, 
        height: 10, 
        backgroundColor: COLORS.main3, 
        borderRadius: 10
    })
    
});

export default styles;