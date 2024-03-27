import { View, SafeAreaView, StatusBar, Text, Image, Alert } from 'react-native';
import styles from './settinguppage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import axios from 'axios';

let i = 0;
const SettingUpPage = () => {

    const [progress, setProgress] = useState(0);
    const progressList = [5, 15, 28, 47, 65, 89, 98, 100];
    const navigation = useNavigation();
    const { username, email, password, ageGroup, gender, goals, goalsProgress, categories, categoriesLimits } = useSelector(state => state.profilecreation);

    useEffect( () => {

        const options = {
            method: 'POST',
            url: 'https://unimoney-backend.onrender.com/auth/register',
            data : {
                username: username,
                email: email,
                password: password,
                ageGroup: ageGroup,
                gender: gender,
                goals: goals,
                goalsProgress: goalsProgress,
                categories: categories,
                categoriesLimits: categoriesLimits
            }
        };

        const interval = setInterval( async () => {
            if (progress===98) {
                clearInterval(interval);
                try {
                    console.log(options)
                    const response = await axios.request(options);
                    if (response.status === 201) {
                        setProgress(100);
                        setTimeout(() => {
                            const login = (async () => {
                                const options = {
                                    method: 'POST',
                                    url: 'https://unimoney-backend.onrender.com/auth/login',
                                    data: {
                                        email: email,
                                        password: password
                                    }
                                };
                        
                                try {
                                    const response = await axios.request(options);
                                    if (response.status === 200) {
                                        AsyncStorage.setItem('token', response.data.token);
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'Main' }],
                                        });
                                    }
                                } catch (error) {
                                    console.log(error);
                                    if (error.response.status === 401) {
                                        alert('Invalid email or password');
                                    }
                                }
                            });
                            login();
                        }, 1000);
                    }
                } catch (error) {
                    console.log(error);
                    Alert.alert(
                        "Error",
                        "Something went wrong. Please try again later.",
                        [
                            {
                                text: "OK",
                                onPress: () => navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'SignUp' }],
                                }),
                                style: "cancel"
                            }
                        ]
                    );
                }

            }else {
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