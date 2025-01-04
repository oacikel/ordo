import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import useFileStore from 'src/state/fileStore'
import { IFile } from 'src/types'
import { FlatList } from 'react-native'


type ParamList = {
    FileDetails: {
        fileId: string | null
        isEditMode: boolean
    }
}
interface FileDetailsProps {
  route: RouteProp<ParamList, 'FileDetails'>
  navigation: NavigationProp<ParamList, 'FileDetails'>
}

const FileDetails: React.FC<FileDetailsProps> = ({ route, navigation }) => {
  const { fileId, isEditMode } = route.params
  const files = useFileStore((state) => state.files)
  const addFile = useFileStore((state) => state.addFile)
  const [file, setFile] = useState<IFile | null>(null)
  const [editable, setEditable] = useState<boolean>(isEditMode)

  useEffect(() => {
    if (fileId) {
      const existingFile = files.find((f) => f.id === fileId)
      setFile(existingFile || null)
    } else {
      // Initialize a new file when creating
      setFile({
        id: Date.now().toString(), // Temporary ID
        mandatoryInput: '',
        status: 'Open',
        type: 'X',
        numericInput1: undefined,
        textInput1: '',
        textInput2: '',
        textInput3: '',
        numericInput2: undefined,
        dateInput: undefined,
      })
    }
  }, [fileId])

  const handleSave = () => {
    if (file) {
      addFile(file) // Add or update file in Zustand
      navigation.goBack()
    }
  }

  if (!file) {
    return <Text style={styles.loadingText}>Dosya yükleniyor...</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dosya Bilgileri</Text>
        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <Text style={styles.editToggle}>{editable ? 'Kapat' : 'Düzenle'}</Text>
        </TouchableOpacity>
      </View>

      {/* Mandatory Input */}
      <Text style={styles.label}>Mandatory Input</Text>
      <TextInput
        style={styles.input}
        value={file.mandatoryInput}
        onChangeText={(text) => setFile({ ...file, mandatoryInput: text })}
        editable={editable}
      />

      {/* Text Input 1 */}
      <Text style={styles.label}>Text Input 1</Text>
      <TextInput
        style={styles.input}
        value={file.textInput1 || ''}
        onChangeText={(text) => setFile({ ...file, textInput1: text })}
        editable={editable}
      />

      {/* Numeric Input 1 */}
      <Text style={styles.label}>Numeric Input 1</Text>
      <TextInput
        style={styles.input}
        value={file.numericInput1?.toString() || ''}
        onChangeText={(text) =>
          setFile({ ...file, numericInput1: parseFloat(text) || undefined })
        }
        editable={editable}
        keyboardType="numeric"
      />
      
      {/* Text Input 2 */}
        <Text style={styles.label}>Text Input 2</Text>
        <TextInput
          style={styles.input}
          value={file.textInput2 || ''}
          onChangeText={(text) => setFile({ ...file, textInput2: text })}
          editable={editable}
        />

        {/* Text Input 3 */}
        <Text style={styles.label}>Text Input 3</Text>
        <TextInput
          style={styles.input}
          value={file.textInput3 || ''}
          onChangeText={(text) => setFile({ ...file, textInput3: text })}
          editable={editable}
        />
        
        {/* Numeric Input 2 */}
        <Text style={styles.label}>Numeric Input 2</Text>
        <TextInput
          style={styles.input}
          value={file.numericInput2?.toString() || ''}
          onChangeText={(text) =>
            setFile({ ...file, numericInput2: parseFloat(text) || undefined })
          }
          editable={editable}
          keyboardType="numeric"
        />

        {/* Type Selection Buttons */}
        <FlatList
          data={['X', 'Y']}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: file.type === item ? '#007AFF' : '#ccc',
                padding: 10,
                borderRadius: 8,
                marginRight: 8,
              }}
              onPress={() => setFile({ ...file, type: item as 'X' | 'Y' })}
              disabled={!editable}
            >
              <Text style={{ color: '#fff' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />

      {/* Save Button */}
      {editable && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default FileDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editToggle: {
    fontSize: 14,
    color: '#007AFF',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
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
