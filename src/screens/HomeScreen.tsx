import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import useFileStore from '../state/fileStore'
import { NavigationProp } from '@react-navigation/native'
import { FilterType, IFile } from 'src/types'


interface HomeScreenProps {
    navigation: NavigationProp<any>
  }
  
export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [files, setFiles] = useState<IFile[]>([])
  const [filter, setFilter] = useState<FilterType>('All')

  const handleFilterChange = (newFilter: FilterType) => {
    if (filter !== newFilter) {
      setFilter(newFilter)
    }
  }

  const allFiles = useFileStore((state) => state.files)

  useEffect(() => {
    const filteredFiles = allFiles.filter((file) => {
      if (filter === 'All') return true
      return file.status === filter
    })
    setFiles(filteredFiles)
  }, [filter, allFiles])

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  fileItem: { padding: 16, backgroundColor: '#eee', marginBottom: 8 },
  fileName: { fontSize: 18 },
})
