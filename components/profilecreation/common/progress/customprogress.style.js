import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {

    },

    progressbar: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    prevCircle: (first) => ({
        width: 12, 
        height: 24, 
        backgroundColor: first? COLORS.white2 : COLORS.gray1, 
        borderTopRightRadius: 100, 
        borderBottomRightRadius: 100
    }),

    prevProgress: (first) => ({
        width: '40%', 
        height: 5, 
        backgroundColor: first? COLORS.white2 : COLORS.gray1, 
        borderRadius: 100
    }),

    currentPage: {
        width: 24, 
        height: 24, 
        backgroundColor: COLORS.gray1, 
        borderRadius: 100, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    currentPageNo: {
        color: COLORS.white1, 
        fontSize: SIZES.xSmall,
        fontFamily: FONT.regular
    },
    
    currentProgressContainer: {
        width: '40%', 
        height: 5, 
        backgroundColor: COLORS.white5, 
        borderRadius: 100
    },

    currentProgress: (progress) => ({
        width: progress, 
        height: 5, 
        backgroundColor: COLORS.gray1, 
        borderRadius: 100
    }),

    nextCircle: {
        width: 12, 
        height: 24, 
        backgroundColor: COLORS.white5, 
        borderTopLeftRadius: 100, 
        borderBottomLeftRadius: 100
    },
    
    currentPageTitleContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        marginTop: 5
    },
    
    currentPageTitle: {
        color: COLORS.gray3, 
        fontSize: SIZES.small,
        fontFamily: FONT.regular
    },
    
    currentPageTitle2: {
        color: COLORS.gray3, 
        fontSize: SIZES.medium,
        fontFamily: FONT.regular
    },
    
    currentPageTitle3: {
        color: COLORS.gray3, 
        fontSize: SIZES.regular,
        fontFamily: FONT.regular
    },


});

export default styles;