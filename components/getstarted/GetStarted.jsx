import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {images} from '../../constants';

const GetStarted = () => {
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
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00B899',
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 8,
              shadowColor: '#000',
              elevation: 4,
            }}>
            <Text style={styles.getStartedButton}>
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerWaveContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },

    headerWaveImage: {
        height: 150, 
        aspectRatio: 0.79
    },

    textContainer: {
        width: '100%',
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
    },

    heading: {
        color: '#282828',
        fontSize: 50,
        lineHeight: 50,
        fontFamily: 'DMSans-Bold',
    },

    tagline: {
        color: '#282828', 
        fontSize: 15, 
        fontFamily: 'DMSans-Regular'
    },

    getStartedButton: {
        color: '#fff', 
        fontSize: 17, 
        fontWeight: 'bold'
    },

    footerWaveContainer: {
        width: '100%'
    },

    footerWaveImage: {
        aspectRatio: 1.8
    },

    footerRectangle: {
        width: '100%', 
        height: 100, 
        backgroundColor: '#00B899'
    }

})

export default GetStarted;
