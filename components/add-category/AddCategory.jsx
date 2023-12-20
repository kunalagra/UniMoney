import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { useState } from "react";
import { Icon, Input } from "@rneui/themed";
import styles from "./addcategory.style";
import { launchImageLibrary } from 'react-native-image-picker';




const AddCategory = (props) => {

    const { ArrowleftIcon } = icons;

    const [categoryName, setCategoryName] = useState('');

    const [imageData, setImageData] = useState('');
    const [imageUri, setImageUri] = useState('');

    const chooseImage = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true,
            saveToPhotos: true,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
            } else {
                setImageData(response.assets[0].base64);
                setImageUri(response.assets[0].uri);
            }
        });
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2, flex: 1 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <ArrowleftIcon
                            style={styles.arrowleftIcon}
                            fill={COLORS.gray3}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.navHeading}>
                            Add Category
                        </Text>
                    </View>
                </View>

                <View style={styles.mainContainer}>

                    <View style={styles.rowField}>
                        <Text style={styles.rowHeader}>
                            Category
                        </Text>
                        <Input
                            containerStyle={styles.inputOuterContainer}
                            inputContainerStyle={styles.inputInnerContainer}
                            style={styles.inputStyle}
                            placeholder="Name/Title of Category"
                            value={categoryName}
                            onChangeText={(val) => setCategoryName(val)}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.gray3}
                            placeholderTextColor={COLORS.gray3}
                            numberOfLines={1}
                        />
                    </View>
                    <View style={styles.imageRowField}>
                        <Text style={styles.imageRowHeader}>
                            Image
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={imageUri ? { uri: imageUri } : images.category}
                                resizeMode="contain"
                                style={styles.imageStyle}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.imageButton}
                        activeOpacity={0.85}
                        onPress={() => { chooseImage() }}
                    >
                        <Text style={styles.buttonText}>
                            Upload Image
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.upperButton}
                        activeOpacity={0.85}
                        onPress={() => { }}
                    >
                        <Text style={styles.buttonText}>
                            Save & Add more
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.lowerButton}
                        activeOpacity={0.85}
                        onPress={() => props.navigation.pop()}
                    >
                        <Text style={styles.buttonText}>
                            Save & Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default AddCategory;