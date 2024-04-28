import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS } from "../../../constants";
import styles from "./signup.style";
import { Icon, Input } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setEmail, setPassword } from '../../../store/profilecreation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const SignUp = (props) => {
    const dispatch = useDispatch();

    const { username, email, password } = useSelector(state => state.profilecreation);

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { GoogleIcon } = icons;

    const googleSignIn = async () => {
        GoogleSignin.configure({
            webClientId : '589151002205-7mn00hpmf6ujttmos9v12dg5d6oqahll.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            androidClientId: '589151002205-a8qcs5utili313q108ghmed3e5vbi847.apps.googleusercontent.com',
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo) {
                dispatch(setUsername(userInfo.user.name));
                dispatch(setEmail(userInfo.user.email));
                dispatch(setPassword('google'));
                props.navigation.navigate('GenderPage');
            }else {
                console.log('error');
                alert('Google Signin failed');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.logoNSignupBlock}>
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
                    <View style={styles.signupContainer}>
                        <Input
                            containerStyle={styles.inputOuterContainerStyle}
                            inputContainerStyle={styles.inputInnerContainerStyle}
                            style={styles.input}
                            placeholder='Name'
                            value={username}
                            onChangeText={(e) => dispatch(setUsername(e))}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.green0}
                            placeholderTextColor={COLORS.gray2}
                        />
                        <Input
                            containerStyle={styles.inputOuterContainerStyle}
                            inputContainerStyle={styles.inputInnerContainerStyle}
                            style={styles.input}
                            placeholder='Email address'
                            value={email}
                            onChangeText={(e) => dispatch(setEmail(e))}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.green0}
                            placeholderTextColor={COLORS.gray2}
                        />
                        <Input
                            containerStyle={styles.inputOuterContainerStyle}
                            inputContainerStyle={styles.inputInnerContainerStyle}
                            style={styles.input}
                            placeholder='Password'
                            value={password}
                            onChangeText={(e) => dispatch(setPassword(e))}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.green0}
                            placeholderTextColor={COLORS.gray2}
                            secureTextEntry={!passwordVisible}
                            rightIconContainerStyle={{ paddingRight: 15 }}
                            rightIcon={<Icon name={passwordVisible? "visibility-off" : "visibility"} color={COLORS.gray1} size={20} onPress={() => setPasswordVisible(prev => !prev)} />}
                        />
                        <TouchableOpacity
                            style={styles.signupBtn}
                            onPress={() => { 
                                // apply validation here password.length > 6 && email.includes('@')
                                if (!email.includes('@')) {
                                    alert('Invalid email address');
                                } else if (password.length < 6) {
                                    alert('Password must be at least 6 characters');
                                } else {
                                    props.navigation.navigate('GenderPage');
                                }
                            }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.signupText}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signupOptionsContainer}>
                    <View style={styles.orViaLineContainer}>
                        <View style={styles.orViaLine} />
                        <Text style={styles.orViaText}>or via</Text>
                        <View style={styles.orViaLine} />
                    </View>
                    <View style={styles.signupOptions}>
                        <TouchableOpacity
                            style={styles.signupOption}
                            activeOpacity={0.8}
                            onPress={googleSignIn}
                        >
                            <GoogleIcon
                                height={20}
                                width={20}
                            ></GoogleIcon>
                            <Text style={styles.signupOptionText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text 
                        style={styles.loginText}
                        onPress={() => { props.navigation.navigate('Login') }}
                    >
                        Already a member?{' '}
                        <Text style={styles.textDecorate}>
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};


export default SignUp;