import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import FileFields from './FileFields'

interface TabAProps {
    file: any
    setFile: (file: any) => void
    editable: boolean
    handleSave: () => void
}

const TabA: React.FC<TabAProps> = ({ file, setFile, editable, handleSave }) => (
    <View style={styles.tabContent}>
        <FileFields file={file} setFile={setFile} editable={editable} />
        {editable && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
        )}
    </View>
)

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
      },
      saveButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
      },
      saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
      },
})

export default TabA