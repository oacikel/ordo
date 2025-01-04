import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput } from 'react-native'
import useFileStore from '../state/fileStore'
import { NavigationProp } from '@react-navigation/native'
import { FilterType, IFile } from 'src/types'
import { nanoid } from 'nanoid'
import 'react-native-get-random-values'


interface HomeScreenProps {
    navigation: NavigationProp<any>
  }
  
  export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [files, setFiles] = useState<IFile[]>([])
    const [filter, setFilter] = useState<FilterType>('All')
    const [isModalVisible, setModalVisible] = useState(false)
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
  
    const allFiles = useFileStore((state) => state.files)
    const addFile = useFileStore((state) => state.addFile)
  
    useEffect(() => {
      const filteredFiles = allFiles.filter((file) => {
        if (filter === 'All') return true
        return file.status === filter
      })
      setFiles(filteredFiles)
    }, [filter, allFiles])
  
    const handleFilterChange = (newFilter: FilterType) => {
      if (filter !== newFilter) {
        setFilter(newFilter)
      }
    }
  
    const createFile = () => {
      if (!fileName || !fileType) {
        alert('Please enter all required fields')
        return
      }
      addFile({ id: nanoid(), name: fileName, status: 'Open', type: fileType })
      setFileName('')
      setFileType('')
      setModalVisible(false)
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Button title="All" onPress={() => handleFilterChange('All')} />
          <Button title="Open" onPress={() => handleFilterChange('Open')} />
          <Button title="Closed" onPress={() => handleFilterChange('Closed')} />
        </View>
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.fileItem}>
              <Text style={styles.fileName}>{item.name}</Text>
              <Button
                title="Details"
                onPress={() =>
                  navigation.navigate('FileDetails', { fileId: item.id })
                }
              />
            </View>
          )}
        />
        <Button title="Create File" onPress={() => setModalVisible(true)} />
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New File</Text>
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
            <Button title="Create" onPress={createFile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    fileItem: { padding: 16, backgroundColor: '#eee', marginBottom: 8 },
    fileName: { fontSize: 18 },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: { fontSize: 20, marginBottom: 16, color: 'white' },
    input: {
      width: '80%',
      padding: 10,
      marginVertical: 8,
      backgroundColor: 'white',
      borderRadius: 4,
    },
  })