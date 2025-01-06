import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  return (
    <View>
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={t('labelMandatoryInput')}
      value={file.mandatoryInput}
      onChangeText={(text) => setFile({ ...file, mandatoryInput: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      label={t('labelTextInput1')}
      mode='outlined'
      value={file.textInput1 || ''}
      onChangeText={(text) => setFile({ ...file, textInput1: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={t('labelNumericInput1')}
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
      label={t('labelTextInput2')}
      value={file.textInput2 || ''}
      onChangeText={(text) => setFile({ ...file, textInput2: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={t('labelTextInput3')}
      value={file.textInput3 || ''}
      onChangeText={(text) => setFile({ ...file, textInput3: text })}
      editable={editable}
      />
      <TextInput
      style={globalStyles.input}
      mode='outlined'
      label={t('labelNumericInput2')}
      value={file.numericInput2?.toString() || ''}
      onChangeText={(text) =>
        setFile({ ...file, numericInput2: parseFloat(text) || undefined })
      }
      editable={editable}
      keyboardType="numeric"
      />
      <Text style={globalStyles.subTitle}>{t('fileType')}</Text>
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