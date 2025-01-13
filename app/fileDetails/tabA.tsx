import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import globalStyles from 'app/styles'
import { Card } from 'react-native-paper'
import FileFields from 'app/components/FileFields'

interface TabAProps {
    file: any
    setFile: (file: any) => void
    editable: boolean
    handleSave: () => void
}

const TabA: React.FC<TabAProps> = ({ file, setFile, editable, handleSave }) => (
    <Card style={globalStyles.tabContent}>
        <FileFields file={file} setFile={setFile} editable={editable} />
        {editable && (
            <TouchableOpacity style={globalStyles.saveButton} onPress={handleSave}>
                <Text style={globalStyles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
        )}
    </Card>
)

export default TabA