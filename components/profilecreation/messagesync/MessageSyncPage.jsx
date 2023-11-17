import {Text, View, SafeAreaView, StatusBar, Image } from 'react-native';
import styles from './messagesyncpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import { Modal, Portal } from 'react-native-paper';

const ConfirmDialog = ({ visible, setVisibility, handleSync}) => {
    return (
        <Modal 
            visible={visible} 
            onDismiss={() => setVisibility(false)} 
            contentContainerStyle={styles.modalStyles}
        >
          <Text style={styles.modalText}>Allow to sync SMS messages</Text>
          <View style={styles.modalButtonsContainer}>
            <CustomButton 
                title="Deny"
                handlePress={() => setVisibility(false)}
                inlineStyles={[ styles.modalButton, { backgroundColor: COLORS.gray1} ]}
            />
            <CustomButton 
                title="Allow"
                handlePress={handleSync}
                inlineStyles={[ styles.modalButton ]}
            />
          </View>
        </Modal>
    )
}

const MessageSyncPage = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isSyncing, setSyncing] = useState(false);
    const [isSyncDone, setSyncDone] = useState(false);

    const handleSync = () => {
        setSyncing(true);
        setModalVisible(false);
        setTimeout(() => {
            setSyncing(false);
            setSyncDone(true);
        }, 2000);
    }

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
                    handleSync={handleSync}
                />
            </Portal>
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Synchronize'}
                        title2={isSyncDone? 'Sync successful!' : 'Sync SMS messages'}
                        progress={'33%'}
                        currentPageNum={4}
                    />

                    <View style={styles.midContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={images.smssync}
                                style={styles.image}
                            />
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={{ marginTop: 20 }}>
                            <CustomButton
                                title={isSyncing? "Syncing..." : "Continue"}
                                handlePress={() => isSyncDone? props.navigation.navigate('TransactionSyncPage') : setModalVisible(true)}
                                inlineStyles={[ styles.syncingButton(isSyncing) ]}
                                disable={isSyncing}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MessageSyncPage;