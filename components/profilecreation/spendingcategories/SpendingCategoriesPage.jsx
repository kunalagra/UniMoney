import {Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native';
import styles from './spendingcategoriespage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS } from '../../../constants';
import { spendingCategories } from '../../../utils';
import CustomButton from '../common/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../../store/profilecreation';

const CategoryCard = ({title, category, image, selectedCategories, setCategories, dispatch}) => {
    return (
        <TouchableOpacity 
            style={styles.categoryCardContainer}
            onPress={() => {
                let tmp = [...selectedCategories];
                tmp[category] = selectedCategories[category]===1? 0 : 1;
                dispatch(setCategories([...tmp]));
            }}
            activeOpacity={0.6}
        >
            <View style={styles.categoryImageContainer(selectedCategories[category])}>
                <Image
                    source={image}
                    alt={title}
                    style={{width: '100%', height: '100%'}}
                />
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

const SpendingCategoriesPage = (props) => {

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.profilecreation);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Conservation'}
                        title2={'Where you spend the most?'}
                        title3={'Choose at least one category'}
                        progress={'50%'}
                        currentPageNum={3}
                    />

                    <View style={styles.bottomContainer}>
                        <ScrollView style={{width: '100%', height: 380}}>
                            <View style={styles.cardsContainer}>
                                {spendingCategories.map((category, index) => (
                                    <CategoryCard
                                        key={index}
                                        category={index}
                                        title={category.name}
                                        image={category.image}
                                        selectedCategories={categories}
                                        setCategories={setCategories}
                                        dispatch={dispatch}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                        <View style={styles.buttonsContainer}>
                            <CustomButton
                                title="Skip"
                                handlePress={() => props.navigation.navigate('MessageSyncPage')}
                                inlineStyles={[{ backgroundColor: COLORS.gray1 }]}
                            />
                            <CustomButton
                                title="Continue"
                                handlePress={() => props.navigation.navigate('SpendingLimitsPage')}
                                disable={categories.filter(c => c===1).length===0}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SpendingCategoriesPage;