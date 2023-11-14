import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import { useState } from 'react';
import GenderPage from './gender/GenderPage';
import AgePage from './age/AgePage';
import GoalsPage from './goals/GoalsPage';


const ProfileCreation = (props) => {

    const [selectedGender, setSelectedGender] = useState('Male');
    const [ageGroup, setAgeGroup] = useState('18-24');
    const goals = ['Win at work', 'Have more money', 'Be productive', 'Build strong family', 'Have a healthy body', 'Love & be loved', 'Be happy', 'Improve social life'];
    const [selectedGoals, setGoals] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            {/* <GenderPage selectedGender={selectedGender} setSelectedGender={setSelectedGender} /> */}
            {/* <AgePage selectedAgeGroup={ageGroup} setAgeGroup={setAgeGroup} /> */}
            <GoalsPage goals={goals} selectedGoals={selectedGoals} setGoals={setGoals} />

        </SafeAreaView>
    )
}

export default ProfileCreation;