import { SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Share, ToastAndroid, PermissionsAndroid } from "react-native";
import { COLORS, icons, images } from "../../../constants";
import { useEffect, useState } from "react";
import styles from "./customimport.style";
import DocumentPicker from 'react-native-document-picker';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

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

    const downloadSampleFile = async () => {

        deleteFile();
        
        const url = "https://ganesh-utla.github.io/Ganesh_Utla_Resume.pdf"; // replace this url with csv url
        const filePath = RNFS.DownloadDirectoryPath + "/unimoney_sample_file.pdf";

        RNFS.downloadFile({
            fromUrl: url,
            toFile: filePath,
            background: true,
            discretionary: true, 
            progress: (res) => {
              const progress = (res.bytesWritten / res.contentLength) * 100;
            //   console.log(`Progress: ${progress.toFixed(2)}%`);
            },
          })
        .promise.then((response) => {
            // console.log('File downloaded!', response);
            ToastAndroid.show('File downloaded successfully at ' + RNFS.DownloadDirectoryPath, ToastAndroid.LONG);
            FileViewer.open(filePath)
                .then(() => {
                    // console.log('Success');
                })
                .catch(err => {
                    // console.log(err.message);
                });
        })
        .catch((err) => {
            // console.log('Download error:', err.message);
        });

    }

    const deleteFile = async () => {
        var path = RNFS.DownloadDirectoryPath + '/unimoney_sample_file.pdf';
        return RNFS.unlink(path)
        .then(() => {
            // console.log('FILE DELETED');
        })
        .catch((err) => {
            // console.log(err.message);
        });
    };


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white2, flex: 1 }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.white2}
            />
            <ScrollView>

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
                                Custom Import
                            </Text>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>

                        <Text style={styles.messageText}>

                            This feature allows you to import transactions from your local file, bank statement or a file exported from other money management apps.{'\n\n'}
                            Steps to import your data:{'\n\n'}
                            1. Download SAMPLE FILE from <Text onPress={downloadSampleFile} style={styles.sampleFileLink}>here</Text>.{'\n'}
                            2. Find your file at device's download directory named 'unimoney_sample_file.csv'. 
                            3. Prepare your input file as per guidelines given inside the SAMPLE FILE.{'\n'}
                            4. Copy the input file to your phone.{'\n'}
                            5. Use Import option and start the Import process.

                        </Text>

                        <View>
                            <TouchableOpacity
                                onPress={downloadSampleFile}
                                style={styles.downloadButton}
                                activeOpacity={0.5}
                            >
                                <Text style={styles.buttonText}>
                                    Download sample file
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fileContainer}>
                            <Text style={styles.fileContainerHeading}>
                                To import data, select a .csv/.xlsx file
                            </Text>
                            <View style={styles.fileContainerDetails}>
                                <TouchableOpacity
                                    style={styles.fileButton}
                                    activeOpacity={0.5}
                                    onPress={() => {chooseFile()}}
                                >
                                    <Text style={styles.fileButtonText}>
                                        Select file
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.fileName(fileData.name)} numberOfLines={1}>
                                    {fileData.name ? fileData.name : 'No file selected'}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.buttonContainer}>
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
            </ScrollView>

        </SafeAreaView>
    )
}

export default CustomImport;