import {Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './goalsprogresspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { Slider } from '@rneui/themed';
import { COLORS } from '../../../constants';
import { useEffect, useState } from 'react';
import { userGoals } from '../../../utils';
import CustomButton from '../common/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalsProgress } from '../../../store/profilecreation';

const GoalCard = ({goal, title, selectedGoalsProgress, setGoalsProgress, dispatch}) => {

    const [value, setValue] = useState(0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let tmp = [...selectedGoalsProgress];
            tmp[goal] = value;
            dispatch(setGoalsProgress([...tmp]));
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      }, [value]);

    return (
        <View style={styles.goalCardContainer}>

            <Text style={styles.cardTitle}>{title}</Text>

            <View style={{width: '100%'}}>
                <Slider
                    value={value}
                    onValueChange={(value) => {
                        setValue(value);
                    }} 
                    step={25}
                    minimumValue={0}
                    maximumValue={100}
                    maximumTrackTintColor={COLORS.white4}
                    minimumTrackTintColor={COLORS.main3}
                    thumbTintColor={COLORS.white1}
                    trackStyle={{width: '100%', height: 10, borderRadius: 20}}
                    thumbStyle={{width: 20, height: 20, borderWidth: 1, borderColor: COLORS.white5}}
                />
            </View>

            <View style={styles.sliderTitlesContainer}>
                <Text style={styles.sliderTitle}>None</Text>
                <Text style={styles.sliderTitle}>Almost achieved</Text>
            </View>

        </View>
    )
}

const GoalsProgressPage = (props) => {

    const dispatch = useDispatch();
    const { goals, goalsProgress } = useSelector(state => state.profilecreation);

    const [currentGoals, setCurrentGoals] = useState([]);
    useEffect(() => {
        setCurrentGoals([]);
        for (let i=0; i<goals.length; i++) {
            if (goals[i]===1) {
                setCurrentGoals(prev => [...prev, i]);
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
                        title1={'Aspiration'}
                        title2={'What are your progress in these goals so far?'}
                        progress={'100%'}
                        currentPageNum={2}
                    />

                    <View style={styles.bottomContainer}>
                        <ScrollView style={{width: '100%', height: 480}}>
                            <View style={styles.cardsContainer}>
                                {currentGoals.map((index) => (
                                    <GoalCard
                                        key={index}
                                        goal={index}
                                        title={userGoals[index]}
                                        selectedGoalsProgress={goalsProgress}
                                        setGoalsProgress={setGoalsProgress}
                                        dispatch={dispatch}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('SpendingCategoriesPage')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GoalsProgressPage;