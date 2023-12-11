import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS } from "../../constants";
import { Input, Icon } from '@rneui/themed';
import styles from "./login.style";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { GoogleIcon } = icons;

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
                            rightIcon={<Icon name={passwordVisible? "visibility-off" : "visibility"} color={COLORS.gray1} size={20} onPress={() => setPasswordVisible(prev => !prev)} />}
                        />
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={() => { props.navigation.navigate('Main') }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.loginText}>
                                Login
                            </Text>
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