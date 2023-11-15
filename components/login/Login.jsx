import React, { useState } from "react";

import { View, Text, Image, TouchableHighlight } from "react-native";
import { images, icons } from "../../constants";
import { TextInput } from "react-native-paper";
import styles from "./login.style";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passvis, setPassvis] = useState(true);

    const { GoogleIcon } = icons;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.frame}>
                <View style={{ flexDirection: "column", justifyContent: "flex-end", gap: 30 }}>
                    <View style={{ flexDirection: "column", alignItems: "center", gap: 17.2 }}>
                        <View style={styles.header}>
                            <Image
                                source={images.logo2}
                                style={{
                                    resizeMode: 'cover',
                                    height: 48,
                                    width: 48,
                                }}
                            />
                            <Text style={styles.heading}>
                                UNI{'\n'}MONEY
                            </Text>
                        </View>
                        <TextInput style={styles.input}
                            label="Email address"
                            value={email}
                            onChangeText={(e) => { setEmail(e) }}
                            mode="outlined"
                            outlineColor="transparent"
                            underlineColor="transparent"
                            activeOutlineColor="#444262"
                            activeUnderlineColor="#EDEDED"
                            selectionColor="#00B899"
                            theme={{ roundness: 10, }}

                        />
                        <TextInput style={styles.input}
                            label="Password"
                            value={password}
                            secureTextEntry={passvis}
                            onChangeText={(e) => { setPassword(e) }}
                            mode="outlined"
                            outlineColor="transparent"
                            underlineColor="transparent"
                            activeOutlineColor="#444262"
                            activeUnderlineColor="#EDEDED"
                            selectionColor="#00B899"
                            theme={{ roundness: 10 }}
                            right={passvis ? <TextInput.Icon icon={'eye'} size={20} color={'#444262'} style={{ marginTop: 10 }} onPress={() => { setPassvis(false) }} /> : <TextInput.Icon icon={'eye-off'} size={20} color={'#444262'} style={{ marginTop: 10 }} onPress={() => { setPassvis(true) }} />}

                        />
                        <TouchableHighlight
                            style={styles.loginbtu}
                            onPress={() => { props.navigation.navigate('GenderPage') }}
                            underlayColor='#1DE2C1'
                        >
                            <Text style={styles.logintext}>
                                Login
                            </Text>

                        </TouchableHighlight>
                    </View>
                    <View style={styles.break}>
                        <View style={{ height: 1, width: 80, backgroundColor: "#83829A" }}>
                        </View>
                        <Text style={{ color: "#83829A", fontSize: 12, fontWeight: "500", paddingHorizontal: 10 }}>or via</Text>
                        <View style={{ height: 1, width: 80, backgroundColor: "#83829A" }}>
                        </View>
                    </View>
                    <TouchableHighlight
                        style={styles.btu}
                    >
                        <View style={styles.googelbtu}>
                            <GoogleIcon
                                height={20}
                                width={20}
                                style={{ alignSelf: 'center' }}
                            ></GoogleIcon>
                            <Text style={{ color: "#000", fontSize: 13, fontWeight: "500", alignSelf: 'center' }}>Google</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={styles.acctext}
                    onPress={() => { props.navigation.navigate('SignUp') }}
                >New to UniMoney? Create an Account</Text>

            </View>
        </View>
    );
};


export default Login;