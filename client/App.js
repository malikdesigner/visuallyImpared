import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import DetailScreen from './component/DetailScreen';
import MainScreen from './component/MainScreen';
import TeacherLogin from './component/TeacherLogin';
import UserProfile from './component/UserProfile';
import Form from './component/Form';
import Lecture from './component/Lecture';
import Feedback from './component/Feedback';
import Video from './component/Video';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
      <Stack.Screen name="UserProfile" component={UserProfile } />
      <Stack.Screen name="Form" component={Form } />
      <Stack.Screen name="Lecture" component={Lecture} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Video" component={Video} />

      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20, // Adjust the font size as needed
    margin: 10,
  },
});

export default App;