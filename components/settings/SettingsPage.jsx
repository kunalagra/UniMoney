import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Switch } from "react-native";
import { COLORS, icons, images } from "../../constants";
import { useState } from "react";
import styles from "./settingspage.style";


const SettingsPage = (props) => {

    const { ArrowleftIcon } = icons;

    const [isBudgetMode, setIsBudgetMode] = useState(false);
    const [isPushNotifications, setIsPushNotifications] = useState(false);
    const [isExpenseReminderOn, setIsExpenseRemainderOn] = useState(false);

    const settingData = [
        {
            title: "Manage accounts",
            image: images.bank_outline,
            desc: "Manage your accounts",
            handlePress: () => {},
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
            handlePress: () => setIsBudgetMode(prev => !prev),
            isToggle: true
        },
        {
            title: "Instant notifications",
            image: images.bell_ring,
            desc: "Receive timely reminders",
            handlePress: () => setIsPushNotifications(prev => !prev),
            isToggle: true
        },
        {
            title: "Cash expense reminder",
            image: images.plus_icon,
            desc: "Get regular alerts to add cash expenses against your ATM withdrawals",
            handlePress: () => setIsExpenseRemainderOn(prev => !prev),
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
            handlePress: () => {},
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
            handlePress: () => {},
        },
        {
            title: "Logout",
            image: images.poweroff_icon,
            desc: "Logout from this device",
            handlePress: () => {},
        },
    ]

    const getItemSwitch = (title) => {
        switch (title) {
            case "Monthly budget":
                return <Switch
                    trackColor={{ false: COLORS.gray1, true: COLORS.main4 }}
                    thumbColor={isBudgetMode ? COLORS.main3 : COLORS.white4}
                    onValueChange={() => setIsBudgetMode(prev => !prev)}
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
                        <TouchableOpacity 
                            style={styles.profileContainer}>
                            <View style={styles.profileDetails}>
                                <Image
                                    source={images.profileicon}
                                    style={styles.profileImage}
                                />
                                <View style={styles.profileTitleContainer}>
                                    <Text style={styles.profileName}>
                                        John Doe
                                    </Text>
                                    <Text style={styles.profileEmail}>
                                        john.doe@gmail.com
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.profileContainerArrow}>
                                {'>'}
                            </Text>
                        </TouchableOpacity>

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