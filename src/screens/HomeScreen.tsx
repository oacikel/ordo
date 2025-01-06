import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FilterType, IFile, TabType } from 'src/types'
import useFileStore from 'src/state/fileStore'
import FileItem from 'src/components/FileItem'
import { FAB } from "react-native-paper"
import globalStyles from 'src/styles'

interface HomeScreenProps {
  navigation: NavigationProp<any>
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const files = useFileStore((state) => state.files)
    const updateFile = useFileStore((state) => state.updateFile)
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

    const handleNavigateToDetails = (fileId: string) => {
      navigation.navigate('FileDetails', { fileId })
    }
    
    const handleNavigateToTab = (fileId: string, tab: TabType) => {
      navigation.navigate('FileDetails', { fileId, initialTab: tab })
    }
    
    const handleToggleStatus = (fileId: string) => {
      switch (files.find((file) => file.id === fileId)?.status) {
        case 'Open':
          updateFile(fileId, { status: 'Closed' })
          break
        case 'Closed':
          updateFile(fileId, { status: 'Open' })
          break
      }
    }

    const renderFileItem = ({ item }: { item: IFile }) => (
      <FileItem
      file={item}
      onNavigateToDetails={handleNavigateToDetails}
      onNavigateToTab={handleNavigateToTab}
      onToggleStatus={handleToggleStatus}
    />
    )
  
    return (
      <View style={globalStyles.container}>
        <TextInput
          style={globalStyles.searchInput}
          placeholder="Dosya ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={globalStyles.filterContainer}>
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

        <FlatList
          data={filteredFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderFileItem}
          ListEmptyComponent={<Text style={globalStyles.emptyText}>Dosya bulunamadı.</Text>}
        />
  
        {/* Create New File Button */}
        <FAB
          style={globalStyles.fab}
          icon="plus"
          label="Dosya Ekle"
          onPress={() => navigation.navigate('FileDetails', { isEditMode: true, fileId: null })}>
        </FAB>
      </View>
    )
  }

