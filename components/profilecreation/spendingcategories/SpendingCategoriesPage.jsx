import {Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './spendingcategoriespage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS } from '../../../constants';

const CategoryCard = ({title, category, image, selectedCategories, setCategories}) => {
    return (
        <TouchableOpacity 
            style={styles.categoryCardContainer}
            onPress={() => {
                let tmp = [...selectedCategories];
                tmp[category] = selectedCategories[category]===1? 0 : 1;
                setCategories([...tmp]);
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

const SpendingCategoriesPage = ({ categories, selectedCategories, setCategories, setCurrentScreen }) => {

    return (
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
                            {categories.map((category, index) => (
                                <CategoryCard
                                    key={index}
                                    category={index}
                                    title={category.name}
                                    image={category.image}
                                    selectedCategories={selectedCategories}
                                    setCategories={setCategories}
                                />
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.buttonContainer, { backgroundColor: COLORS.gray1 }]}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.buttonTitle}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.6}
                            onPress={() => setCurrentScreen(5)}
                        >
                            <Text style={styles.buttonTitle}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SpendingCategoriesPage;