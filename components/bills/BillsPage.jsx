import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Switch, RefreshControl } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { useState, useEffect, useCallback } from "react";
import styles from "./billspage.style";
import { moneyTextHelper } from "../../utils";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BACKEND_URL } from "@env";


const BillsPage = (props) => {

    const { ArrowleftIcon } = icons;

    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchReminders();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const fetchReminders = async () => {
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/reminder/`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            // console.log(response.data);
            setReminders(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        // console.log(new Date().getTime());
        
        fetchReminders();
    }
    , []);

    const dateFormater = (date) => {
        const dateObj = new Date(date);
        return dateObj.toDateString();
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={{ position: 'relative', height: '100%' }}>
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
                                Bills/Reminders
                            </Text>
                        </View>
                    </View>

                    {loading ? (
                        <View style={{ alignSelf: 'stretch' }}>
                            <SkeletonPlaceholder borderRadius={4} direction='right'>
                                <SkeletonPlaceholder.Item gap={15}>
                                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </View>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                            }
                            style={{ height: '100%' }}
                        >
                            <View style={{ gap: 20, height: '100%' }}>
                                {reminders.map((reminder, index) => (
                                    <TouchableOpacity
                                        style={styles.cardContainer}
                                        activeOpacity={0.6}
                                        onPress={() => { props.navigation.navigate('UpdateBill', { reminderData: reminder }) }}
                                        key={index}
                                    >
                                        <View style={styles.transactionDetailsContainer}>
                                            <Image
                                                source={{ uri: reminder.category.img }}
                                                style={styles.transactionImage}
                                            />
                                            <View style={styles.detailsContainer}>
                                                <Text numberOfLines={1} style={styles.transactionTitle}>
                                                    {reminder.title}
                                                </Text>
                                                <Text numberOfLines={1} style={styles.transactionTime}>
                                                    Due: {dateFormater(reminder.date)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.amountDetailsContainer}>
                                            <View style={styles.amountContainer}>
                                                <Text numberOfLines={1} style={styles.amountText}>
                                                    {'₹ '}
                                                </Text>
                                                <Text numberOfLines={1} style={styles.amountText}>
                                                    {moneyTextHelper(reminder.amount)}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.amountText}>
                                                    {'>'}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ))}
                            </View>
                        </ScrollView>
                    )}


                </View>


                <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.addButton}
                        onPress={() => props.navigation.navigate('AddBillPage')}
                    >
                        <Text style={styles.buttonText}>
                            Add Reminder
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default BillsPage;