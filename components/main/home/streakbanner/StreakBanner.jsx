
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, images } from '../../../../constants';
import styles from './streakbanner.style';


const StreakBanner = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.cardContainer}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={[ COLORS.purple1, COLORS.purple1, COLORS.purple1, COLORS.purple2 ]}
                style={styles.gradientBackground}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                
            >
                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.upperText}> 
                                Save your
                            </Text>
                            <Text style={styles.lowerText}>
                                Streak
                            </Text>
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={images.diceWithTiles}
                            style={styles.image}
                        />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    </View>
  )
}

export default StreakBanner