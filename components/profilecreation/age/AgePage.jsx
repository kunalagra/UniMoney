import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './agepage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS } from '../../../constants';
import CustomButton from '../common/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setAgeGroup } from '../../../store/profilecreation';

const AgeCard = ({ageGroup, selectedAgeGroup, setSelectedAgeGroup, dispatch}) => {
    return (
        <TouchableOpacity 
            style={styles.ageCardContainer(selectedAgeGroup, ageGroup)}
            onPress={() => dispatch(setSelectedAgeGroup(ageGroup))}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedAgeGroup, ageGroup)}/>

            <Text style={styles.cardTitle}>{ageGroup}</Text>
        </TouchableOpacity>
    )
}

const AgePage = (props) => {

    const dispatch = useDispatch();
    const { ageGroup } = useSelector(state => state.profilecreation);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'About you'}
                        title2={'What is your age?'}
                        progress={'100%'}
                        currentPageNum={1}
                        first={true}
                    />

                    <View style={styles.bottomContainer}>
                        <ScrollView style={{width: '100%', height: 'auto'}}>
                            <View style={styles.cardsContainer}>
                                <AgeCard 
                                    ageGroup={'18-24'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                    dispatch={dispatch}
                                />
                                <AgeCard 
                                    ageGroup={'25-34'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                    dispatch={dispatch}
                                />
                                <AgeCard 
                                    ageGroup={'35-44'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                    dispatch={dispatch}
                                />
                                <AgeCard 
                                    ageGroup={'45-54'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                    dispatch={dispatch}
                                />
                                <AgeCard 
                                    ageGroup={'55+'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                    dispatch={dispatch}
                                />
                            </View>
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('GoalsPage')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AgePage;