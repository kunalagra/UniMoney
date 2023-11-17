import { View, Text } from "react-native";
import styles from "./customprogress.style";

const CustomProgress = ({ progress, currentPageNum, title1, title2, title3 = "", first = false, last = false }) => {
    return (
        <View style={styles.container}>
            <View style={styles.progressbar}>
                <View style={styles.prevCircle(first)} />
                
                <View style={styles.prevProgress(first)} />
                
                <View style={styles.currentPage} >
                    <Text style={styles.currentPageNum}>{currentPageNum}</Text>
                </View>

                <View style={styles.currentProgressContainer(last)}>
                    <View style={styles.currentProgress(progress, last)} />
                </View>

                <View style={styles.nextCircle(last)} />
            </View>
            <View style={styles.currentPageTitleContainer}>
                <Text style={styles.currentPageTitle}>{title1}</Text>
            </View>
            <View style={styles.currentPageTitleContainer}>
                <Text style={styles.currentPageTitle2}>{title2}</Text>
            </View>
            {title3 && (
                <View style={styles.currentPageTitleContainer}>
                    <Text style={styles.currentPageTitle3}>{title3}</Text>
                </View>
            )}
        </View>
    )
}

export default CustomProgress;