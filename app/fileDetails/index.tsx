import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useFileStore from 'app/state/fileStore';
import { FileStatusType, IFile } from 'app/types';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { mapIFileFieldsToMessage, validateFile } from 'app/utils/UIUtils';
import globalStyles from 'app/styles';
import useFirebaseAnalytics, { EVENT_NAMES } from 'app/utils/FirebaseUtils';
import { useTranslation } from 'react-i18next';
import CustomAppBar from 'app/components/ CustomAppBar';
import TabB from './tabB';
import TabC from './tabC';
import TabA from './tabA';

const Tab = createMaterialTopTabNavigator();

export default function FileDetails() {
  const { t } = useTranslation();
  const { fileId, initialTab, isEditMode } = useLocalSearchParams(); // Extract fileId and initialTab from query params
  const navigation = useNavigation();
  
  const files = useFileStore((state) => state.files);
  const addFile = useFileStore((state) => state.addFile);

  const [file, setFile] = useState<IFile | null>(null);
  const firebaseAnalytics = useFirebaseAnalytics();
  const [fileStatus, setFileStatus] = useState<FileStatusType>('Open');
  const updateFile = useFileStore((state) => state.updateFile);

  useEffect(() => {
    console.log({ fileId,initialTab, });
    if (fileId) {
      const existingFile = files.find((f) => f.id === fileId);
      setFile(existingFile || null);
      setFileStatus(existingFile?.status || 'Open');
    } else {
      const newFile: IFile = {
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
      };
      console.log({ newFile }); // Debugging line
      setFile(newFile);
    }
  }, [fileId]);

  const handleSave = () => {
    firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_REQUESTED, { fileId: file?.id });
    if (!file) {
      firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_FAILURE);
      navigation.goBack();
      return;
    }

    const missingFieldNames = validateFile(file);
    const missingFields = missingFieldNames.map(mapIFileFieldsToMessage);
    if (missingFields.length === 0) {
      file.dateInput = new Date();
      file.status = fileStatus;
      addFile(file);
      alert('Dosya başarıyla oluşturuldu');
      firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CREATION_SUCCESS, { fileId: file.id });
      navigation.goBack();
    } else {
      alert(`Lütfen tüm zorunlu alanları doldurunuz: ${missingFields.join(', ')}`);
    }
  };

  const getInitialRouteName = (): string => {
    switch (initialTab) {
      case 'tabB':
        return t('tabBScreenName');
      case 'tabC':
        return t('tabCScreenName');
      default:
        return t('informationTab');
    }
  };

  if (!file) {
    return <Text style={globalStyles.loadingText}>Dosya yükleniyor...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        mandatoryInput={file.mandatoryInput}
        status={file.status}
        dateInput={file.dateInput}
        onToggleStatus={function (): void {
          const currentFile = files.find((file) => file.id === fileId);
          setFileStatus(fileStatus === 'Open' ? 'Closed' : 'Open');
          if (currentFile) {
            const newStatus = currentFile.status === 'Open' ? 'Closed' : 'Open';
            updateFile(currentFile.id, { status: newStatus });
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
              editable={!!isEditMode}
              handleSave={handleSave}
            />
          )}
          options={{ lazy: false }}
        />
        <Tab.Screen name={t('tabBScreenName')} component={TabB} />
        <Tab.Screen name={t('tabCScreenName')} component={TabC} />
      </Tab.Navigator>
    </View>
  );
}
