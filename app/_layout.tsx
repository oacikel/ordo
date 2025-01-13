import React from 'react';
import { Slot, Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

export default function Layout() {
return (
    <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
);
}
