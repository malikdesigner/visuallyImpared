import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

import axios from 'axios';
import apiUrl from './apiUrl';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
const BookList = ({ bookData }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            {bookData.map((book, index) => (
                <View key={index} style={{ margin: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontStyle: 'bold' }}>{book.bookName}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(book.audioLink)}>
                            <Text style={{ fontSize: 20 }}>Play Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(book.pdfLink)}>
                            <Text style={{ fontSize: 20 }}>View PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};
const Lecture = ({ route }) => {
    const audioUrl = 'https://ia804503.us.archive.org/21/items/lady_susan_0707_librivox/ladysusan_1_austen_64kb.mp3';
    const pdfUrl = 'https://www.district205.net/cms/lib/IL01001003/Centricity/Domain/118/359523877-marvel-comics-civil-war-3-of-7-pdf.pdf';

    const [bookData, setBookData] = useState([]);
    const { language } = route.params;
    const navigation = useNavigation();
    const speakButtonName = async (buttonName) => {
        console.log(buttonName)
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
        else if (language == 'tamil') {
            await speakButtonName('Tirumpi celkiṟēṉ');
        }
        navigation.navigate('MainScreen');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getBookData`);

                if (response.data.ok) {
                    setBookData(response.data.bookData);
                } else {
                    console.error('Error fetching travel data:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching travel data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <View>
            <Text style={{ fontSize: 30, marginTop: 20 }} > Listing Books </Text>
            <BookList bookData={bookData} />
            <TouchableOpacity style={styles.button} onPress={handleBack}>
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
export default Lecture;
