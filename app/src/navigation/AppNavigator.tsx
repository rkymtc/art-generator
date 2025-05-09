import React from 'react';
import { NavigationContainer, NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScreen from '../screens/InputScreen';
import OutputScreen from '../screens/OutputScreen';
import { ROUTES } from '../utils/constants';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  onReady?: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ onReady }) => {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121212' }
        }}
      >
        <Stack.Screen name="Home" component={InputScreen} />
        <Stack.Screen name="LogoDetails" component={OutputScreen} />
        <Stack.Screen name="Settings" component={InputScreen} /* Placeholder */ />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 