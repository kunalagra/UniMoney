import {Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './goalspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { Checkbox } from 'react-native-paper';
import { COLORS } from '../../../constants';

const GoalCard = ({goal, title, selectedGoals, setGoals}) => {
    return (
        <TouchableOpacity 
            style={styles.goalCardContainer(selectedGoals[goal])}
            onPress={() => {
                let tmp = [...selectedGoals];
                tmp[goal] = selectedGoals[goal]===1? 0 : 1;
                setGoals([...tmp]);
            }}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedGoals[goal])}/>

            <Text style={styles.cardTitle}>{title}</Text>

            <Checkbox 
                status={selectedGoals[goal]===1? 'checked' : 'unchecked'}
                color={COLORS.main3}
                uncheckedColor={COLORS.white4}
            />
        </TouchableOpacity>
    )
}

const GoalsPage = ({ goals, selectedGoals, setGoals, setCurrentScreen }) => {

    return (
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
                        <TouchableOpacity
                            style={[styles.buttonContainer, { backgroundColor: COLORS.gray1 }]}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(4)}
                        >
                            <Text style={styles.buttonTitle}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(3)}
                        >
                            <Text style={styles.buttonTitle}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GoalsPage;