import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TabB: React.FC = () => (
    <View style={styles.tabContent}>
        <Text>Tab B Content (Placeholder)</Text>
    </View>
);

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabB;