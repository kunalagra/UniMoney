import {Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar, RefreshControl, ToastAndroid } from 'react-native';
import styles from './transactiondetails.style';
import { COLORS, FONT, SIZES, icons } from '../../../constants';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { REACT_APP_BACKEND_URL } from "@env";
import CustomButton from '../../profilecreation/common/button/CustomButton';
import { Dialog, Icon, Input } from '@rneui/themed';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dropdown } from 'react-native-element-dropdown';
import { setAllTransactions } from '../../../store/transactiondata'


const CategoryCard = ({id, category, selectedCategory, setSelectedCategory, tranID}) => {
    const dispatch = useDispatch();
    const { alltransactions } = useSelector(state => state.transactiondata);
    return (
        <TouchableOpacity 
            style={styles.categoryContainer}
            onPress={async () => {
                setSelectedCategory(category.name);
                const options = {
                    method: 'PUT',
                    url: `${REACT_APP_BACKEND_URL}/transaction/${tranID}`,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                    },
                    data: {
                        category: category.name
                    }
                };
                try {
                    const response = await axios(options);
                    // update the category in a transaction in the alltransactions array in redux
                    const updatedTransactions = alltransactions.map((item) => {
                        if (item._id === tranID) {
                            return {
                                ...item,
                                category: category
                            }
                        }
                        return item;
                    }
                    );
                    // console.log(updatedTransactions);
                    dispatch(setAllTransactions(updatedTransactions));

                }
                catch (error) {
                    console.log(error);
                }
            }}
            activeOpacity={0.6}
        >
            <View style={styles.categoryBackground(selectedCategory==category.name)}>
                <Image
                    source={{
                        uri: category.img
                    }}
                    alt={category.name}
                    style={styles.categoryImage}
                />
            </View>
            <Text style={styles.categoryTitle}>{category.name}</Text>
        </TouchableOpacity>
    )
}

const CustomDropdown = ({data, value, setValue}) => {
    return (
        <Dropdown
            style={{backgroundColor: COLORS.white3, borderColor: COLORS.white5, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, width: 190, paddingVertical: 5 }}
            placeholderStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            selectedTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3}}
            data={data}
            itemTextStyle={{fontFamily: FONT.regular, fontSize: SIZES.medium-2, color: COLORS.gray3,  }}
            placeholder={data[0].label}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
        />
    )
}

const EditModal = ({ editModalOpen, setEditModalOpen, selTypeOfPayment, selAccount, selReceiverID, selCategory, selAmount, selDesc, tranID, updatedTransaction }) => {

    const [accountList, setAccountList] = useState([{
        label: "No Account Selected",
        value: 0
    }]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [typeOfPayment, setTypeOfPayment] = useState(selTypeOfPayment);
    const [account, setAccount] = useState(selAccount);
    const [receiverID, setReceiverID] = useState(selReceiverID);
    const [desc, setDesc] = useState(selDesc);
    const [amount, setAmount] = useState(selAmount);
    const [category, setCategory] = useState(selCategory);

    const typeOfPaymentList = [
        { label: "Expense", value: "debit" },
        { label: "Income", value: "credit" },
    ];

    useEffect(() => {
        setLoading(true);
        const getInitialData = async () => {
            const options = {
                method: 'GET',
                url: `${REACT_APP_BACKEND_URL}/transaction/info`,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + await AsyncStorage.getItem('token')
                },
            };
            try {
                const response = await axios(options);
                setAccountList(response.data.bank.map((item) => {
                    return {
                        label: item.id.name,
                        value: item.number
                    }
                }));
                setCategoryList(response.data.category.map((item) => {
                    // console.log(item);
                    if (item.details)
                    return {
                        label: item.details.name,
                        value: item.details.name
                    }
                }));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getInitialData();
    }, []);

    const handleUpdate = async () => {
      setUpdating(true);
    //   console.log(tranID);
      const options = {
        method: 'PUT',
        url: `${REACT_APP_BACKEND_URL}/transaction/${tranID}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await AsyncStorage.getItem('token')
        },
        data: {
            category: category,
            amount: amount,
            name: receiverID,
            acc: account,
            type: typeOfPayment,
            desc: desc
        }
    };
    try {
        const response = await axios(options);
        setUpdating(false);
        updatedTransaction();
    }
    catch (error) {
        setUpdating(false);
        ToastAndroid.show('Error updating transaction', ToastAndroid.SHORT);
    }
    }

    return (
        <Dialog 
            animationType="slide"
            transparent={true}
            isVisible={editModalOpen}
            onRequestClose={() => {
                setEditModalOpen(false);
            }}
            onBackdropPress={() => {
                setEditModalOpen(false);
            }}
            overlayStyle={{ borderRadius: 8, width: 330, gap: 20, margin: 0 }}
        >
            <Text style={styles.modalHeading}>
                Modify Transaction
            </Text>
            
            {loading? (
                <View style={{ alignSelf: 'stretch', height: 430 }}>
                <SkeletonPlaceholder borderRadius={4} direction='right'>
                    <SkeletonPlaceholder.Item gap={15}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <SkeletonPlaceholder.Item width={90} height={40} borderRadius={10} />
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <SkeletonPlaceholder.Item width={120} height={40} borderRadius={10} />
                            <SkeletonPlaceholder.Item width={100} height={40} borderRadius={10} />
                        </View>
                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                        <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View> 
            ) : (

              <View style={{ gap: 20 }}>
                <View style={styles.rowField}>
                    <Text style={styles.rowHeader}>
                        Type
                    </Text>
                    <CustomDropdown data={typeOfPaymentList} value={typeOfPayment} setValue={setTypeOfPayment} />
                </View>

                {accountList.length > 0 && (
                    <View style={styles.rowField}>
                        <Text style={styles.rowHeader}>
                            { typeOfPayment === "debit" ? "Debit\n" : "Credit\n" }Account
                        </Text>
                        <CustomDropdown data={accountList} value={account} setValue={setAccount} />
                    </View>
                )}

                <View style={styles.rowField}>
                    <Text style={styles.rowHeader}>
                        { typeOfPayment === "debit" ? "Receiver" : "Sender" }
                    </Text>
                    <Input
                        containerStyle={styles.inputOuterContainer}
                        inputContainerStyle={styles.inputInnerContainer}
                        style={styles.inputStyle}
                        placeholder="Name of person, place, etc."
                        value={receiverID}
                        onChangeText={(val) => setReceiverID(val)}
                        underlineColorAndroid="transparent"
                        selectionColor={COLORS.main4}
                        placeholderTextColor={COLORS.gray3}
                        numberOfLines={1}
                    />
                </View>

                <View style={styles.rowField}>
                    <View>
                        <Text style={styles.rowHeader}>
                            Description
                        </Text>
                        <Text style={[styles.rowHeader, { fontSize: SIZES.small }]}>
                            (optional)
                        </Text>
                    </View>
                    <Input
                        containerStyle={[styles.inputOuterContainer, { height: 100 }]}
                        inputContainerStyle={styles.inputInnerContainer}
                        style={[styles.inputStyle, { textAlignVertical: 'top' }]}
                        placeholder="Name of shop, product, etc."
                        value={desc}
                        onChangeText={(val) => setDesc(val)}
                        underlineColorAndroid="transparent"
                        selectionColor={COLORS.main4}
                        placeholderTextColor={COLORS.gray3}
                        multiline
                        numberOfLines={5}
                    />
                </View>

                <View style={styles.rowField}>
                    <Text style={styles.rowHeader}>
                        Amount
                    </Text>
                    <Input
                        containerStyle={styles.inputOuterContainer}
                        inputContainerStyle={styles.inputInnerContainer}
                        style={styles.inputStyle}
                        placeholder="XXXXX"
                        inputMode="numeric"
                        value={`${amount}`}
                        onChangeText={(val) => {
                            if (isNaN(val))
                                setAmount('');
                            else if (val <= Math.pow(10, 6))
                                setAmount(val);
                        }}
                        underlineColorAndroid="transparent"
                        selectionColor={COLORS.main4}
                        placeholderTextColor={COLORS.gray3}
                        numberOfLines={1}
                        leftIconContainerStyle={{ paddingLeft: 10 }}
                        leftIcon={<Icon name="currency-rupee" color={COLORS.gray3} size={17} />}
                    />
                </View>

                <CustomButton
                  title="Save Changes"
                  handlePress={handleUpdate}
                  loading={updating}
                  disable={receiverID==='' || amount==='' || updating}
                />
              </View>
            )}
        </Dialog>
    )
}

const DeleteModal = ({ deleteModalOpen, setDeleteModalOpen, tranID, navigation }) => {
    const dispatch = useDispatch();
    const { alltransactions } = useSelector(state => state.transactiondata);
    const handleDelete = async () => {
        const options = {
            method: 'DELETE',
            url: `${REACT_APP_BACKEND_URL}/transaction/${tranID}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios(options);
            // console.log(response.data);
            // remove the transaction from the alltransactions array in redux
            const updatedTransactions = alltransactions.filter((item) => item._id !== tranID);
            // console.log(updatedTransactions);
            dispatch(setAllTransactions(updatedTransactions));
            navigation.pop();
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
                    Delete Transaction
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

const TransactionDetailsPage = (props) => {
    
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState(props.route.params);
    const [selectedCategory, setSelectedCategory] = useState(transaction.category);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { ArrowleftIcon } = icons;
    const { Categories, alltransactions } = useSelector(state => state.transactiondata);
    const [isCredited, setIsCredited] = useState(transaction.isExpense ? false : true);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const updatedTransaction = async () => {
        const options = {
            method: 'GET',
            url: `${REACT_APP_BACKEND_URL}/transaction/${transaction.id}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem('token')
            }
        };
        try {
            const response = await axios(options);
            // console.log(response.data);
            // only update the name, amount, category and isExpense and remaining will be same
            setTransaction({
                ...transaction,
                name: response.data.name,
                amount: response.data.amount,
                category: response.data.category.name,
                isExpense: response.data.type === "debit",
            });
            // update the transaction in the alltransactions array in redux
            const updatedTransactions = alltransactions.map((item) => {
                if (item._id === transaction.id) {
                    return {
                        ...item,
                        name: response.data.name,
                        amount: response.data.amount,
                        category: response.data.category,
                        isExpense: response.data.type === "debit"
                    }
                }
                return item;
            }
            );
            // console.log(updatedTransactions);
            dispatch(setAllTransactions(updatedTransactions));
            setSelectedCategory(response.data.category.name);
            setIsCredited(response.data.type === "credit");
            setEditModalOpen(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={isCredited? COLORS.green1 : COLORS.red1}
            />
            
            <EditModal 
                editModalOpen={editModalOpen} 
                setEditModalOpen={setEditModalOpen}
                selTypeOfPayment={isCredited? 'credit' : 'debit'}
                selAccount={transaction.acc}
                selReceiverID={transaction.name}
                selDesc={''}
                selCategory={selectedCategory}
                selAmount={transaction.amount}
                tranID={transaction.id}
                updatedTransaction={updatedTransaction}
            />
            <DeleteModal 
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
                tranID={transaction.id}
                navigation={props.navigation}
            />

            <ScrollView style={{ alignSelf: 'stretch' }} 
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
              }
              showsVerticalScrollIndicator={false}
              >
                <View style={styles.upperContainer(isCredited)}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowleftIcon
                                style={styles.arrowleftIcon}
                                fill={COLORS.white1}
                            />
                        </TouchableOpacity>
                        <View style={{ gap: 10, flexDirection: 'row' }}>
                            <CustomButton
                                title="Edit"
                                handlePress={() => setEditModalOpen(true)}
                                inlineStyles={[{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: COLORS.gray2 }]}
                            />
                            <CustomButton
                                title="Delete"
                                handlePress={() => setDeleteModalOpen(true)}
                                inlineStyles={[{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: COLORS.red0 }]}
                            />
                        </View>
                    </View>

                    <View style={styles.transactionDetailsContainer}>
                        <Text style={styles.paymentText}>
                            {isCredited ? 'Credit' : 'Debit'} Details
                        </Text>
                        <View style={styles.transactionContainer}>
                            <View style={styles.transactionDetails}>
                                <Image
                                    source={transaction.image}
                                    alt={transaction.name}
                                    style={styles.transactionImage}
                                />
                                <View style={styles.transactionTitleContainer}>
                                    <Text style={styles.transactionTitle}>
                                        {transaction.name}
                                    </Text>
                                    <Text style={styles.transactionTime}>
                                        {transaction.time}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.transactionAmount(transaction.isExpense)}>
                                    ₹ {transaction.amount}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.bottomText1}>
                            {transaction.isExpense ? 'Your spend was categorised' : 'Your income was categorised'}
                        </Text>
                        <Text style={styles.bottomText2}>
                            Tap to change it
                        </Text>
                    </View>
                    <View style={styles.categoriesConatainer}>
                        {Categories.map((item, index) => (
                            <CategoryCard id={index} category={item.details} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} key={index} tranID={transaction.id}/>
                        ))}
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default TransactionDetailsPage;