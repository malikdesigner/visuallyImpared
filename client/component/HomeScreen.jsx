// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonComponent from './ButtonComponent';
import * as Speech from 'expo-speech';

const HomeScreen = ({ navigation }) => {
    const buttonData = ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6'];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScreenTap = () => {
        console.log('Screen tapped, Button Index:', currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % buttonData.length);
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await speakButtonName(buttonData[currentIndex]);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % buttonData.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const speakButtonName = (buttonName) => {
        return new Promise((resolve) => {
            Speech.speak(buttonName, {
                language: 'en',
                onDone: () => resolve(),
            });
        });
    };


    return (
        <TouchableWithoutFeedback onPress={handleScreenTap}>
            <View style={styles.container}>
                <View style={styles.buttonRow}>
                    {buttonData.slice(0, 3).map((button, index) => (
                        <ButtonComponent
                            key={index}
                            buttonData={buttonData}
                            currentIndex={index}
                            onPress={() => setCurrentIndex(index)}
                        />
                    ))}
                </View>

                <View style={styles.buttonRow}>
                    {buttonData.slice(3).map((button, index) => (
                        <ButtonComponent
                            key={index + 3}
                            buttonData={buttonData}
                            currentIndex={index + 3}
                            onPress={() => setCurrentIndex(index + 3)}
                        />
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
});

export default HomeScreen;
