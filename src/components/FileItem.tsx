import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card, IconButton, Chip, Menu } from 'react-native-paper'
import { IFile, TabType } from 'src/types'

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
    <Card style={styles.card}>
      <Card.Content>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.mandatoryInput}>
            {file.mandatoryInput}
          </Text>
          <Chip
            mode="outlined"
            style={[
              styles.statusChip,
              file.status === 'Open' ? styles.openStatus : styles.closedStatus,
            ]}
          >
            {file.status === 'Open' ? 'Açık' : 'Kapalı'}
          </Chip>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" size={20} onPress={openMenu} />
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
        <Text style={styles.detailsText}>
          {file.numericInput1} •{' '}
          {file.textInput1}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.detailsText}>
          {file.textInput2} •{' '}
          {file.textInput3}
        </Text>

        {/* Numeric Input 2 & Date Input */}
        <Text style={styles.detailsText}>
          {file.numericInput2} •{' '}
          {file.dateInput ? `${file.dateInput.toLocaleDateString()}` : ''}
        </Text>
     </Card.Content>
    </Card>
  )
}

export default FileItem

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#f5faff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mandatoryInput: {
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusChip: {
    marginHorizontal: 8,
    borderRadius: 16,
    paddingHorizontal: 4,
  },
  openStatus: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00796b',
  },
  closedStatus: {
    backgroundColor: '#ffebee',
    borderColor: '#d32f2f',
  },
  detailsText: {
    color: '#555',
    marginVertical: 2,
  },
  divider: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
},
})
