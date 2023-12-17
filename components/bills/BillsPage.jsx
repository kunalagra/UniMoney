import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Switch } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { useState } from "react";
import styles from "./billspage.style";
import { moneyTextHelper } from "../../utils";


const BillsPage = (props) => {

    const { ArrowleftIcon } = icons;
  
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={{position: 'relative', height: '100%'}}>
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
                                    Bills/Reminders
                                </Text>
                            </View>
                        </View>

                        <View style={{ gap: 20 }}>

                            <TouchableOpacity 
                                style={styles.cardContainer}
                                activeOpacity={0.6}
                                onPress={() => {}}
                            >
                                <View style={styles.transactionDetailsContainer}>
                                    <Image
                                        source={images.shopping}
                                        style={styles.transactionImage}
                                    />
                                    <View style={styles.detailsContainer}>
                                        <Text numberOfLines={1} style={styles.transactionTitle}>
                                            Shopping Charges
                                        </Text>
                                        <Text numberOfLines={1} style={styles.transactionTime}>
                                            Due: 15/17/2023
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.amountDetailsContainer}>
                                    <View style={styles.amountContainer}>
                                        <Text numberOfLines={1} style={styles.amountText}>
                                            {'₹ '}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.amountText}>
                                            {moneyTextHelper(5000)}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.amountText}>
                                            {'>'}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>

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