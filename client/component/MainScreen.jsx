import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Speech from 'expo-speech';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherLogin from './TeacherLogin';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainScreen = ({ route }) => {
    const navigation = useNavigation();
    console.log(route.params)
    const [language, setLanguage] = useState('english');
    const [isModalVisible, setModalVisible] = useState(false);
    const { backColor, btnBackColor, btnTextColor } = route.params || {
        backColor: 'white',
        btnBackColor: 'darkslategrey',
        btnTextColor: 'white',
    };
    const styles = {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backColor
        },
        logoContainer: {
            marginTop: 20,
        },
        logo: {
            width: 100,
            height: 100,
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 5,
        },
        button: {
            backgroundColor: btnBackColor,
            padding: 20,
            margin: 5,
            flex: 1,
            borderRadius: 10,
        },
        buttonText: {
            fontSize: 16,
            color: btnTextColor,
            textAlign: 'center',
        },
        modalContainer: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        dropdown: {
            backgroundColor: 'lightgrey',
            padding: 10,
            borderRadius: 5,
        },
        dropdownText: {
            fontSize: 16,
            color: 'black',
        },
        dropdownOptions: {
            width: 300, // Set your desired width here
        },
        textInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 10,
            marginBottom: 10,
        },
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const speakButtonName = async (buttonName) => {
        return new Promise((resolve) => {
            Speech.speak(buttonName, {
                language: 'en',
                onDone: () => resolve(),
            });
        });
    };

    const lectureVideo = async () => {
        console.log('Lecture Video');
        if (language == 'hindi') {
            await speakButtonName('Lecture Videos');
        }
        else if (language == 'english') {
            await speakButtonName('Lecture Videos');
        }
        else if (language == 'tamil') {
            await speakButtonName('Virivurai vīṭiyōkkaḷ');
        }
        await navigation.navigate('Video', { language });
        // await speakButtonName('Lecture Videos');
    };

    const lectureBook = async () => {
        console.log('Listing Books');
        if (language == 'hindi') {
            await speakButtonName('Kitaabo kee list');
        }
        else if (language == 'english') {
            await speakButtonName('Listing Books');
        }
        else if (language == 'tamil') {
            await speakButtonName('Paṭṭiyal puttakaṅkaḷ');
        }
        try {
            await navigation.navigate('Lecture', { language });
        }
        catch (e) {
            console.log(e)
        }
        // await speakButtonName('Listing Books');
    };

    const contactTeacher = async () => {
        console.log('Teacher Will Contact you');
        if (language == 'hindi') {
            await speakButtonName('Teacher aap say mulaqat karay ge');
        }
        else if (language == 'english') {
            await speakButtonName('Teacher Will Contact you');
        }
        else if (language == 'tamil') {
            await speakButtonName('Āciriyar uṅkaḷait toṭarpukoḷvār');
        }
        // await speakButtonName('Teacher Will Contact you');
    };

    const sendFeedback = async () => {
        console.log('Going to feedback view');
        if (language === 'hindi') {
            await speakButtonName('Feedback form par jaa rahay');
        } else if (language === 'english') {
            await speakButtonName('Going to feedback view');
        } else if (language === 'tamil') {
            await speakButtonName('Piṉṉūṭṭa pārvaikku celkiṟēṉ');
        }
        await navigation.navigate('Feedback', { language });
    };


    const changeLanguage = async (language) => {
        if (language == 'hindi') {
            await speakButtonName('Zaban tabdeel ho gaye');
        }
        else if (language == 'english') {
            await speakButtonName('Language changed to English');
        }
        else if (language == 'tamil') {
            await speakButtonName('Moḻi āṅkilattiṟku māṟiyatu');
        }
        setLanguage(language);
        toggleModal();
    };
    const changeColor = async (language) => {
        console.log(language);
        if (language == 'hindi') {
            await speakButtonName('apanee aavashyakata ke anusaar rang badalen');
        }
        else if (language == 'english') {
            await speakButtonName('Change Color according to your need');
        }
        else if (language == 'tamil') {
            await speakButtonName('Uṅkaḷ tēvaikkēṟpa niṟattai māṟṟavums');
        }
        // toggleModalColor();
        await navigation.navigate('ColorPickerScreen', { language });

    };

    return (

        <Tab.Navigator initialRouteName="MainScreen">
            <Tab.Screen
                name="MainScreen"
                component={() => <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/blind_1806311.png')} style={styles.logo} />
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={lectureVideo}>
                            <Text style={styles.buttonText}>Lecture Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={lectureBook}>
                            <Text style={styles.buttonText}>Books</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={contactTeacher}>
                            <Text style={styles.buttonText}>Contact Teacher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={sendFeedback}>
                            <Text style={styles.buttonText}>Feedback</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={toggleModal}>
                            <Text style={styles.buttonText}>Change Language</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => changeColor(language)}>
                            <Text style={styles.buttonText}>Change Color</Text>
                        </TouchableOpacity>
                        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Select Language</Text>
                                <ModalDropdown
                                    style={styles.dropdown}
                                    options={['English', 'Tamil', 'Hindi']}
                                    dropdownStyle={styles.dropdownOptions} // Set custom width here
                                    onSelect={(index, value) => changeLanguage(value.toLowerCase())}
                                >
                                    <Text style={styles.dropdownText}>{language}</Text>
                                </ModalDropdown>
                            </View>
                        </Modal>


                    </View>
                </View>

                }
                options={{
                    headerShown: false,
                    tabBarLabel: 'Student',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chalkboard-teacher" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TeacherLogin"
                component={(props) => <TeacherLogin {...props} />}
                options={{
                    headerShown: false,
                    tabBarLabel: 'TeacherLogin',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="graduation-cap" color={color} size={size} />

                    ),
                }}
            />
        </Tab.Navigator>
    );
};



export default MainScreen;
