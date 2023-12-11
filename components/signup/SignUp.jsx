import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS } from "../../constants";
import styles from "./signup.style";
import { Icon, Input } from "@rneui/themed";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState('');

    const { GoogleIcon } = icons;

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
                            value={name}
                            onChangeText={(e) => setName(e)}
                            underlineColorAndroid="transparent"
                            selectionColor={COLORS.gray2}
                            placeholderTextColor={COLORS.gray2}
                        />
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
                            style={styles.signupBtn}
                            onPress={() => { props.navigation.navigate('GenderPage') }}
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


export default Login;