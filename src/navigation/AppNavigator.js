
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SubjectFilesScreen from '../screens/SubjectFilesScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import SharedSubjectsScreen from '../screens/SharedSubjectsScreen';
import SharedFilesScreen from '../screens/SharedFilesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="SubjectFiles" component={SubjectFilesScreen} />
        <Stack.Screen name="Subjects" component={SubjectsScreen} />

<Stack.Screen
  name="SharedSubjects"
  component={SharedSubjectsScreen}
/>

<Stack.Screen
  name="SharedSubjectFiles"
  component={SharedFilesScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
