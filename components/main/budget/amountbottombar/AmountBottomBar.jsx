import { BottomSheet, Icon, Input } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants";
import styles from "./amountbottombar.style";

const AmountBottomBar = ({ visible, setVisibility, title }) => {
    
    return (
        <BottomSheet
            isVisible={visible}
            onBackdropPress={() => setVisibility(false)}
        >
            <View 
                style={styles.container}
            >
                <View style={styles.barHandle} />

                <View style={styles.mainContainer}>
                    <Text style={styles.sheetHeading}>
                        {title}
                    </Text>
                    <Input
                        containerStyle={styles.inputOuterContainer}
                        inputContainerStyle={styles.inputInnerContainer}
                        style={styles.inputStyle}
                        inputMode="numeric"
                        placeholder="(At least ₹ 1,000)"
                        underlineColorAndroid="transparent"
                        selectionColor={COLORS.gray2}
                        placeholderTextColor={COLORS.gray2}
                        leftIconContainerStyle={{ paddingLeft: 10 }}
                        leftIcon={
                            <View style={styles.leftIconContainerStyle}>
                                <Icon name="currency-rupee" color={COLORS.gray1} size={17} /> 
                                <Text style={styles.letIconContainerText}>
                                    Amount
                                </Text>
                            </View>
                        }
                    />

                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.buttonText}>
                            Set budget
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

export default AmountBottomBar;