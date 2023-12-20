import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from './agepage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS } from '../../../constants';
import { useContext } from 'react';
import CustomButton from '../common/button/CustomButton';
import profileCreationContext from '../../../contexts/profilecreation/profileCreationContext';

const AgeCard = ({ageGroup, selectedAgeGroup, setSelectedAgeGroup}) => {
    return (
        <TouchableOpacity 
            style={styles.ageCardContainer(selectedAgeGroup, ageGroup)}
            onPress={() => setSelectedAgeGroup(ageGroup)}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedAgeGroup, ageGroup)}/>

            <Text style={styles.cardTitle}>{ageGroup}</Text>
        </TouchableOpacity>
    )
}

const AgePage = (props) => {

    const { ageGroup, setAgeGroup } = useContext(profileCreationContext);

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
                                />
                                <AgeCard 
                                    ageGroup={'25-34'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                />
                                <AgeCard 
                                    ageGroup={'35-44'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                />
                                <AgeCard 
                                    ageGroup={'45-54'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
                                />
                                <AgeCard 
                                    ageGroup={'55+'}
                                    selectedAgeGroup={ageGroup} 
                                    setSelectedAgeGroup={setAgeGroup}
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