import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import useFileStore from 'src/state/fileStore'
import { FileStatusType, IFile } from 'src/types'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamList } from 'src/navigation'
import TabB from 'src/components/TabB'
import TabC from 'src/components/TabC'
import TabA from 'src/components/TabA'
import { mapIFileFieldsToMessage, validateFile } from 'src/utils/UIUtils'
import globalStyles from 'src/styles'
import CustomAppBar from 'src/components/ CustomAppBar'
import useFirebaseAnalytics, { EVENT_NAMES } from 'src/utils/FirebaseUtils'
import { useTranslation } from 'react-i18next'

const Tab = createMaterialTopTabNavigator()

type FileDetailsScreenRouteProp = RouteProp<ParamList, 'FileDetails'>;
type FileDetailsScreenNavigationProp = StackNavigationProp<ParamList, 'FileDetails'>;

interface FileDetailsProps {
  route: FileDetailsScreenRouteProp;
  navigation: FileDetailsScreenNavigationProp;
}

export default function  FileDetails({ route, navigation }: FileDetailsProps) {
  const { t } = useTranslation()
  const { fileId, isEditMode, initialTab } = route.params
  const files = useFileStore((state) => state.files)
  const addFile = useFileStore((state) => state.addFile)
  const [file, setFile] = useState<IFile | null>(null)
  const firebaseAnalytics = useFirebaseAnalytics()
  const [editable, setEditable] = useState<boolean>(isEditMode) // In the original request there is no need to change edit mode, but it can be added later
  const [fileStatus, setFileStatus] = useState<FileStatusType>('Open')
  const updateFile = useFileStore((state) => state.updateFile)
  
  useEffect(() => {
    if (fileId) {
      const existingFile = files.find((f) => f.id === fileId)
      setFile(existingFile || null)
      setFileStatus(existingFile?.status || 'Open')
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
    firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_REQUESTED, { fileId: file?.id })
    if (!file) {
      firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_FAILURE)
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
      firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_SUCCESS, { fileId: file.id })

      navigation.goBack()
    } else {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`)
    }
  }


  const getInitialRouteName = (): string => {
    switch (initialTab) {
      case 'TabB':
        return t('tabBScreenName')
      case 'TabC':
        return t('tabC')
      default:
        return t('informationTab')
    }
  }

  if (!file) {
    return <Text style={globalStyles.loadingText}>Dosya yükleniyor...</Text>
  }

  return (
    
    <View style={{ flex: 1 }}>
    <CustomAppBar
      mandatoryInput={file.mandatoryInput}
      status={file.status}
      dateInput={file.dateInput}
      onToggleStatus={function (): void {
        const currentFile = files.find((file) => file.id === fileId);
        if (currentFile) {
          const newStatus = currentFile.status === 'Open' ? 'Closed' : 'Open';
          updateFile(currentFile.id, { status: newStatus });
          setFileStatus(newStatus);
          setFile({ ...currentFile, status: newStatus });
        }
      }}
    />
    <Tab.Navigator initialRouteName={getInitialRouteName()}>
      <Tab.Screen
        name={t('informationTab')}
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
      <Tab.Screen name={t('tabBScreenName')} component={TabB} />
      <Tab.Screen name={t('tabCScreenName')} component={TabC} />
    </Tab.Navigator>
  </View>
  )
}
