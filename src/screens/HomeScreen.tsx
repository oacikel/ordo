import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FilterType, IFile } from '../types' // Ensure this is your IFile interface
import useFileStore from 'src/state/fileStore'

interface HomeScreenProps {
  navigation: NavigationProp<any>
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const files = useFileStore((state) => state.files) // Get all files from Zustand
    const [searchText, setSearchText] = useState<string>('')
    const [filter, setFilter] = useState<FilterType>('All')
    const [filteredFiles, setFilteredFiles] = useState<IFile[]>([])
  
    useEffect(() => {
      handleSearchAndFilter() // Apply search and filter initially and on changes
    }, [searchText, filter, files])
  
    const handleSearchAndFilter = () => {
      let filtered = files
  
      // Apply search filtering
      if (searchText) {
        filtered = filtered.filter((file) =>
          file.mandatoryInput?.toLowerCase().includes(searchText.toLowerCase())
        )
      }
  
      // Apply status filtering
      if (filter !== 'All') {
        filtered = filtered.filter((file) => file.status === filter)
      }
  
      setFilteredFiles(filtered)
    }
  
    const handleFilterChange = (newFilter: FilterType) => {
      if (filter !== newFilter) {
        setFilter(newFilter)
      }
    }
  
    const renderFileItem = ({ item }: { item: IFile }) => (
      <View style={styles.fileCard}>
        <Text style={styles.fileName}>{item.mandatoryInput}</Text>
        <Text style={styles.fileType}>Type: {item.type}</Text>
        <Text style={styles.fileStatus}>
          Status: {item.status === 'Open' ? 'Açık' : 'Kapalı'}
        </Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FileDetails', { fileId: item.id, isEditMode: false })}
        >
          <Text style={styles.actionButtonText}>Dosya detayına git</Text>
        </TouchableOpacity>
      </View>
    )
  
    return (
      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Dosya ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
  
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Button
            title="All"
            onPress={() => handleFilterChange('All')}
            color={filter === 'All' ? '#007AFF' : '#ccc'}
          />
          <Button
            title="Open"
            onPress={() => handleFilterChange('Open')}
            color={filter === 'Open' ? '#007AFF' : '#ccc'}
          />
          <Button
            title="Closed"
            onPress={() => handleFilterChange('Closed')}
            color={filter === 'Closed' ? '#007AFF' : '#ccc'}
          />
        </View>
  
        {/* File List */}
        <FlatList
          data={filteredFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderFileItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Dosya bulunamadı.</Text>}
        />
  
        {/* Create New File Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('FileDetails', { isEditMode: true, fileId: null })}
        >
          <Text style={styles.createButtonText}>Yeni Dosya Oluştur</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    fileCard: {
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      elevation: 2,
    },
    fileName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    fileType: {
      fontSize: 14,
      color: '#555',
    },
    fileStatus: {
      fontSize: 14,
      color: '#007AFF',
    },
    actionButton: {
      marginTop: 8,
      backgroundColor: '#007AFF',
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    actionButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    emptyText: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginTop: 20,
    },
    createButton: {
      marginTop: 20,
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    createButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  })
