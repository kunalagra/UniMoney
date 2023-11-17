import {Text, View, SafeAreaView, StatusBar, Switch } from 'react-native';
import styles from './pushnotificationpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, FONT, SIZES, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import { Modal, Portal } from 'react-native-paper';
import { pushNotificationOptions } from '../../../utils';

const ConfirmDialog = ({ visible, setVisibility, setNudgesAllowed }) => {
    return (
        <Modal 
            visible={visible} 
            onDismiss={() => setVisibility(false)} 
            contentContainerStyle={styles.modalStyles}
        >
            <Text style={styles.modalText}>Push Notifications?</Text>
            <View style={styles.modalButtonsContainer}>
                <CustomButton 
                    title="No"
                    handlePress={() => setVisibility(false)}
                    inlineStyles={[ styles.modalButton, { backgroundColor: COLORS.gray1} ]}
                />
                <CustomButton 
                    title="Yes"
                    handlePress={() => { setVisibility(false); setNudgesAllowed(true) }}
                    inlineStyles={[ styles.modalButton ]}
                />
            </View>
        </Modal>
    )
}


const PushOption = ({ title, description }) => {
    
    const [enable, setEnable] = useState(false);

    return (
        <View style={styles.optionContainer}>
            <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDesc}>{description}</Text>
            </View>
            <View>
            <Switch
                trackColor={{false: COLORS.gray1, true: COLORS.main4}}
                thumbColor={enable ? COLORS.main3 : COLORS.white4}
                onValueChange={() => setEnable(prev => !prev)}
                value={enable}
            />
            </View>
        </View>
    )
}


const PushNotificationPage = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isNudgesAllowed, setNudgesAllowed] = useState(false);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <Portal>
                <ConfirmDialog 
                    visible={modalVisible}
                    setVisibility={setModalVisible}
                    setNudgesAllowed={setNudgesAllowed}
                />
            </Portal>
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Synchronize'}
                        title2={"You're almost done!"}
                        progress={'100%'}
                        currentPageNum={4}
                    />

                    <View style={styles.midContainer}>
                        <View>
                            <Text style={styles.heading}>
                                Push or not to push - you choose!
                            </Text>
                        </View>
                        <View style={styles.pushOptionsContainer}>
                            {pushNotificationOptions.map((item, index) => (
                                <PushOption 
                                    key={index}
                                    title={item.title}
                                    description={item.desc}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonsContainer}>
                            <CustomButton
                                title={'Continue'}
                                handlePress={() => isNudgesAllowed? props.navigation.navigate('SettingUpPage') : setModalVisible(true)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PushNotificationPage;