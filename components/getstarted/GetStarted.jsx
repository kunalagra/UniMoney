import {Text, Image, View, TouchableOpacity} from 'react-native';
import {images} from '../../constants';
import styles from './getstarted.style';

const GetStarted = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWaveContainer}>
        <View style={styles.headerWaveImage}>
          <Image
            source={images.headerwave}
            style={{
              resizeMode: 'cover',
              height: '100%',
              width: '100%',
            }}
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.heading}>
            UNI{'\n'}MONEY
          </Text>
        </View>
        <View>
          <Text style={styles.tagline}>
            Unify your finances,{'\n'}Simply your life
          </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            underlayColor="Transparent"
            style={styles.getStartedButton}
            onPress={() => {props.navigation.navigate('Login')}}
            >
            <Text style={styles.getStartedButtonText}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerWaveContainer}>
        <View style={styles.footerWaveImage}>
          <Image
            source={images.wave_with_coin}
            style={{
              resizeMode: 'cover',
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View style={styles.footerRectangle} />
      </View>
    </View>
  );
};

export default GetStarted;
