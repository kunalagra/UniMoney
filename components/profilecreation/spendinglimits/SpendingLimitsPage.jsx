import {Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './spendinglimitspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { Slider } from '@rneui/themed';
import { COLORS } from '../../../constants';
import { useEffect, useState } from 'react';
import { moneyTextHelper, spendingCategories } from '../../../utils';
import CustomButton from '../common/button/CustomButton';
import { Input, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesLimits } from '../../../store/profilecreation';

const CategoryCard = ({category, title, selectedCategoriesLimits, setCategoriesLimits, maxLimit, dispatch}) => {

    const [value, setValue] = useState(1000);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let tmp = [...selectedCategoriesLimits];
            tmp[category] = value;
            dispatch(setCategoriesLimits([...tmp]));
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      }, [value]);

    useEffect(() => {
        const mxl = Number(maxLimit);
        if (!isNaN(mxl) && value >= 10000 && mxl < value) {
            setValue(mxl);
            let tmp = [...selectedCategoriesLimits];
            tmp[category] = mxl;
            dispatch(setCategoriesLimits([...tmp]));
        }
    }, [maxLimit]);

    return (
        <View style={styles.categoryCardContainer}>

            <Text style={styles.cardTitle}>{title}</Text>

            <View style={{width: '100%'}}>
                <Slider
                    value={value}
                    onValueChange={(value) => {
                        setValue(value);
                    }} 
                    step={500}
                    minimumValue={1000}
                    maximumValue={Math.max(Math.min(100000, Number(maxLimit)), 10000)}
                    maximumTrackTintColor={COLORS.white4}
                    minimumTrackTintColor={COLORS.main3}
                    thumbTintColor={COLORS.white1}
                    trackStyle={{width: '100%', height: 10, borderRadius: 20}}
                    thumbStyle={{width: 20, height: 20, borderWidth: 1, borderColor: COLORS.white5}}
                />
            </View>

            <View style={styles.sliderTitlesContainer}>
                <Text style={styles.sliderTitle}>₹ 1000</Text>
                <Text style={styles.sliderTitle}>₹ {moneyTextHelper(Math.max(Math.min(100000, maxLimit), 10000))}</Text>
            </View>

            <Text style={styles.cardTitle}>Adjusted limit: ₹ {value}</Text>

        </View>
    )
}

const SpendingLimitsPage = (props) => {

    // const { categories, categoriesLimits, setCategoriesLimits } = useContext(profileCreationContext);
    const dispatch = useDispatch();
    const { categories, categoriesLimits } = useSelector(state => state.profilecreation);
    const [maxLimit, setMaxLimit] = useState('');

    const [currentCategories, setCurrentCategories] = useState([]);
    useEffect(() => {
        setCurrentCategories([]);
        for (let i=0; i<categories.length; i++) {
            if (categories[i]===1) {
                setCurrentCategories(prev => [...prev, i]);
            } 
        }
    }, []);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Conservation'}
                        title2={'Adjust your spending limits'}
                        progress={'100%'}
                        currentPageNum={3}
                    />

                    <View style={styles.bottomContainer}>

                        <View style={{marginBottom: 20}}>

                            <Input
                                containerStyle={styles.inputOuterContainerStyle}
                                inputContainerStyle={styles.inputInnerContainerStyle}
                                style={styles.input}
                                inputMode="numeric"
                                placeholder="(At least ₹ 10,000)"
                                value={maxLimit}
                                onChangeText={(val) => { 
                                    if (isNaN(val))
                                        setMaxLimit('');
                                    else if (val >= 100000) 
                                        setMaxLimit('100000');
                                    else setMaxLimit(val);
                                }}
                                underlineColorAndroid="transparent"
                                selectionColor={COLORS.gray2}
                                placeholderTextColor={COLORS.gray2}
                                leftIconContainerStyle={{ paddingLeft: 10 }}
                                leftIcon={
                                    <View style={styles.inputLeftIconContainer}>
                                        <Icon name="currency-rupee" color={COLORS.gray1} size={17} /> 
                                        <Text style={styles.inputLeftIconText}>
                                            Max Limit
                                        </Text>
                                    </View>
                                }
                            />

                        </View>

                        <ScrollView style={{width: '100%', height: 400}}>
                            <View style={styles.cardsContainer}>
                                {currentCategories.map((index) => (
                                    <CategoryCard
                                        key={index}
                                        category={index}
                                        title={spendingCategories[index].name}
                                        selectedCategoriesLimits={categoriesLimits}
                                        setCategoriesLimits={setCategoriesLimits}
                                        maxLimit={maxLimit}
                                        dispatch={dispatch}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('MessageSyncPage')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SpendingLimitsPage;