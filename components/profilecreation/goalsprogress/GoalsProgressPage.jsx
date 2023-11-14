import {Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './goalsprogresspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import Slider from 'react-native-slider';
import { COLORS } from '../../../constants';
import { useEffect, useState } from 'react';

const GoalCard = ({goal, title, selectedGoalsProgress, setGoalsProgress}) => {

    const [value, setValue] = useState(0);

    return (
        <View style={styles.goalCardContainer}>

            <Text style={styles.cardTitle}>{title}</Text>

            <View style={{width: '100%'}}>
                <Slider
                    value={value}
                    onValueChange={(value) => {
                        let tmp = [...selectedGoalsProgress];
                        tmp[goal] = value;
                        setGoalsProgress([...tmp]);
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

const GoalsProgressPage = ({ goals, selectedGoals, selectedGoalsProgress, setGoalsProgress, setCurrentScreen }) => {

    const [currentGoals, setCurrentGoals] = useState([]);
    useEffect(() => {
        setCurrentGoals([]);
        for (let i=0; i<selectedGoals.length; i++) {
            if (selectedGoals[i]===1) {
                setCurrentGoals(prev => [...prev, i]);
            } 
        }
    }, []);

    return (
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
                                    title={goals[index]}
                                    selectedGoalsProgress={selectedGoalsProgress}
                                    setGoalsProgress={setGoalsProgress}
                                />
                            ))}
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(4)}
                        >
                            <Text style={styles.buttonTitle}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GoalsProgressPage;