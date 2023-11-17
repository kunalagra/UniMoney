import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS } from "../../constants";
import { TextInput } from "react-native-paper";
import styles from "./signup.style";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
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
                        <TextInput style={styles.input}
                            label="Name"
                            value={name}
                            mode="outlined"
                            onChangeText={(e) => { setName(e) }}
                            outlineColor={COLORS.gray1}
                            underlineColor="transparent"
                            activeOutlineColor={COLORS.gray2}
                            activeUnderlineColor={COLORS.gray2}
                            selectionColor={COLORS.gray2}
                            textColor={COLORS.gray2}
                            theme={{ roundness: 8 }}
                        />
                        <TextInput style={styles.input}
                            label="Email address"
                            value={email}
                            mode="outlined"
                            onChangeText={(e) => { setEmail(e) }}
                            outlineColor={COLORS.gray1}
                            underlineColor="transparent"
                            activeOutlineColor={COLORS.gray2}
                            activeUnderlineColor={COLORS.gray2}
                            selectionColor={COLORS.gray2}
                            textColor={COLORS.gray2}
                            theme={{ roundness: 8 }}
                        />
                        <TextInput style={styles.input}
                            label="Password"
                            value={password}
                            secureTextEntry={passwordVisible}
                            mode="outlined"
                            onChangeText={(e) => { setPassword(e) }}
                            outlineColor={COLORS.gray1}
                            underlineColor="transparent"
                            activeOutlineColor={COLORS.gray2}
                            activeUnderlineColor={COLORS.gray2}
                            selectionColor={COLORS.gray2}
                            textColor={COLORS.gray2}
                            theme={{ roundness: 8 }}
                            right={
                                passwordVisible ? 
                                <TextInput.Icon icon={'eye'} size={20} color={COLORS.gray1} style={{ marginTop: 13 }} onPress={() => { setPasswordVisible(false) }} /> : 
                                <TextInput.Icon icon={'eye-off'} size={20} color={COLORS.gray1} style={{ marginTop: 13 }} onPress={() => { setPasswordVisible(true) }} />
                            }
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