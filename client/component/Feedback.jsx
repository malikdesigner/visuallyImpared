import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking, ToastAndroid, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import PDFViewer from './PdfViewer';
import axios from 'axios';
import apiUrl from './apiUrl';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
const Feedback = ({ route }) => {
    const { language } = route.params;
    const navigation = useNavigation();
    const speakButtonName = async (buttonName) => {
        return new Promise((resolve) => {
            Speech.speak(buttonName, {
                language: 'en',
                onDone: () => resolve(),
            });
        });
    };
    const handleBack = async () => {
        console.log(language)
        if (language == 'hindi') {
            await speakButtonName('Pichli screen par jaa rahay');

        }
        else if (language == 'english') {
            await speakButtonName('Going back');
        }
        else if (language == 'espanol') {
            await speakButtonName('Volver');
        }
        navigation.navigate('MainScreen');
    };
    const handleSubmit = async () => {
        console.log(language)
        if (language == 'hindi') {
            await speakButtonName('taasuraat kaamyaabi saay chaalay gaye');

        }
        else if (language == 'english') {
            await speakButtonName('Feedback send successfully');
        }
        else if (language == 'espanol') {
            await speakButtonName('Comentarios enviados correctamente');
        }
        ToastAndroid.show('Feedback send successfully', ToastAndroid.SHORT);
        navigation.navigate('MainScreen');
    };
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>Give us your feedback</Text>
            </View>
            <View>
                <TextInput
                    multiline
                    numberOfLines={10}
                    placeholder="Write your feedback here..."
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 8,
                        padding: 10,
                        margin: 10,
                    }}
                />
            </View>
            <TouchableOpacity style={[styles.button,{marginTop: 100}]} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{marginTop: 10}]} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'darkslategrey',
        color: 'white',
        marginLeft: 30,
        

    },
    buttonText: {
        color: 'white',
    }
})


export default Feedback;
