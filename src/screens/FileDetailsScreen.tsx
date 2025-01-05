import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import useFileStore from 'src/state/fileStore'
import { IFile, TabType } from 'src/types'
import FileFields from 'src/components/FileFields'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamList } from 'src/navigation'
import TabB from 'src/components/TabB'
import TabC from 'src/components/TabC'
import TabA from 'src/components/TabA'
import { mapIFileFieldsToMessage, validateFile } from 'src/utils/UIUtils'

const Tab = createMaterialTopTabNavigator()

type FileDetailsScreenRouteProp = RouteProp<ParamList, 'FileDetails'>;
type FileDetailsScreenNavigationProp = StackNavigationProp<ParamList, 'FileDetails'>;

interface FileDetailsProps {
  route: FileDetailsScreenRouteProp;
  navigation: FileDetailsScreenNavigationProp;
}

export default function  FileDetails({ route, navigation }: FileDetailsProps) {
  const { fileId, isEditMode, initialTab } = route.params
  const files = useFileStore((state) => state.files)
  const addFile = useFileStore((state) => state.addFile)
  const [file, setFile] = useState<IFile | null>(null)
  const [editable, setEditable] = useState<boolean>(isEditMode) // In the original request there is no need to change edit mode, but it can be added later
 
  useEffect(() => {
    if (fileId) {
      const existingFile = files.find((f) => f.id === fileId)
      setFile(existingFile || null)
    } else {
      setFile({
        id: Date.now().toString(),
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
    if (!file) {
      navigation.goBack()
      return
    }

    const missingFieldNames = validateFile(file)
    const missingFields = missingFieldNames.map(mapIFileFieldsToMessage)
    if (missingFields.length === 0) {
      // Update the file's date to the current date
      file.dateInput = new Date()
      addFile(file)
      alert('File saved successfully!')
      navigation.goBack()
    } else {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`)
    }
  }


  const getInitialRouteName = (): string => {
    switch (initialTab) {
      case 'TabB':
        return 'Tab B'
      case 'TabC':
        return 'Tab C'
      default:
        return 'Bilgiler'
    }
  }

  if (!file) {
    return <Text style={styles.loadingText}>Dosya yükleniyor...</Text>
  }

  return (
      <View style={styles.container}>
        <Tab.Navigator initialRouteName={getInitialRouteName()}>
        <Tab.Screen 
          name="Bilgiler" 
          children={() => (
          <TabA 
            file={file} 
            setFile={setFile} 
            editable={editable} 
            handleSave={handleSave} 
          />
          )}
          options={{ lazy: false }}
        />
        <Tab.Screen name="Tab B" component={TabB}/>
        <Tab.Screen name="Tab C" component={TabC}/>
        </Tab.Navigator>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
