import { BottomSheet, Icon, Input } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants";
import styles from "./amountbottombar.style";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AmountBottomBar = ({ visible, setVisibility, title }) => {

    const [amount, setAmount] = useState('');
    
    return (
        <BottomSheet
            isVisible={visible}
            onBackdropPress={() => setVisibility(false)}
        >
            <View 
                style={styles.container}
            >
                <View style={styles.barHandle} />

                <View style={styles.mainContainer}>
                    <Text style={styles.sheetHeading}>
                        {title}
                    </Text>
                    <Input
                        containerStyle={styles.inputOuterContainer}
                        inputContainerStyle={styles.inputInnerContainer}
                        style={styles.inputStyle}
                        inputMode="numeric"
                        value={amount}
                        onChangeText={(e) => setAmount(e)}
                        placeholder="(At least ₹ 1,000)"
                        underlineColorAndroid="transparent"
                        selectionColor={COLORS.gray2}
                        placeholderTextColor={COLORS.gray2}
                        leftIconContainerStyle={{ paddingLeft: 10 }}
                        leftIcon={
                            <View style={styles.leftIconContainerStyle}>
                                <Icon name="currency-rupee" color={COLORS.gray1} size={17} /> 
                                <Text style={styles.letIconContainerText}>
                                    Amount
                                </Text>
                            </View>
                        }
                    />

                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        activeOpacity={0.85}
                        onPress= {async () => {
                            if (title === 'Monthly Budget'){
                                await AsyncStorage.setItem('monthlyBudgetLimit', amount);
                                setVisibility(false);
                            }else {
                                const options = {
                                    method: 'POST',
                                    url: 'https://unimoney-backend.onrender.com/category/limit',
                                    headers: {
                                        "Content-type": "application/json",
                                        "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                                    },
                                    data: {
                                        name: title,
                                        limit: amount
                                    }
                                }
                                try {
                                    const response = await axios(options);
                                    console.log(response.data);
                                    setVisibility(false);
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Set budget
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

export default AmountBottomBar;