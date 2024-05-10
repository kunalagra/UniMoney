import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, RefreshControl, Button } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { Input, Icon } from '@rneui/themed';
import styles from "./banks.style";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import { Dialog } from "@rneui/base";
import { REACT_APP_BACKEND_URL } from "@env";
import LinearGradient from "react-native-linear-gradient";


const Banks = ({ navigation }) => {

    const [banks, setBanks] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [bankName, setBankName] = useState('');
    const [bankDetails, setBankDetails] = useState(null);
    const [bankAcc, setBankAcc] = useState('');

    const { alltransactions } = useSelector(state => state.transactiondata);
    const [uniqueBanksNumber, setUniqueBanksNumber] = useState([]);
    const [linkedBanks, setLinkedBanks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getUniqueBanksNumber = (linkedBanks) => {
        let uniqueBanks = new Set();
        alltransactions.forEach(transaction => {
            if (!linkedBanks.includes(transaction.acc) && transaction.acc)
                uniqueBanks.add(transaction.acc);

        });
        setUniqueBanksNumber(Array.from(uniqueBanks));

    }

    const fetchBanks = async () => {
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/bank/`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            setBanks(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getMyBanks();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const getMyBanks = async () => {
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/bank/my`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios.request(options);
            setLinkedBanks(response.data);
            let linkedBanks = [];
            response.data.forEach((item) => {
                linkedBanks.push(item.number);
            })
            getUniqueBanksNumber(linkedBanks);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const selectBank = async () => {
    
        const options = {
            method: 'POST',
            url: `${REACT_APP_BACKEND_URL}/bank/add`,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            },
            data: {
                bankId: bankDetails._id,
                number: bankAcc
            }
        };
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            getMyBanks();
            setModalVisible(!modalVisible);
            setBankDetails(null);
            setBankName('');
        }
    }

    useEffect(() => {
        getMyBanks();
    }, [refreshing, alltransactions]);

    useEffect(() => {
        getMyBanks();
    }, []);

    const { ArrowleftIcon } = icons;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowleftIcon style={styles.arrowleftIcon} fill={COLORS.gray3} />
                </TouchableOpacity>
                <Text style={styles.navHeader}>Banks</Text>
            </View>

            <Dialog
                animationType="slide"
                transparent={true}
                isVisible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                overlayStyle={styles.centeredView}
            >
                    <Input
                        leftIcon={<Icon name="search" color={COLORS.gray2} size={16} />}
                        label="Enter Bank Name"
                        style={{
                            fontSize: 15,
                            color: COLORS.gray3,
                            fontFamily: FONT.medium
                        }}
                        labelStyle={{ fontSize: 12, fontWeight: "400", color: COLORS.gray2, left: 15, fontFamily: FONT.medium }}
                        inputContainerStyle={{ borderBottomWidth: 0, top: -10, left: -10 }}
                        inputStyle={{ color: "black", height: 20 }}
                        containerStyle={{ borderBottomColor: COLORS.main3, borderBottomWidth: 2.5, alignSelf: 'stretch', height: 55, marginTop: 20 }}
                        cursorColor={COLORS.main3}
                        selectionColor={COLORS.main4}
                        autoFocus={true}
                        onChangeText={(value) => setBankName(value)}
                        value={bankName}
                    />
                    <ScrollView style={{ marginVertical: 30, alignSelf: 'stretch', paddingHorizontal: 2 }}>
                        {
                            banks.filter((item) => {
                                if (bankName == "") {
                                    return item
                                } else if (item.name.toLowerCase().includes(bankName.toLowerCase())) {
                                    return item
                                }
                            }).map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={[styles.bankDetails, bankDetails && bankDetails.name===item.name && { backgroundColor: COLORS.white5 }]}
                                        activeOpacity={1}
                                        onPress={() => { setBankDetails(item), setBankName(item.name) }}
                                    >
                                        <View>
                                            {item.img != " Ltd." ? <Image
                                                source={{ uri: item.img }}
                                                style={{ width: 20, height: 20, left: 10 }}
                                            /> : null}
                                        </View>
                                        <Text style={{ fontSize: 13, color: "black", flex: 0.9, fontFamily: FONT.medium }} numberOfLines={2}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })

                        }

                    </ScrollView>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setBankDetails(null);
                            setBankName("");
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16, fontFamily: FONT.medium }}>Close</Text>
                    </TouchableOpacity>
                    {bankDetails && (
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={selectBank}
                        >
                            <Text style={{ color: "white", fontSize: 16, fontFamily: FONT.medium }}>Select</Text>
                        </TouchableOpacity>
                    )}
            </Dialog>


            <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
            }
            >
                <View style={styles.mainContainer}>
                    <Text style={styles.accheader}>Listed Bank Accounts</Text>
                    <View style={{ gap: 10 }}>
                        {uniqueBanksNumber.length!==0? 
                            uniqueBanksNumber.map((acc, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.accContainer}
                                        onPress={() => { setModalVisible(true); setBankAcc(acc); fetchBanks(); }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 0.9 }}>
                                            <Image
                                                source={images.bank}
                                                style={styles.BankImage}
                                            />
                                            <Text style={styles.bankAcc} numberOfLines={1}>A/c No: XX {acc}</Text>
                                        </View>
                                        <Text style={styles.linkText}>
                                            Link
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        : 
                            <Text style={{ fontFamily: FONT.medium, color: COLORS.gray1, fontSize: SIZES.medium }}>
                                No Listed Accounts
                            </Text>
                        }
                    </View>
                </View>
                
                <View style={styles.bankContainer}>
                    <Text style={styles.bankHeader}>Linked Bank Accounts</Text>
                    <View>
                        {linkedBanks.length!==0? 
                            linkedBanks.map((item, index) => {
                                return (
                                    <LinearGradient
                                        key={index}
                                        colors={[ COLORS.main2, COLORS.main2, COLORS.main1, COLORS.main2, COLORS.main2 ]}
                                        style={styles.bankCard}
                                        useAngle={true} 
                                        angle={135} 
                                        angleCenter={{x:0.5,y:0.5}}
                                    >
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('TransactionByBank', { details: item })}
                                            style={{ flexDirection: "row", alignItems: "center" }}
                                        >
                                            <Image
                                                source={
                                                    { uri: item.id.img }
                                                }
                                                style={{ width: 50, height: 50, borderRadius: 10 }}
                                            />
                                            <View style={{ flexDirection: "column", gap: 10, marginLeft:15, flex: 0.9 }}>
                                                <Text style={styles.bankName} numberOfLines={1}>{item.id.name}</Text>
                                                <Text style={styles.bankAcc}>A/c No: XX {item.number}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                )
                            }) : (
                                <Text style={{ fontFamily: FONT.medium, color: COLORS.gray1, fontSize: SIZES.medium }}>
                                    No Linked Accounts
                                </Text>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default Banks