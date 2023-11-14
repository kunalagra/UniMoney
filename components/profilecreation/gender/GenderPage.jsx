import {Text, View, TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../../../constants';
import styles from './genderpage.style';
import CustomProgress from '../common/progress/CustomProgress';

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

const GenderPage = ({ selectedGender, setSelectedGender, setCurrentScreen }) => {

    const { MaleIcon, FemaleIcon, TransgenderIcon } = icons;

    return (
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
                            selectedGender={selectedGender} 
                            setSelectedGender={setSelectedGender}
                            />
                        <GenderCard 
                            Icon={FemaleIcon} 
                            gender={"Female"} 
                            selectedGender={selectedGender} 
                            setSelectedGender={setSelectedGender}
                            />
                        <GenderCard 
                            Icon={TransgenderIcon} 
                            gender={"Other"} 
                            selectedGender={selectedGender} 
                            setSelectedGender={setSelectedGender}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(1)}
                        >
                            <Text style={styles.buttonTitle}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GenderPage;