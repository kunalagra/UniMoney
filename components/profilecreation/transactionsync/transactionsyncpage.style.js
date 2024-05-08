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
        justifyContent: 'center', 
        flexDirection: 'row'
    },

    imageContainer: {
        aspectRatio: 1
    },

    image: {
        objectFit: 'contain', 
        width: 300, 
        height: 300,
    },

    bottomContainer: {
        padding: 10,
    },

    buttonsContainer: {
        marginTop: 20, 
        gap: 5
    },

    importingButton: (isImporting) => ({
        backgroundColor: isImporting? COLORS.gray1 : COLORS.main3
    })

});

export default styles;