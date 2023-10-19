import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions, Text } from 'react-native'
import { useIsFocused, NavigationProp } from '@react-navigation/native'

import Loading from '../../components/loading/Loading'
import Button from '../../components/button/Button'

import User from '../../models/user'

import { getCurrentUser, clearCurrentUser } from '../../services/user'

import { NavigationProps } from './navigation'
import { RootStackParamList } from '../../navigation'

import { surfacesLightSurface3, surfacesLightSurface3Alpha, sysLightOnPrimaryContainer, sysLightOutlineVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height - 32 - 8 - 32 - 80,
    paddingHorizontal: 16,
  },
  topBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  topBarBackButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  topBarBackButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  topBarPageTitle: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    marginEnd: 32,
    textAlign: 'center',
  },
  userInfoContainer: {
    marginBottom: 16,
  },
  userInfoTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 8,
  },
  userInfoDetail: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  divider: {
    backgroundColor: sysLightOutlineVariant,
    height: 1,
  },
  sectionTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginVertical: 16,
  },
  menuButton: {
    backgroundColor: surfacesLightSurface3,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuButtonContainer: {
    backgroundColor: surfacesLightSurface3Alpha,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
  },
  menuButtonText: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  menuButtonIcon: {
    height: 24,
    transform: [{ rotate: '180deg' }],
    width: 24,
  },
  logoutButton: {
    marginVertical: 32,
  },
  versionNumber: {
    color: sysLightOnPrimaryContainer,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 40,
  },
})

const Settings: FC<NavigationProps<'Settings'>> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isFocused = useIsFocused()

  const handleGetCurrentUser = useCallback(async () => {
    const data = await getCurrentUser()
    setCurrentUser(data)
  }, [])

  useEffect(() => {
    if (isFocused) setTimeout(handleGetCurrentUser, 1000)
  }, [isFocused])

  const handleLogout = useCallback(async () => {
    await clearCurrentUser()
    navigation.getParent<NavigationProp<RootStackParamList>>().reset({ index: 0, routes: [{ name: 'Welcome' }] })
  }, [])

  if (!currentUser) return <Loading />

  return (
    <ScrollView>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.topBarBackButton}>
          <Image
            source={require('./arrow-back-ios-new.png')}
            style={styles.topBarBackButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.topBarPageTitle}>
          Settings
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>
            {currentUser.name}
          </Text>
          <Text style={styles.userInfoDetail}>
            Client ID: XXXXXXXX
          </Text>
          <Text style={styles.userInfoDetail}>
            Phone : 91234567
          </Text>
          <Text style={styles.userInfoDetail}>
            Email: {currentUser.email}
          </Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>
          Account Settings
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.getParent<NavigationProp<RootStackParamList>>().navigate('SettingsInformation') }}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              Edit Information
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              Notification Settings
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              Transaction History
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>
          Help
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              FAQ
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              Contact Support
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.menuButton}>
          <View style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>
              Rate this App
            </Text>
            <Image
              source={require('./arrow-back-ios-new.png')}
              style={styles.menuButtonIcon} />
          </View>
        </TouchableOpacity>
        <Button
          onPress={handleLogout}
          style={styles.logoutButton}>
          Log Out
        </Button>
        <Text style={styles.versionNumber}>
          Version 1.0
        </Text>
      </View>
    </ScrollView>
  )
}

export default Settings
