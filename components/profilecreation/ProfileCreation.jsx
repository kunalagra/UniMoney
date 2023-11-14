import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import { useState } from 'react';
import GenderPage from './gender/GenderPage';
import AgePage from './age/AgePage';
import GoalsPage from './goals/GoalsPage';
import GoalsProgressPage from './goalsprogress/GoalsProgressPage';
import { spendingCategories } from '../../utils';
import SpendingCategoriesPage from './spendingcategories/SpendingCategoriesPage';
import SpendingLimitsPage from './spendinglimits/SpendingLimitsPage';


const ProfileCreation = (props) => {
    
    const [currentScreen, setCurrentScreen] = useState(0);

    const [selectedGender, setSelectedGender] = useState('Male');
    const [ageGroup, setAgeGroup] = useState('18-24');
    const goals = ['Win at work', 'Have more money', 'Be productive', 'Build strong family', 'Have a healthy body', 'Love & be loved', 'Be happy', 'Improve social life'];
    const [selectedGoals, setGoals] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [selectedGoalsProgress, setGoalsProgress] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const categories = [...spendingCategories];
    const [selectedCategories, setCategories] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [spendingLimits, setSpendingLimits] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    
    const printData = () => {
        // console.log(currentScreen);
        // console.log(selectedGender);
        // console.log(ageGroup);
        // console.log(selectedGoals);
        // console.log(selectedGoalsProgress);
        // console.log(categories);
        // console.log(selectedCategories);
        // console.log(spendingLimits);
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
                currentScreen===2?
                <GoalsPage goals={goals} selectedGoals={selectedGoals} setGoals={setGoals} setCurrentScreen={setCurrentScreen} /> : 
                currentScreen===3?
                <GoalsProgressPage goals={goals} selectedGoals={selectedGoals} selectedGoalsProgress={selectedGoalsProgress} setGoalsProgress={setGoalsProgress} setCurrentScreen={setCurrentScreen} /> :
                currentScreen===4?
                <SpendingCategoriesPage categories={categories} selectedCategories={selectedCategories} setCategories={setCategories} setCurrentScreen={setCurrentScreen} /> :
                <SpendingLimitsPage categories={categories} selectedCategories={selectedCategories} setCategoriesLimits={setSpendingLimits} selectedCategoriesLimits={spendingLimits} printData={printData} />
            }



        </SafeAreaView>
    )
}

export default ProfileCreation;