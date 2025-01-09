import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Chip, Menu } from 'react-native-paper' // Install react-native-paper if not already installed
import { FileStatusType, IFile } from 'src/types'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import globalStyles from 'src/styles'


interface CustomAppBarProps {
    mandatoryInput?: string
    status?: FileStatusType
    dateInput?: Date
    onToggleStatus: () => void
  }

  const CustomAppBar: React.FC<CustomAppBarProps> = ({ mandatoryInput, status, dateInput, onToggleStatus }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [fileStatus, setStatus] = useState<FileStatusType | undefined>(status)
  const navigation = useNavigation()
  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)
  const {t} = useTranslation()

  const handleToggleStatus = () => {
    console.log('handleToggleStatus')
    if (fileStatus === 'Open') {
      setStatus('Closed')
    } else {
      setStatus('Open')
    } 
    onToggleStatus()
    closeMenu()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.customAppBarMiddleSection}>
      <Text style={styles.title}>{t('fileDetailsAppBarTitle')}</Text>
      <Text style={styles.text}>{`${mandatoryInput} - ${dateInput ?? ''}`}</Text>
      </View>
      {fileStatus && <View style={styles.rightSection}>
        <Chip style={[globalStyles.statusChip, fileStatus === 'Open' ? globalStyles.openStatus : globalStyles.closedStatus]}>
          <Text style={fileStatus === 'Open' ? globalStyles.openStatusText: globalStyles.closedStatusText}>{fileStatus === 'Open' ? t('fileStatusOpen') : t('fileStatusClosed')}</Text>
        </Chip>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Ionicons name="ellipsis-vertical" size={24} color="gray" />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              handleToggleStatus()
            }}
            title={status === 'Open' ? t('closeFile') : t('openFile')}
          />
        </Menu>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    height: 'auto',
    flex: 1,
  },
  text: {
    fontSize: 12,
    textAlign: 'left',
    height: 'auto',
    flex: 1,
    width: '50%',
  },
  customAppBarMiddleSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  statusButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default CustomAppBar
