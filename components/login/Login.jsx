import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight, Button } from "react-native";
import { images } from "../../constants";
import { TextInput, IconButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import icons from "../../constants/icons";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passvis, setPassvis] = useState(true);
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
                            style={{
                                backgroundColor: '#00B899',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                borderRadius: 8,
                                shadowColor: '#000',
                                elevation: 4,
                                marginTop: 10,
                                alignSelf: 'center',
                            }}
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
                        style={{
                            backgroundColor: '#F3F4F8',
                            paddingHorizontal: 15,
                            paddingVertical: 8,
                            borderRadius: 8,
                            shadowColor: '#000',
                            elevation: 4,
                            marginTop: 10,
                            alignSelf: 'center',
                            marginBottom: 10,
                        }}
                    >
                        <View style={styles.googelbtu}>
                            <Image 
                                source={icons.google}
                                height={20} 
                                width={20} 
                                style={{ alignSelf: 'center' }} 
                            />
                            <Text style={{ color: "#000", fontSize: 13, fontWeight: "500", alignSelf: 'center' }}>Google</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={styles.acctext}>New to UniMoney? Create an Account</Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: 'center',
    },
    frame: {
        backgroundColor: "#fff",
        // marginHorizontal: '15%',
        // marginVertical: '30%',
        height: '70%',
        width: '70%',
        alignContent: 'center',
        justifyContent: "flex-end",
        gap: 25,
    },
    header: {
        flexDirection: 'row',
        gap: 17.2,
        justifyContent: 'center',

    },
    heading: {
        color: '#282828',
        fontSize: 32,
        lineHeight: 32,
        fontFamily: 'DMSans-Bold',
    },
    logintext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#EDEDED',
        shadowColor: '#000',
        // elevation: 1,
        alignSelf: 'center',
        width: '100%',
        height: 45,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    break: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    googelbtu: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    acctext: {
        color: '#83829A',
        fontFamily: 'DMSans-Medium',
        fontSize: 10,
        alignSelf: 'center',
        lineHeight: 12,
        fontWeight: '500',
    }

});

export default Login;