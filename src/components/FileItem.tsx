import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Card, IconButton, Chip, Menu } from 'react-native-paper'
import globalStyles from 'src/styles'
import { IFile, TabType } from 'src/types'
import Separator from './Separator'

interface FileItemProps {
    file: IFile
    onNavigateToDetails: (fileId: string) => void
    onNavigateToTab: (fileId: string, tab: TabType) => void
    onToggleStatus: (fileId: string) => void
  }


const FileItem: React.FC<FileItemProps> = ({
    file,
    onNavigateToDetails,
    onNavigateToTab,
    onToggleStatus,
  }) => {

const [menuVisible, setMenuVisible] = useState(false)

const openMenu = () => setMenuVisible(true)
const closeMenu = () => setMenuVisible(false)

  return (
    <Card style={[file.status === 'Open' ? globalStyles.cardOpen : globalStyles.cardClosed]} contentStyle={[{margin: 0}]}>
      <Card.Content>
        <View style={globalStyles.headerRow}>
          <Text variant="titleMedium" style={globalStyles.mandatoryInput}>
            {file.mandatoryInput}
          </Text>
          <Chip
            mode="outlined"
            style={[
              globalStyles.statusChip,
              file.status === 'Open' ? globalStyles.openStatus : globalStyles.closedStatus,
            ]}
            textStyle={
              file.status === 'Open' ? globalStyles.openStatusText : globalStyles.closedStatusText
            }
          >
            {file.status === 'Open' ? 'Açık' : 'Kapalı'}
          </Chip>
          <Separator />
            <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton 
              icon="dots-vertical"
              size={20}
              onPress={openMenu}
              style={[globalStyles.actionButton]}
              iconColor={globalStyles.actionButton.color}/>
            }
            >
            <Menu.Item
              onPress={() => {
              closeMenu()
              onNavigateToDetails(file.id)
              }}
              title="Dosya Detayına git"
            />
            <Menu.Item
              onPress={() => {
              closeMenu()
              onToggleStatus(file.id)
              }}
              title={file.status === 'Open' ? 'Dosyayı Kapat' : 'Dosyayı Aç'}
            />
            <Menu.Item
              onPress={() => {
              closeMenu()
              onNavigateToTab(file.id, 'TabB')
              }}
              title="Tab B'ye git"
            />
            <Menu.Item
              onPress={() => {
              closeMenu()
              onNavigateToTab(file.id, 'TabC')
              }}
              title="Tab C'ye git"
            />
            </Menu>
        </View>
        <Text style={globalStyles.detailsText}>
          {file.numericInput1} •{' '}
          {file.textInput1}
        </Text>
        <View style={file.status === 'Open' ? globalStyles.dividerOpen : globalStyles.dividerClosed } />
        <Text style={globalStyles.detailsText}>
          {file.textInput2} •{' '}
          {file.textInput3}
        </Text>
        <Text style={globalStyles.detailsText}>
          {file.numericInput2} •{' '}
          {file.dateInput ? `${file.dateInput.toLocaleDateString()}` : ''}
        </Text>
     </Card.Content>
    </Card>
  )
}

export default FileItem
