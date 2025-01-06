import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import globalStyles from 'src/styles'
import { IFile } from 'src/types'

interface FileFieldsProps {
  file: IFile
  setFile: (updatedFile: IFile) => void
  editable: boolean
}

const FileFields: React.FC<FileFieldsProps> = ({ file, setFile, editable }) => {
  return (
    <View>
      <Text style={globalStyles.label}>Mandatory Input</Text>
      <TextInput
        style={globalStyles.input}
        value={file.mandatoryInput}
        onChangeText={(text) => setFile({ ...file, mandatoryInput: text })}
        editable={editable}
      />
      <Text style={globalStyles.label}>Text Input 1</Text>
      <TextInput
        style={globalStyles.input}
        value={file.textInput1 || ''}
        onChangeText={(text) => setFile({ ...file, textInput1: text })}
        editable={editable}
      />
      <Text style={globalStyles.label}>Numeric Input 1</Text>
      <TextInput
        style={globalStyles.input}
        value={file.numericInput1?.toString() || ''}
        onChangeText={(text) =>
          setFile({ ...file, numericInput1: parseFloat(text) || undefined })
        }
        editable={editable}
        keyboardType="numeric"
      />
      <Text style={globalStyles.label}>Text Input 2</Text>
      <TextInput
        style={globalStyles.input}
        value={file.textInput2 || ''}
        onChangeText={(text) => setFile({ ...file, textInput2: text })}
        editable={editable}
      />
      <Text style={globalStyles.label}>Text Input 3</Text>
      <TextInput
        style={globalStyles.input}
        value={file.textInput3 || ''}
        onChangeText={(text) => setFile({ ...file, textInput3: text })}
        editable={editable}
      />
      <Text style={globalStyles.label}>Numeric Input 2</Text>
      <TextInput
        style={globalStyles.input}
        value={file.numericInput2?.toString() || ''}
        onChangeText={(text) =>
          setFile({ ...file, numericInput2: parseFloat(text) || undefined })
        }
        editable={editable}
        keyboardType="numeric"
      />
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
    </View>
  )
}

export default FileFields