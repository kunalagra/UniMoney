import {Text, Image, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import { COLORS, SHADOWS, SIZES, icons } from '../../constants';
import { useState } from 'react';
import GenderPage from './genderpage/GenderPage';


const ProfileCreation = (props) => {

    const [selectedGender, setSelectedGender] = useState("Male");

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            <GenderPage selectedGender={selectedGender} setSelectedGender={setSelectedGender} />

        </SafeAreaView>
    )
}

export default ProfileCreation;