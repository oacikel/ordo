import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TabC: React.FC = () => (
    <View style={styles.tabContent}>
        <Text>Tab C Content (Placeholder)</Text>
    </View>
);

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabC;