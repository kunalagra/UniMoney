"use strict";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS } from "../../../constants";
import { Input, Icon } from '@rneui/themed';
import styles from "./login.style";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID} from '@env';


const Login = (props) => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async ({gemail, gpassword}) => {
        setLoading(true);
        const options = {
            method: 'POST',
            url: 'https://unimoney-backend.onrender.com/auth/login',
            data: {
                email: email ? email : gemail,
                password: password ? password : gpassword
            }
        };

        try {
            const response = await axios.request(options);
            if (response.status === 200) {
                AsyncStorage.setItem('token', response.data.token);
                setLoading(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }
        } catch (error) {
            console.log(error);
            setPassword('');
            setEmail('');
            if (error.response.status === 401) {
                alert('Invalid email or password done');
            }
        }
    }

    const googleSignIn = async () => {
        setLoading(true);
        GoogleSignin.configure({
            webClientId: REACT_APP_GOOGLE_CLIENT_ID,
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            offlineAccess: true,
            androidClientId: REACT_APP_ANDROID_CLIENT_ID,
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo) {
                handleLogin({gemail: userInfo.user.email, gpassword: 'google'});
            } else {
                console.log('error');
                alert('Google Signin failed');
            }

        } catch (error) {
            console.log(error);
        }
    }



    const [passwordVisible, setPasswordVisible] = useState(false);
    const { GoogleIcon, Loader } = icons;

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.logoNloginBlock}>
                    <View style={styles.logoContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={images.logo2}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.logoText}>
                            UNI{'\n'}MONEY
                        </Text>
                    </View>
                    <View style={styles.loginContainer}>
                        <Input
                            containerStyle={styles.inputOuterContainerStyle}
                            inputContainerStyle={styles.inputInnerContainerStyle}
                            style={styles.input}
                            placeholder='Email address'
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.gray2}
                            placeholderTextColor={COLORS.gray2}
                        />
                        <Input
                            containerStyle={styles.inputOuterContainerStyle}
                            inputContainerStyle={styles.inputInnerContainerStyle}
                            style={styles.input}
                            placeholder='Password'
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.gray2}
                            placeholderTextColor={COLORS.gray2}
                            secureTextEntry={!passwordVisible}
                            rightIconContainerStyle={{ paddingRight: 15 }}
                            rightIcon={<Icon name={passwordVisible ? "visibility-off" : "visibility"} color={COLORS.gray1} size={20} onPress={() => setPasswordVisible(prev => !prev)} />}
                        />
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={handleLogin}
                            activeOpacity={0.7}
                            disabled={loading}
                        >
                            { loading ? (
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:10}}>
                                <Loader height={20} width={20}></Loader>
                                <Text style={styles.loginText}>
                                    Logging in...
                                </Text>
                            </View>
                            ) : (
                            <Text style={styles.loginText}>
                                Login
                            </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.loginOptionsContainer}>
                    <View style={styles.orViaLineContainer}>
                        <View style={styles.orViaLine} />
                        <Text style={styles.orViaText}>or via</Text>
                        <View style={styles.orViaLine} />
                    </View>
                    <View style={styles.loginOptions}>
                        <TouchableOpacity
                            style={styles.loginOption}
                            activeOpacity={0.8}
                            onPress={googleSignIn}
                            disabled={loading}
                        >
                            <GoogleIcon
                                height={20}
                                width={20}
                            ></GoogleIcon>
                            <Text style={styles.loginOptionText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text
                        style={styles.signupText}
                        onPress={() => { props.navigation.navigate('SignUp') }}
                    >
                        New to UniMoney?{' '}
                        <Text style={styles.textDecorate}>
                            Create an account
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};


export default Login;