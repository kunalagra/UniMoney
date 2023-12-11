import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './goalspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { CheckBox } from '@rneui/themed';
import { COLORS } from '../../../constants';
import { useState } from 'react';
import { userGoals } from '../../../utils';
import CustomButton from '../common/button/CustomButton';

const GoalCard = ({goal, title, selectedGoals, setGoals}) => {
    
    const handleToggle = () => {
        let tmp = [...selectedGoals];
        tmp[goal] = selectedGoals[goal]===1? 0 : 1;
        setGoals([...tmp]);
    }

    return (
        <TouchableOpacity 
            style={styles.goalCardContainer(selectedGoals[goal])}
            onPress={handleToggle}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedGoals[goal])}/>

            <Text style={styles.cardTitle}>{title}</Text>

            <CheckBox 
                checked={selectedGoals[goal]===1}
                checkedColor={COLORS.main3}
                uncheckedColor={COLORS.white4}
                onPress={handleToggle}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                wrapperStyle={{backgroundColor: 'transparent'}}
                containerStyle={{backgroundColor: 'transparent'}}
            />
        </TouchableOpacity>
    )
}

const GoalsPage = (props) => {

    const goals = [...userGoals];
    const [selectedGoals, setGoals] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

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
                        title2={'What are your goals?'}
                        title3={'Choose up to 3 goals for more precise personlization'}
                        progress={'50%'}
                        currentPageNum={2}
                    />

                    <View style={styles.bottomContainer}>
                        <ScrollView style={{width: '100%', height: 380}}>
                            <View style={styles.cardsContainer}>
                                {goals.map((title, index) => (
                                    <GoalCard
                                        key={index}
                                        goal={index}
                                        title={title}
                                        selectedGoals={selectedGoals}
                                        setGoals={setGoals}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                        <View style={styles.buttonsContainer}>
                            <CustomButton
                                title="Skip"
                                handlePress={() => props.navigation.navigate('SpendingCategoriesPage')}
                                inlineStyles={[{ backgroundColor: COLORS.gray1 }]}
                            />
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('GoalsProgressPage')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GoalsPage;