import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './goalspage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { CheckBox } from '@rneui/themed';
import { COLORS } from '../../../constants';
import { userGoals } from '../../../utils';
import CustomButton from '../common/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setGoals } from '../../../store/profilecreation';

const GoalCard = ({goal, title, selectedGoals, setGoals, dispatch}) => {
    
    const handleToggle = () => {
        let tmp = [...selectedGoals];
        tmp[goal] = selectedGoals[goal]===1? 0 : 1;
        dispatch(setGoals([...tmp]));
    }

    return (
        <TouchableOpacity 
            style={styles.goalCardContainer(selectedGoals[goal])}
            onPress={handleToggle}
            activeOpacity={0.6}
        >
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

    const dispatch = useDispatch();
    const { goals } = useSelector(state => state.profilecreation);

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
                        progress={0.5}
                        currentPageNum={2}
                    />

                    <View style={styles.bottomContainer}>
                        <ScrollView style={{height: 380}}>
                            <View style={styles.cardsContainer}>
                                {userGoals.map((title, index) => (
                                    <GoalCard
                                        key={index}
                                        goal={index}
                                        title={title}
                                        selectedGoals={goals}
                                        setGoals={setGoals}
                                        dispatch={dispatch}
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
                                disable={goals.filter((g) => g===1).length===0}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GoalsPage;