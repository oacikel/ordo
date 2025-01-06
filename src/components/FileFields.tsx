import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper'
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
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={'Mandatory Input'}
      value={file.mandatoryInput}
      onChangeText={(text) => setFile({ ...file, mandatoryInput: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      label={'Text Input 1'}
      mode='outlined'
      value={file.textInput1 || ''}
      onChangeText={(text) => setFile({ ...file, textInput1: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={'Numeric Input 1'}
      value={file.numericInput1?.toString() || ''}
      onChangeText={(text) =>
        setFile({ ...file, numericInput1: parseFloat(text) || undefined })
      }
      editable={editable}
      keyboardType="numeric"
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={'Text Input 2'}
      value={file.textInput2 || ''}
      onChangeText={(text) => setFile({ ...file, textInput2: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={'Text Input 3'}
      value={file.textInput3 || ''}
      onChangeText={(text) => setFile({ ...file, textInput3: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={'Numeric Input 2'}
      value={file.numericInput2?.toString() || ''}
      onChangeText={(text) =>
        setFile({ ...file, numericInput2: parseFloat(text) || undefined })
      }
      editable={editable}
      keyboardType="numeric"
      />
      <Text style={globalStyles.subTitle}>Dosya Türü</Text>
      <View style={globalStyles.filterContainer}>
      <TouchableOpacity
        style={file.type === 'X' ? globalStyles.fileTypeButtonActive : globalStyles.fileTypeButton}
        onPress={() => setFile({ ...file, type: 'X' })}
        disabled={!editable}
      >
        <Text style={{ color: '#fff' }}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={file.type === 'Y' ? globalStyles.fileTypeButtonActive : globalStyles.fileTypeButton}
        onPress={() => setFile({ ...file, type: 'Y' })}
        disabled={!editable}
      >
        <Text style={{ color: '#fff' }}>Y</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default FileFields