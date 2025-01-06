import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import FileFields from './FileFields'
import globalStyles from 'src/styles'

interface TabAProps {
    file: any
    setFile: (file: any) => void
    editable: boolean
    handleSave: () => void
}

const TabA: React.FC<TabAProps> = ({ file, setFile, editable, handleSave }) => (
    <View style={globalStyles.tabContent}>
        <FileFields file={file} setFile={setFile} editable={editable} />
        {editable && (
            <TouchableOpacity style={globalStyles.saveButton} onPress={handleSave}>
                <Text style={globalStyles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
        )}
    </View>
)

export default TabA