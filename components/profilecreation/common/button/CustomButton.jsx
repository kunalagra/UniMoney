import { TouchableOpacity, Text, Image, View } from "react-native";
import styles from "./custombutton.style";
import { icons } from "../../../../constants";

const CustomButton = ({ title, handlePress, inlineStyles=[], textStyles=[], activeOpacity=0.6, disable=false, loading}) => {

    const { Loader } = icons;

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, ...inlineStyles]}
            activeOpacity={activeOpacity}
            onPress={handlePress}
            disabled={disable}
        >
            {loading? (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Loader
                        width={22}
                        height={22}
                        style={{ marginHorizontal: 'auto' }}
                    />
                </View>
            ) : (
                <Text style={[styles.buttonTitle, ...textStyles]}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default CustomButton;