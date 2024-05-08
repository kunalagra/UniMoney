import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import styles from './transactionsyncpage.style';
import CustomProgress from '../common/progress/CustomProgress';
import { COLORS, images } from '../../../constants';
import { useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import DocumentPicker from 'react-native-document-picker';

const TransactionSyncPage = (props) => {

    const [isImporting, setImporting] = useState(false);
    const [isImportDone, setImportDone] = useState(false);
    const [fileData, setFileData] = useState('');
    const [fileUri, setFileUri] = useState('');

    const handleSync = () => {
        setImporting(true);
        setTimeout(() => {
            setImporting(false);
            setImportDone(true);
        }, 2000);
    }

    const chooseFile = () => {
        DocumentPicker.pick({
            type: [DocumentPicker.types.csv, DocumentPicker.types.xlsx],
        })
            .then((res) => {
                setFileData(res[0]);
                setFileUri(res[0].uri);
            })
            .catch((err) => {
                if (DocumentPicker.isCancel(err)) {
                    console.log('Canceled from single doc picker');
                } else {
                    console.log('Unknown Error: ' + JSON.stringify(err));
                    throw err;
                }
            });
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
                        progress={0.67}
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
                                    handlePress={() => props.navigation.navigate('PushNotificationPage')}
                                    inlineStyles={[ styles.importingButton(true) ]}
                                />
                            }
                            <CustomButton
                                title={isImporting? "Importing..." : isImportDone? "Continue" : "Select file"}
                                handlePress={() => isImportDone? props.navigation.navigate('PushNotificationPage') : chooseFile()}
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