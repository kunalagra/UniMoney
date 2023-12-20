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
        justifyContent: 'center', 
        flexDirection: 'row'
    },

    imageContainer: {
        width: '80%', 
        aspectRatio: 1
    },

    image: {
        objectFit: 'contain', 
        width: '100%', 
        height: '100%',
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

});

export default styles;