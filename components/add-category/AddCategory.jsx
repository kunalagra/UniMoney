import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { useState } from "react";
import { Icon, Input } from "@rneui/themed";
import styles from "./addcategory.style";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from "@env";




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

    const postData = async () => {
        // send image in formdata format
        if (categoryName == '') {
            alert('Please enter a name for category');
            return;
        }
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('key', '99c156a8c49cb257d3305e9ef1ae780e')
        formData.append('image', imageData);
        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(async (response) => {
                // console.log(response.data.data.url);
                const option = {
                    method: 'POST',
                    url: `${REACT_APP_BACKEND_URL}/category/`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
                    },
                    data: {
                        name: categoryName,
                        img: response.data.data.url,
                    }
                }
                try {
                    const res = await axios.request(option);
                    // console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
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
                        onPress={() => { postData() }}
                    >
                        <Text style={styles.buttonText}>
                            Save & Add more
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.lowerButton}
                        activeOpacity={0.85}
                        onPress={() => { postData(); props.navigation.pop() }}
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