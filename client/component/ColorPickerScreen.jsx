import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

const ColorPickerScreen = ({ route }) => {
    const { language } = route.params;
    const navigation = useNavigation();
    const [backColor, setBackColor] = useState('white');
    const [btnBackColor, setBtnBackColor] = useState('darkslategrey');
    const [btnTextColor, setBtnTextColor] = useState('white');
    const speakButtonName = async (buttonName) => {
        return new Promise((resolve) => {
            Speech.speak(buttonName, {
                language: 'en',
                onDone: () => resolve(),
            });
        });
    };
    const setAllColors = async (language) => {
        console.log(language)
        if (language == 'hindi') {
            await speakButtonName('rang badal gae hain');
        }
        else if (language == 'english') {
            await speakButtonName('Colors have changed');
        }
        else if (language == 'tamil') {
            await speakButtonName('Niṟaṅkaḷ māṟiviṭṭaṉa');
        }
        setBackColor(backColor);
        setBtnBackColor(btnBackColor);
        setBtnTextColor(btnTextColor);
        console.log('Selected Background Color:', backColor);
        console.log('Selected Button Background Color:', btnBackColor);
        console.log('Selected Button Text Color:', btnTextColor);
        navigation.navigate('MainScreen', { backColor, btnBackColor, btnTextColor });
    };
    const handleBack = async () => {
        console.log(language)
        if (language == 'hindi') {
            await speakButtonName('Pichli screen par jaa rahay');

        }
        else if (language == 'english') {
            await speakButtonName('Going back');
        }
        else if (language == 'tamil') {
            await speakButtonName('Tirumpi celkiṟēṉ');
        }
        navigation.navigate('MainScreen');
    };
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Colors</Text>

            {/* Remove the Text component and add three TextInput components */}
            <View style={styles.textInputsContainer}>
                <Text style={styles.modalTitle}>Background Color</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={backColor}
                    value={backColor}
                    onChangeText={(text) => setBackColor(text)}
                />
                <Text style={styles.modalTitle}>Button Background Color</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder={btnBackColor}
                    value={btnBackColor}
                    onChangeText={(text) => setBtnBackColor(text)}

                />
                <Text style={styles.modalTitle}>Button Text Color</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder={btnTextColor}
                    value={btnTextColor}
                    onChangeText={(text) => setBtnTextColor(text)}

                />
                <TouchableOpacity style={styles.button} onPress={() => setAllColors(language)}>
                    <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', }}>Set Color</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleBack}>
                    <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', }}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF', // Set your desired background color
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInputsContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // For shadow on Android
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'darkslategrey',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default ColorPickerScreen;