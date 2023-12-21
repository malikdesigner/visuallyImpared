import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as Speech from 'expo-speech';

const ButtonComponent = ({ buttonData, currentIndex, onPress }) => {
  const speakButtonName = () => {
    const currentButton = buttonData[currentIndex];
    Speech.speak(currentButton, { language: 'en' });
  };

  return (
    <TouchableOpacity style={{margin: 20,backgroundColor:'lightblue',padding:10 }} onPress={() => onPress()}>
      <Text style={{ fontSize: 20, margin: 10 }}>{buttonData[currentIndex]}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;