import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import useFileStore from '../state/fileStore'
import { FileStatusType, IFile } from '../types'

export default function FileDetailsScreen() {
  type RouteParams = {
    params: {
      fileId: string
    }
  }

  const route = useRoute<RouteProp<RouteParams, 'params'>>()
  const { fileId } = route.params
  const [file, setFile] = useState<IFile | undefined>(undefined)
  const updateFile = useFileStore((state) => state.updateFile)
  const allFiles = useFileStore((state) => state.files)

  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileStatus, setFileStatus] = useState<FileStatusType>()
  const [error, setError] = useState('')

  useEffect(() => {
    const foundFile = allFiles.find((f) => f.id === fileId)
    if (foundFile){
        setFile(foundFile)
        setFileName(foundFile.mandatoryInput);
        setFileType(foundFile.type);
        setFileStatus(foundFile.status)
    } else {
        setError('File not found')
    }

  }, [fileId, allFiles])

  const handleUpdateFile = () => {
    if (file && fileName && fileType && fileStatus) {
      updateFile(fileId, { ...file, mandatoryInput: fileName, type: fileType, status: fileStatus })
      alert('File updated successfully');
    }
  }

  if (!file) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>File not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit File</Text>
      <TextInput
        placeholder="File Name"
        value={fileName}
        onChangeText={setFileName}
        style={styles.input}
      />
      <TextInput
        placeholder="File Type"
        value={fileType}
        onChangeText={setFileType}
        style={styles.input}
      />
      <TextInput
        placeholder="File Status"
        value={fileStatus}
        onChangeText={(text) => setFileStatus(text as FileStatusType)}
        style={styles.input}
      />
      <Button title="Update File" onPress={handleUpdateFile} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    input: {
      width: '100%',
      padding: 10,
      marginVertical: 8,
      backgroundColor: 'white',
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    message: { fontSize: 18, color: 'red' },
  })