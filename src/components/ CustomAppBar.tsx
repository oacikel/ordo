import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper'; // Install react-native-paper if not already installed
import { FileStatusType } from 'src/types';
import { useNavigation } from '@react-navigation/native';


interface CustomAppBarProps {
    fileStatus: FileStatusType
    onToggleStatus: () => void
  }

  const CustomAppBar: React.FC<CustomAppBarProps> = ({ fileStatus, onToggleStatus }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation()
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Dosya Bilgileri</Text>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* Status Button */}
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusText}>{fileStatus === 'Open' ? 'Açık' : 'Kapalı'}</Text>
        </TouchableOpacity>

        {/* Menu Button */}
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
              closeMenu();
              onToggleStatus();
            }}
            title={fileStatus === 'Open' ? 'Dosyayı Kapat' : 'Dosyayı Aç'}
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1, // Center-align title by giving it flex space
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
});

export default CustomAppBar;
