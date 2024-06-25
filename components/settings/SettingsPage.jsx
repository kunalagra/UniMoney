"use strict";
import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Switch , ToastAndroid} from "react-native";
import { COLORS, SHADOWS, icons, images, FONT, SIZES } from "../../constants";
import { useState, useEffect } from "react";
import styles from "./settingspage.style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import CustomButton from '../../components/profilecreation/common/button/CustomButton';
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { Dialog, Icon, Input } from '@rneui/themed';
import { REACT_APP_BACKEND_URL } from "@env";



const DeleteModal = ({ deleteModalOpen, setDeleteModalOpen }) => {
    const handleDelete = async () => {
        const options = {
        method: 'DELETE',
        url: `${REACT_APP_BACKEND_URL}/transaction/cleardata`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
        }
    };
    try {
        const response = await axios(options);
        ToastAndroid.show("Data cleared successfully", ToastAndroid.SHORT);
    }
    catch (error) {
        console.log(error);
    }
    }

    return (
        <Dialog
            animationType="slide"
            transparent={true}
            isVisible={deleteModalOpen}
            onRequestClose={() => {
                setDeleteModalOpen(false);
            }}
            onBackdropPress={() => {
                setDeleteModalOpen(false);
            }}
            overlayStyle={{ borderRadius: 8, width: 330 }}
        >
            <View style={{ gap: 20 }}>
                <Text style={{color: COLORS.gray2, fontFamily: FONT.medium, fontSize: SIZES.medium + 2}}>
                    Reset app data
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10}}>
                    <CustomButton
                        title="Cancel"
                        handlePress={() => setDeleteModalOpen(false)}
                        inlineStyles={[{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: COLORS.red0 }]}
                    />
                    <CustomButton
                        title="Confirm"
                        handlePress={() => handleDelete()}
                        inlineStyles={[{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: COLORS.white3 }]}
                        textStyles={[{ color: COLORS.red0 }]}
                    />
                </View>
            </View>
        </Dialog>
    )
}

const SettingsPage = (props) => {

    const { ArrowleftIcon } = icons;
    const navigation = useNavigation();
    const { username, email, image } = useSelector(state => state.profilecreation);
    const [isBudgetMode, setIsBudgetMode] = useState(false);
    const [isPushNotifications, setIsPushNotifications] = useState(false);
    const [isExpenseReminderOn, setIsExpenseRemainderOn] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        const getsettings = async () => {
            const isMonthlyBudget = await AsyncStorage.getItem('isMonthlyBudget');
            setIsBudgetMode(isMonthlyBudget === 'true');
            const isPushNotifications = await AsyncStorage.getItem('isPushNotifications');
            setIsPushNotifications(isPushNotifications === 'true');
            const isExpenseReminderOn = await AsyncStorage.getItem('isExpenseReminderOn');
            setIsExpenseRemainderOn(isExpenseReminderOn === 'true');

        }
        getsettings();
        // console.log(isBudgetMode)
    }, [])



    const settingData = [
        {
            title: "Manage accounts",
            image: images.bank_outline,
            desc: "Manage your accounts",
            handlePress: () => {props.navigation.navigate('Banks')}
        },
        {
            title: "New category",
            image: images.category_bw,
            desc: "Add new category",
            handlePress: () => props.navigation.navigate('AddCategoryPage'),
        },
        {
            title: "Monthly budget",
            image: images.wallet2,
            desc: "ON ₹20,000",
            handlePress: () => {
                setIsBudgetMode(prev => !prev);
                AsyncStorage.setItem('isMonthlyBudget', (!isBudgetMode).toString());
            },
            isToggle: true
        },
        {
            title: "Instant notifications",
            image: images.bell_ring,
            desc: "Receive timely reminders",
            handlePress: () => {
                setIsPushNotifications(prev => !prev),
                AsyncStorage.setItem('isPushNotifications', (!isPushNotifications).toString());
            },
            isToggle: true
        },
        {
            title: "Cash expense reminder",
            image: images.plus_icon,
            desc: "Get regular alerts to add cash expenses against your ATM withdrawals",
            handlePress: () => {
                setIsExpenseRemainderOn(prev => !prev),
                AsyncStorage.setItem('isExpenseReminderOn', (!isExpenseReminderOn).toString());
            },
            isToggle: true
        },
        {
            title: "Custom Import",
            image: images.databaseicon,
            desc: "Import data using .csv/.xlsx from your local device",
            handlePress: () => {props.navigation.navigate('CustomImportPage')},
        },
        {
            title: "Reset app data",
            image: images.bin,
            desc: "Delete app data and set it up again",
            handlePress: () => setDeleteModalOpen(true),
        },
        {
            title: "About us",
            image: images.info_outline,
            desc: "Know more about us",
            handlePress: () => {},
        },
        {
            title: "Rate us",
            image: images.star_outline,
            desc: "Give feedback",
            handlePress: () => {},
        },
        {
            title: "FAQs",
            image: images.help_outline,
            desc: "Facing any issues?",
            handlePress: () => {props.navigation.navigate('FAQs')},
        },
        {
            title: "Logout",
            image: images.poweroff_icon,
            desc: "Logout from this device",
            handlePress: async () => {
                // console.log(await AsyncStorage.getItem('token'))
                AsyncStorage.removeItem('token');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DublicateGetStarted' }],
                });
            }
        },
    ]

    const getItemSwitch = (title) => {
        switch (title) {
            case "Monthly budget":
                return <Switch
                    trackColor={{ false: COLORS.gray1, true: COLORS.main4 }}
                    thumbColor={isBudgetMode ? COLORS.main3 : COLORS.white4}
                    onValueChange={() => {setIsBudgetMode(prev => !prev), AsyncStorage.setItem('isMonthlyBudget', (!isBudgetMode).toString());}}
                    value={isBudgetMode}
                />
            case "Instant notifications":
                return <Switch
                    trackColor={{ false: COLORS.gray1, true: COLORS.main4 }}
                    thumbColor={isPushNotifications ? COLORS.main3 : COLORS.white4}
                    onValueChange={() => setIsPushNotifications(prev => !prev)}
                    value={isPushNotifications}
                />
            case "Cash expense reminder":
                return <Switch
                    trackColor={{ false: COLORS.gray1, true: COLORS.main4 }}
                    thumbColor={isExpenseReminderOn ? COLORS.main3 : COLORS.white4}
                    onValueChange={() => setIsExpenseRemainderOn(prev => !prev)}
                    value={isExpenseReminderOn}
                />
            default: 
                return <></>
        }
    }
  
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <DeleteModal 
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
            />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity 
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon
                                style={styles.arrowleftIcon}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.navHeader}>
                                Settings
                            </Text>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <LinearGradient
                            colors={[ COLORS.main3, COLORS.main2, COLORS.main1, COLORS.main2, COLORS.main3 ]}
                            useAngle={true} 
                            angle={135} 
                            angleCenter={{x:0.5,y:0.5}}
                                style={styles.profileContainer}
                            >
                            <TouchableOpacity 
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}
                                onPress={() => {props.navigation.navigate('ProfilePage')}}
                            >

                                <View style={styles.profileDetails}>
                                    <Image
                                        source={ image ? {uri: image} : images.profileicon}
                                        style={[styles.profileImage, !image ? {tintColor: COLORS.gray2, borderWidth: 1, borderRadius: 100} : {}]}
                                    />
                                    <View style={styles.profileTitleContainer}>
                                        <Text style={styles.profileName}>
                                            {username}
                                        </Text>
                                        <Text style={styles.profileEmail}>
                                            {email}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.profileContainerArrow}>
                                    {'>'}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        {settingData.map((item, index) => (
                            <TouchableOpacity 
                                style={styles.optionContainer}
                                onPress={item.handlePress}
                                key={index}
                            >
                                <View style={styles.optionDetailsContainer}>
                                    <Image
                                        source={item.image}
                                        style={styles.optionImage}
                                    />
                                    <View style={styles.optionTitleContainer}>
                                        <Text style={styles.optionTitle}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.optionDesc}>
                                            {item.desc}
                                        </Text>
                                    </View>
                                </View>
                                {item.isToggle && getItemSwitch(item.title)}
                                
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default SettingsPage;