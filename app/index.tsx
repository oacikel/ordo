import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { FilterType, IFile, TabType } from 'app/types'
import useFileStore from 'app/state/fileStore'
import { useRouter } from 'expo-router'
import FileItem from 'app/components/FileItem'
import { FAB, Searchbar } from "react-native-paper"
import globalStyles from 'app/styles'
import useFirebaseAnalytics, { EVENT_NAMES } from 'app/utils/FirebaseUtils'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const { t } = useTranslation()
    const files = useFileStore((state) => state.files)
    const updateFile = useFileStore((state) => state.updateFile)
    const firebaseAnalytics = useFirebaseAnalytics()
    const [searchText, setSearchText] = useState<string>('')
    const [filter, setFilter] = useState<FilterType>('All')
    const [filteredFiles, setFilteredFiles] = useState<IFile[]>([])
    const router = useRouter()
  
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
      firebaseAnalytics.logEvent(EVENT_NAMES.SCREEN_VIEW, { screen: 'FileDetails', fileId, tab: 'Details' })
      router.push(`/fileDetails?fileId=${fileId}&tab=${'Details'}`)
    }
    
    const handleNavigateToTab = (fileId: string, tab: TabType) => {
      firebaseAnalytics.logEvent(EVENT_NAMES.SCREEN_VIEW, { screen: 'FileDetails', fileId, tab })
      console.log('tab', tab)
      router.push(`/fileDetails?fileId=${fileId}&initialTab=${tab}`)   
    }
    
    const handleToggleStatus = (fileId: string) => {
      switch (files.find((file) => file.id === fileId)?.status) {
        case 'Open':
        {
          updateFile(fileId, { status: 'Closed' })
          firebaseAnalytics.logEvent(EVENT_NAMES.FILE_CLOSED, { fileId })
          break
        }
        case 'Closed':
          {
            updateFile(fileId, { status: 'Open' })
            firebaseAnalytics.logEvent(EVENT_NAMES.FILE_OPENED, { fileId })
            break
          }
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
    
    const handleCreateFilePressed = () => {
      firebaseAnalytics.logEvent(EVENT_NAMES.BUTTON_CLICK)
      router.push('/fileDetails?isEditMode=true')
    }
    return (
    <SafeAreaView style={[globalStyles.container, {padding: 0}]}>
      <View style={globalStyles.container}>
        <Searchbar
          style={globalStyles.searchInput}
          placeholder={t('searchPlaceholder')}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={globalStyles.filterContainer}>
          <TouchableOpacity onPress={() => handleFilterChange('All')} style={[globalStyles.filterButton, filter === 'All' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'All' ? globalStyles.activeFilterText : globalStyles.filterText}>{t('filterAll')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Open')} style={[globalStyles.filterButton, filter === 'Open' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'Open' ? globalStyles.activeFilterText : globalStyles.filterText}>{t('filterOpened')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Closed')} style={[globalStyles.filterButton, filter === 'Closed' && globalStyles.activeFilterButton]}>
            <Text style={filter === 'Closed' ? globalStyles.activeFilterText : globalStyles.filterText}>{t('filterClosed')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderFileItem}
          ListEmptyComponent={<Text style={globalStyles.emptyText}>{t('noFileExists')}</Text>}
        />
        <FAB
          style={globalStyles.fab}
          icon="plus"
          label={t('createFile')}
          color={globalStyles.fab.color}
          onPress={handleCreateFilePressed}>
        </FAB>
      </View>
    </SafeAreaView>
    )
  }
