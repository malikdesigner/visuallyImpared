import React from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

const Video = ({route}) => {
    const videoUrl = 'https://www.youtube.com/watch?v=UsPzfquYJdw'; // Replace with your video URL
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
    return (
        <View style={styles.container}>
            <Text style={{fontSize:30,marginTop:20,marginBottom:20}}> Here are links to the videos </Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>https://www.youtube.com/watch?v=UsPzfquYJdw</Text>
            <TouchableOpacity style={[styles.button,{marginTop: 10}]} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'darkslategrey',
        color: 'white',
        marginLeft: 20,
        

    },
    buttonText: {
        color: 'white',
    }
});
export default Video;
