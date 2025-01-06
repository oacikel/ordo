import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Chip, Menu } from 'react-native-paper' // Install react-native-paper if not already installed
import { FileStatusType, IFile } from 'src/types'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import globalStyles from 'src/styles'


interface CustomAppBarProps {
    file: IFile | null
    onToggleStatus: () => void
  }

  const CustomAppBar: React.FC<CustomAppBarProps> = ({ file, onToggleStatus }) => {
  const {mandatoryInput: fileName, status:fileStatus, 'dateInput':fileDate} = file || {mandatoryInput: '', status: 'Open', dateInput: null}
  const [menuVisible, setMenuVisible] = useState(false)
  const navigation = useNavigation()
  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.customAppBarMiddleSection}>
      <Text style={styles.title}>{t('fileDetailsAppBarTitle')}</Text>
      <Text style={styles.text}>{`${fileName} - ${fileDate ?? ''}`}</Text>
      </View>
      <View style={styles.rightSection}>
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
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu()
              onToggleStatus()
            }}
            title={fileStatus === 'Open' ? t('closeFile') : t('openFile')}
          />
        </Menu>
      </View>
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
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    flex: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    flex: 1,
  },
  customAppBarMiddleSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 'auto',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
