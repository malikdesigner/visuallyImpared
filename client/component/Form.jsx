import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import apiUrl from './apiUrl';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Form = () => {

    const Stack = createStackNavigator();
    const navigation = useNavigation();
    const [bookName, setBookName] = useState('');
    const [audio, setAudio] = useState('');
    const [bookFile, setBookFile] = useState('');
    const [video, setVideo] = useState('')
    // const localDirectory = '../assets/files/';
    const CustomToast = ({ message, backgroundColor }) => (
        <View style={{ backgroundColor, padding: 10, borderRadius: 5 }}>
            <Text>{message}</Text>
        </View>
    );
    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            ToastAndroid.CENTER,
            ToastAndroid.WHITE
        );
    };



    const handleSubmit = async () => {
        const formData = {
            bookName,
            audio,
            bookFile,
        };

        try {

            const databaseFormData = {
                bookName,
                audio,
                bookFile,
            };

            try {
                const response = await fetch(`${apiUrl}/addData`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.ok) {
                    ToastAndroid.show('Record saved successfully', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(result.message || 'Error saving record', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.error('Error:', error);
                ToastAndroid.show('Network error', ToastAndroid.SHORT);
            }
            // Existing code...

        } catch (error) {
            console.error('Error:', error);
            ToastAndroid.show('Network error', ToastAndroid.SHORT);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.form} >
                <Text style={[styles.stepsHeading, { alignSelf: 'center' }]}> Add Book </Text>
                <Text style={{ marginTop: 30, marginBottom: 10 }}>Book Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Book Name"
                    value={bookName}
                    onChangeText={(text) => setBookName(text)}
                />
                {/* <Button title="Pick Audio File" onPress={() => handleFilePick('audio/*')} /> */}
                <Text>Selected Audio File: {audio}</Text>
                <TextInput
                    style={styles.input}

                    placeholder="Pick Audio File"
                    value={audio}
                    onChangeText={(text) => setAudio(text)}
                />
                {/* <Button title="Pick Book File" onPress={() => handleFilePick('application/pdf,application/msword')} /> */}
                <Text>Selected Book File: {bookFile}</Text>
                <TextInput
                    style={styles.input}

                    placeholder="Pick Book File"
                    value={bookFile}
                    onChangeText={(text) => setBookFile(text)}
                />
                <Text>Video Lecture: {bookFile}</Text>
                <TextInput
                    style={styles.input}

                    placeholder="Lecture Video"
                    value={video}
                    onChangeText={(text) => setVideo(text)}
                />
                <TouchableOpacity style={styles.roundButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                    <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',

    },
    form: {
        paddingTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        height: '100%',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,

        marginBottom: '5%',
        color: 'gray',

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        color: 'gray'
    },
    roundButton: {
        width: 100,
        height: 50,
        backgroundColor: 'black', // You can change the color
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row'
    },
    backButton: {
        width: 100,
        height: 50,
        backgroundColor: 'black', // You can change the color
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    datetimePickerButton: {
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'blue', // You can change the color
        padding: 2,
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'center',
    },
    selectedDateText: {
        marginVertical: 10,
    },


    startingScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#077eed',
        marginTop: 100
    },
    appName: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        padding: 50
    },
    logo: {
        width: 100,
        height: 100,
        padding: 50,

    },
    tagline: {
        fontSize: 40,
        padding: 50,
        color: '#e3eafa',


    },
    getStartedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 15,
        paddingRight: 100,
        paddingLeft: 100,

        borderRadius: 10,
        marginBottom: 10
    },
    buttonTextLarge: {
        color: 'white',
        fontSize: 18,
        marginRight: 10,
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    stepsHeading: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    },
    dropdown: {
        minWidth: 100, // Adjust the minimum width as needed
        marginBottom: 10,
    },
    countryLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Form;