import { useContext } from 'react';
import {Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, icons } from '../../../constants';
import CustomProgress from '../common/progress/CustomProgress';
import CustomButton from '../common/button/CustomButton';
import styles from './genderpage.style';
import profileCreationContext from '../../../contexts/profilecreation/profileCreationContext';

const GenderCard = ({Icon, gender, selectedGender, setSelectedGender}) => {
    return (
        <TouchableOpacity 
            style={styles.genderCardContainer(selectedGender, gender)}
            onPress={() => setSelectedGender(gender)}
            activeOpacity={0.6}
        >
            <View style={styles.cardBackground(selectedGender, gender)}/>

            <View style={styles.iconContainer(selectedGender, gender)}>
                <Icon width={35} height={35} fill={selectedGender===gender? COLORS.white1 : COLORS.gray2} />
            </View>

            <Text style={styles.cardTitle}>{gender}</Text>
        </TouchableOpacity>
    )
}

const GenderPage = (props) => {

    const { gender, setGender } = useContext(profileCreationContext);

    const { MaleIcon, FemaleIcon, TransgenderIcon } = icons;

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
                        title2={'Select your Gender'}
                        progress={'50%'}
                        currentPageNum={1}
                        first={true}
                    />

                    <View style={styles.bottomContainer}>
                        <View style={styles.cardsContainer}>
                            <GenderCard 
                                Icon={MaleIcon} 
                                gender={"Male"} 
                                selectedGender={gender} 
                                setSelectedGender={setGender}
                                />
                            <GenderCard 
                                Icon={FemaleIcon} 
                                gender={"Female"} 
                                selectedGender={gender} 
                                setSelectedGender={setGender}
                                />
                            <GenderCard 
                                Icon={TransgenderIcon} 
                                gender={"Other"} 
                                selectedGender={gender} 
                                setSelectedGender={setGender}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('AgePage')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GenderPage;