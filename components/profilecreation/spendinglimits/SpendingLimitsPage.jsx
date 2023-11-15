'use strict'

import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './spendinglimitspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import Slider from 'react-native-slider';
import { COLORS } from '../../../constants';
import { useEffect, useState } from 'react';
import { spendingCategories } from '../../../utils';

const CategoryCard = ({category, title, selectedCategoriesLimits, setCategoriesLimits}) => {

    const [value, setValue] = useState(1000);

    return (
        <View style={styles.categoryCardContainer}>

            <Text style={styles.cardTitle}>{title}</Text>

            <View style={{width: '100%'}}>
                <Slider
                    value={value}
                    onValueChange={(value) => {
                        let tmp = [...selectedCategoriesLimits];
                        tmp[category] = value;
                        setCategoriesLimits([...tmp]);
                        setValue(value);
                    }} 
                    step={100}
                    minimumValue={1000}
                    maximumValue={10000}
                    maximumTrackTintColor={COLORS.white4}
                    minimumTrackTintColor={COLORS.main3}
                    thumbTintColor={COLORS.white1}
                    trackStyle={{width: '100%', height: 10, borderRadius: 20}}
                    thumbStyle={{width: 20, height: 20, borderWidth: 1, borderColor: COLORS.white5}}
                />
            </View>

            <View style={styles.sliderTitlesContainer}>
                <Text style={styles.sliderTitle}>₹ 1,000</Text>
                <Text style={styles.sliderTitle}>₹ 10,000</Text>
            </View>

            <Text style={styles.cardTitle}>Adjusted limit: ₹ {value}</Text>

        </View>
    )
}

const SpendingLimitsPage = (props) => {

    const categories = [...spendingCategories];
    const selectedCategories = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
    const [selectedCategoriesLimits, setCategoriesLimits] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [currentCategories, setCurrentCategories] = useState([]);
    useEffect(() => {
        setCurrentCategories([]);
        for (let i=0; i<selectedCategories.length; i++) {
            if (selectedCategories[i]===1) {
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
                        <ScrollView style={{width: '100%', height: 480}}>
                            <View style={styles.cardsContainer}>
                                {currentCategories.map((index) => (
                                    <CategoryCard
                                        key={index}
                                        category={index}
                                        title={categories[index].name}
                                        selectedCategoriesLimits={selectedCategoriesLimits}
                                        setCategoriesLimits={setCategoriesLimits}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                        <View>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                activeOpacity={0.6}
                                onPress={() => {}}
                            >
                                <Text style={styles.buttonTitle}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SpendingLimitsPage;