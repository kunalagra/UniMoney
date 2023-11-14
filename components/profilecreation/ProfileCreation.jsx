import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import { useState } from 'react';
import GenderPage from './gender/GenderPage';
import AgePage from './age/AgePage';
import GoalsPage from './goals/GoalsPage';


const ProfileCreation = (props) => {
    
    const [currentScreen, setCurrentScreen] = useState(0);

    const [selectedGender, setSelectedGender] = useState('Male');
    const [ageGroup, setAgeGroup] = useState('18-24');
    const goals = ['Win at work', 'Have more money', 'Be productive', 'Build strong family', 'Have a healthy body', 'Love & be loved', 'Be happy', 'Improve social life'];
    const [selectedGoals, setGoals] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    
    
    const printData = () => {
        console.log(currentScreen);
        console.log(selectedGender);
        console.log(ageGroup);
        console.log(selectedGoals);
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            {
                currentScreen===0? 
                    <GenderPage selectedGender={selectedGender} setSelectedGender={setSelectedGender} setCurrentScreen={setCurrentScreen} /> :
                currentScreen===1?
                    <AgePage selectedAgeGroup={ageGroup} setAgeGroup={setAgeGroup} setCurrentScreen={setCurrentScreen} /> :
                    <GoalsPage goals={goals} selectedGoals={selectedGoals} setGoals={setGoals} printData={printData} />
            }

        </SafeAreaView>
    )
}

export default ProfileCreation;