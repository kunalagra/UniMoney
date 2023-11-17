import { View, SafeAreaView, StatusBar, Text, Image } from 'react-native';
import styles from './settinguppage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';

const SettingUpPage = (props) => {

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
                                        43%
                                    </Text>
                                </View>
                                <View style={styles.progressBlock}>
                                    <View style={styles.currentProgress('43%')} />
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