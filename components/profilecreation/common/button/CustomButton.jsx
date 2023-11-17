import { TouchableOpacity, Text } from "react-native";
import styles from "./custombutton.style";

const CustomButton = ({ title, handlePress, inlineStyles=[], textStyles=[], activeOpacity=0.6, disable=false}) => {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, ...inlineStyles]}
            activeOpacity={activeOpacity}
            onPress={handlePress}
            disabled={disable}
        >
            <Text style={[styles.buttonTitle, ...textStyles]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;