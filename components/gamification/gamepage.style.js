import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";

const styles = StyleSheet.create({

    sectionContainer: {
        position: 'relative'
    },

    mainContainer: {
        alignSelf: 'stretch', 
        marginTop: 10, 
        gap: 20, 
        marginBottom: 20 
    },

    navbar: {
        alignSelf: 'stretch', 
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
        paddingHorizontal: 20, 
        gap: 20
    },

    scrollViewInnerContainer: {
        gap: 20, 
        paddingBottom: 380
    },

    gameSectionsContainer: {
        flexDirection: 'row', 
        gap: 6, 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },

    rulesButton: {
        flexDirection: 'row', 
        gap: 4, 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },

    rulesButtonImg: {
        width: 16, 
        height: 16, 
        objectFit: 'contain', 
        tintColor: COLORS.gray2
    },

    rulesButtonText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray2
    },

    leaderboardButton: {
        flexDirection: 'row', 
        gap: 4, 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },

    leaderboardButtonImg: {
        width: 19, 
        height: 19, 
        objectFit: 'contain', 
        tintColor: COLORS.gray2
    },

    leaderboardButtonText: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.medium, 
        color: COLORS.gray2
    },

    statsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end'
    },

    statsHeading: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    statsInnerContainer: {
        flexDirection: 'row', 
        gap: 10
    },

    statContainer: {
        flexDirection: 'row', 
        gap: 2, 
        alignItems: 'center'
    },

    statImage: (size) => ({
        width: size, 
        height: size, 
        objectFit: 'contain'
    }),

    statContainerText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    starProgressContainer: {
        borderRadius: 10, 
        elevation: 10, 
        ...SHADOWS.medium,
    },

    starProgressGradientContainer: {
        alignSelf: 'stretch', 
        paddingHorizontal: 8, 
        paddingVertical: 10, 
        borderRadius: 10
    },

    horizontalLine: {
        height: 0, 
        borderWidth: 0.6, 
        borderColor: COLORS.lightblue1, 
        flex: 1,
    },

    starsContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },

    backStarImg: (size) => ({
        width: size, 
        height: size, 
        tintColor: COLORS.white1, 
        opacity: 0.5
    }),

    frontStarContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        // width: '100%',
    },

    frontStarProgressContainer: (progress) => ({
        width: 0, 
        overflow: 'hidden', 
        paddingRight: `${progress * 100}%`
    }),

    frontStarImg: (size) => ({
        width: size, 
        height: size, 
        tintColor: COLORS.gold1
    }),

    tilesGradientContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 8, 
        paddingVertical: 10, 
        borderRadius: 10
    },

    tilesContainer: {
        width: 305, 
        height: 305, 
        flexDirection: 'row', 
        gap: 10, 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    tileInnerImgContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0
    },

    tileInnerImg: {
        width: 34, 
        height: 34, 
        objectFit: 'contain'
    },

    myRankContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    trophyHeadingContainer: {
        flexDirection: 'row', 
        gap: 4, 
        alignItems: 'center'
    },

    rankImg: {
        width: 20, 
        height: 20, 
        objectFit: 'contain'
    },

    rankHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    rankNumber: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    gameDetailSectionContainer: {
        marginTop: 10, 
        gap: 14
    },

    gameDetailSectionHeadingContainer: {
        flexDirection: 'row', 
        gap: 4, 
        alignItems: 'center'
    },

    gameDetailSectionTrophyImg: {
        width: 19, 
        height: 19, 
        objectFit: 'contain'
    },

    gameDetailSectionRulesImg: {
        width: 16, 
        height: 16, 
        objectFit: 'contain'
    },

    gameDetailSectionHeading: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.large, 
        color: COLORS.gray3
    },

    ruleText: {
        fontFamily: FONT.regular, 
        fontSize: SIZES.regular, 
        color: COLORS.gray3
    },

    leaderboardRowText: {
        fontFamily: FONT.medium2, 
        fontSize: SIZES.medium, 
        color: COLORS.gray3
    }


});

export default styles;
