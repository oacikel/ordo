import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FilterType, IFile, TabType } from 'src/types'
import useFileStore from 'src/state/fileStore'
import FileItem from 'src/components/FileItem'
import { FAB, Searchbar } from "react-native-paper"
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
        <Searchbar
          style={globalStyles.searchInput}
          placeholder="Dosya ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={globalStyles.filterContainer}>
          <TouchableOpacity onPress={() => handleFilterChange('All')} style={[globalStyles.filterButton, filter === 'All' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'All' ? globalStyles.activeFilterText : globalStyles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Open')} style={[globalStyles.filterButton, filter === 'Open' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'Open' ? globalStyles.activeFilterText : globalStyles.filterText}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Closed')} style={[globalStyles.filterButton, filter === 'Closed' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'Closed' ? globalStyles.activeFilterText : globalStyles.filterText}>Closed</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderFileItem}
          ListEmptyComponent={<Text style={globalStyles.emptyText}>Dosya bulunamadı.</Text>}
        />
        <FAB
          style={globalStyles.fab}
          icon="plus"
          label="Dosya Ekle"
          color={globalStyles.fab.color}
          onPress={() => navigation.navigate('FileDetails', { isEditMode: true, fileId: null })}>
        </FAB>
      </View>
    )
  }

