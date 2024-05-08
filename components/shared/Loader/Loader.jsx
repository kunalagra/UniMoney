import {Svg, G, Path} from 'react-native-svg';
import {Animated, Easing, View} from 'react-native';

function animateTransform({type, from, to, dur, repeatCount}) {
  const duration = parseFloat(dur.slice(0, -1)) * 1000;
  const [fromAngle, fromCX, fromCY] = from.split(' ').map(Number);
  const [toAngle, toCX, toCY] = to.split(' ').map(Number);
  const t = new Animated.Value(0);
  const animateTransform = [
    Animated.timing(t, {
      duration,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ];
  const animation = Animated.loop(Animated.sequence(animateTransform), {
    iterations: -1,
  }).start();
  const rotateAngle = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromAngle + 'deg', toAngle + 'deg'],
  });
  const cx = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromCX, toCX],
  });
  const cy = t.interpolate({
    inputRange: [0, 1],
    outputRange: [fromCY, toCY],
  });
  const icx = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-fromCX, -toCX],
  });
  const icy = t.interpolate({
    inputRange: [0, 1],
    outputRange: [-fromCY, -toCY],
  });
  const style = {
    transform: [
      {translateX: cx},
      {translateY: cy},
      {rotateZ: rotateAngle},
      {translateX: icx},
      {translateY: icy},
    ],
  };
  return {t, animation, style, rotateAngle, cx, cy, icx, icy};
}

const AnimatedLoader = ({ fill="#00B899", width=48, height=48, boxStyles={} }) => {
  const {style } = animateTransform({
    type: 'rotate',
    from: '0 64 64',
    to: '360 64 64',
    dur: '1s',
    repeatCount: 'indefinite',
  });

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  return (
    <View style={boxStyles}>
      <Svg
        width={width}
        height={width}
        viewBox="-64 -64 128 128"
        >
        <G>
          <AnimatedPath
            d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
            fill={fill}
            style={style}
          />
        </G>
      </Svg>
    </View>
  );
};

export default AnimatedLoader;
