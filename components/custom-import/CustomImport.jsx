import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { COLORS, icons } from "../../constants";
import { useState } from "react";
import styles from "./customimport.style";
import DocumentPicker from 'react-native-document-picker';



const CustomImport = (props) => {

    const { ArrowleftIcon } = icons;

    const [fileData, setFileData] = useState('');
    const [fileUri, setFileUri] = useState('');

    const chooseFile = () => {
        DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
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
        <SafeAreaView style={{ backgroundColor: COLORS.white2, flex: 1 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <ArrowleftIcon
                            style={styles.arrowleftIcon}
                            fill={COLORS.gray3}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.navHeading}>
                            Add Category
                        </Text>
                    </View>
                </View>

                <View style={styles.mainContainer}>

                    <Text style={styles.messageText}>

                        This feature allows you to import transactions from your local file, bank statement or a file exported from other money management apps.{'\n'}{'\n'}
                        Steps to import your data:{'\n'}
                        1. Download SAMPLE FILE from here.{'\n'}
                        2. Prepare your input file as per guidelines given inside the SAMPLE FILE.{'\n'}
                        3. Copy the input file to your phone.{'\n'}
                        4. Use Import option and start the Import process.

                    </Text>

                    <View style={styles.fileContainer}>
                        <Text style={styles.fileContainerHeading}>
                            To import data, select a .csv/.xlsx file
                        </Text>
                        <View style={styles.fileContainerDetails}>
                            <TouchableOpacity
                                style={styles.fileButton}
                                activeOpacity={0.85}
                                onPress={() => {chooseFile()}}
                            >
                                <Text style={styles.fileButtonText}>
                                    Select file
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.fileText}>
                                {fileData.name ? fileData.name : 'No file selected'}
                            </Text>
                        </View>
                    </View>

                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.importButton}
                        activeOpacity={0.85}
                        onPress={() => { }}
                    >
                        <Text style={styles.buttonText}>
                            Import selected file
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default CustomImport;