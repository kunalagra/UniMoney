import {Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './agepage.style';
import CustomProgress from '../common/progress/CustomProgress';

const AgeCard = ({ageGroup, selectedAgeGroup, setAgeGroup}) => {
    return (
        <TouchableOpacity 
            style={styles.ageCardContainer(selectedAgeGroup, ageGroup)}
            onPress={() => setAgeGroup(ageGroup)}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedAgeGroup, ageGroup)}/>

            <Text style={styles.cardTitle}>{ageGroup}</Text>
        </TouchableOpacity>
    )
}

const AgePage = ({ selectedAgeGroup, setAgeGroup, setCurrentScreen }) => {

    return (
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
                                selectedAgeGroup={selectedAgeGroup} 
                                setAgeGroup={setAgeGroup}
                            />
                            <AgeCard 
                                ageGroup={'25-34'}
                                selectedAgeGroup={selectedAgeGroup} 
                                setAgeGroup={setAgeGroup}
                            />
                            <AgeCard 
                                ageGroup={'35-44'}
                                selectedAgeGroup={selectedAgeGroup} 
                                setAgeGroup={setAgeGroup}
                            />
                            <AgeCard 
                                ageGroup={'45-54'}
                                selectedAgeGroup={selectedAgeGroup} 
                                setAgeGroup={setAgeGroup}
                            />
                            <AgeCard 
                                ageGroup={'55+'}
                                selectedAgeGroup={selectedAgeGroup} 
                                setAgeGroup={setAgeGroup}
                            />
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(2)}
                        >
                            <Text style={styles.buttonTitle}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AgePage;