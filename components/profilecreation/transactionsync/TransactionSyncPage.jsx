import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import styles from './transactionsyncpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';

const TransactionSyncPage = (props) => {

    const [isImporting, setImporting] = useState(false);
    const [isImportDone, setImportDone] = useState(false);

    const handleSync = () => {
        setImporting(true);
        setTimeout(() => {
            setImporting(false);
            setImportDone(true);
        }, 2000);
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white2}}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomProgress
                        title1={'Synchronize'}
                        title2={isImportDone? 'Import successful!' : 'Import Transactions Data'}
                        progress={'67%'}
                        currentPageNum={4}
                    />

                    <View style={styles.midContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={images.datasync}
                                style={styles.image}
                            />
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonsContainer}>
                            { !isImportDone && !isImporting &&
                                <CustomButton
                                    title={"Skip"}
                                    handlePress={() => {}}
                                    inlineStyles={[ styles.importingButton(true) ]}
                                />
                            }
                            <CustomButton
                                title={isImporting? "Importing..." : "Continue"}
                                handlePress={() => isImportDone? props.navigation.navigate('PushNotificationPage') : handleSync()}
                                inlineStyles={[ styles.importingButton(isImporting) ]}
                                disable={isImporting}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TransactionSyncPage;