import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import {} from "react-native-paper";


const AddTransactionPage = (props) => {

    const { ArrowleftIcon } = icons;

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />

            <ScrollView style={{width: '100%'}}>

                <View style={{gap: 40, paddingHorizontal: 20, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 20}}>
                        <TouchableOpacity>
                            <ArrowleftIcon
                                style={{width: 24, height: 24}}
                                fill={COLORS.gray3}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large - 2, color: COLORS.gray3}}>
                                Add Transaction
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={{fontFamily: FONT.regular, fontSize: SIZES.medium, color: COLORS.gray3}}>
                                Type
                            </Text>

                        </View>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default AddTransactionPage;