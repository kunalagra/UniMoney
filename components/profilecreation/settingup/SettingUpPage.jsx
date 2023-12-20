import { View, SafeAreaView, StatusBar, Text, Image } from 'react-native';
import styles from './settinguppage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";

let i = 0;
const SettingUpPage = () => {

    const [progress, setProgress] = useState(0);
    const progressList = [5, 15, 28, 47, 65, 89, 98, 100];
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress===100) {
                clearInterval(interval);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}],
                });
            } else {
                setProgress(progressList[i]);
                i++;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [progress]);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={''}
                        title2={''}
                        progress={'0%'}
                        currentPageNum={'★'}
                        last={true}
                    />

                    <View style={styles.midContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.heading}>
                                We are crafting your
                            </Text>
                            <Text style={[ styles.heading, styles.heading2 ]}>
                                saving experience...
                            </Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressTextContainer}>
                                    <Text style={styles.progressText}>
                                        Setting goals
                                    </Text>
                                    <Text style={styles.progressPercentage}>
                                        {progress}%
                                    </Text>
                                </View>
                                <View style={styles.progressBlock}>
                                    <View style={styles.currentProgress(progress)} />
                                </View>
                            </View>
                            <View style={styles.imageBlock}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={images.saving_in_wallet}
                                        style={styles.image}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingUpPage;