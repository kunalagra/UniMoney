import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";

const styles = StyleSheet.create({

    sectionContainer: {
        position: 'relative'
    },

    mainContainer: {
        width: '100%', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 15, 
        paddingHorizontal: 20
    },

    arrowLeftIcon: {
        width: 24, 
        height: 24,
    },

    navHeading: {
        color: COLORS.gray3, 
        fontFamily: FONT.medium, 
        fontSize: SIZES.large - 2
    },

    container: {
        width: '100%', 
        paddingHorizontal: 20, 
        gap: 20
    },

});

export default styles;
