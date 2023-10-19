import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import NotificationSettings from 'react-native-open-notification'

import Loading from '../../../components/loading/Loading'
import Switch from '../../../components/switch/Switch'
import Button from '../../../components/button/Button'
import Checkbox from '../../../components/checkbox/Checkbox'

import User from '../../../models/user'

import { getCurrentUser, setCurrentUser as setUser, setHomeownerUser, setInteriorDesignFirmUser } from '../../../services/user'

import { NavigationProps } from '../../../navigation'

import { sysLightOnPrimaryContainer } from '../../../styles/colors'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height - 32 - 8 - 32,
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
  sectionTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  pushNotificationsMenuContainer: {
    flexDirection: 'row',
  },
  pushNotificationsMenuText: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    marginEnd: 32,
  },
  pushNotificationsMenuExternalText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  pushNotificationsMenuExternalButton: {
    marginBottom: 24,
  },
  updatesText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  updatesMenuContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  updatesMenuCheckbox: {
    marginEnd: 28,
  },
  updatesMenuText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    lineHeight: 24,
  },
  spacer: {
    flex: 1,
  },
  submitButton: {
    marginBottom: 32,
  },
})

const SettingsNotifications: FC<NavigationProps<'SettingsNotifications'>> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTimeout(async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }, 500)
  }, [])

  const handleChangePushNotifications = useCallback((isActive: boolean) => {
    const user: User = { ...currentUser! }
    user.settings.allowPushNotifications = isActive

    setCurrentUser(user)
  }, [currentUser])

  const handleChangeEmailNotifications = useCallback((isActive: boolean) => {
    const user: User = { ...currentUser! }
    user.settings.allowEmailNotifications = isActive

    setCurrentUser(user)
  }, [currentUser])

  const handleChangePhoneNotifications = useCallback((isActive: boolean) => {
    const user: User = { ...currentUser! }
    user.settings.allowPhoneNotifications = isActive

    setCurrentUser(user)
  }, [currentUser])

  const handleOpenExternalSettings = useCallback(() => {
    NotificationSettings.open()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!currentUser) return

    setSubmitting(true)

    switch (currentUser.role) {
      case 'homeowner':
        await setHomeownerUser(currentUser)
        break
      case 'interiorDesignFirm':
        await setInteriorDesignFirmUser(currentUser)
        break
    }

    await setUser(currentUser)

    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }, [currentUser])

  if (!currentUser) return <Loading />

  return (
    <ScrollView>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          activeOpacity={.5}
          onPress={() => navigation.goBack()}
          style={styles.topBarBackButton}>
          <Image
            source={require('./arrow-back-ios-new.png')}
            style={styles.topBarBackButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.topBarPageTitle}>
          Notification Settings
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          Push Notifications
        </Text>
        <View style={styles.pushNotificationsMenuContainer}>
          <Text style={styles.pushNotificationsMenuText}>
            Allow push notifications from this app
          </Text>
          <Switch
            selected={currentUser.settings.allowPushNotifications}
            onChangeSelected={handleChangePushNotifications} />
        </View>
        <Text style={styles.pushNotificationsMenuExternalText}>
          Adjust other notification settings in your phone settings
        </Text>
        <Button
          outlined
          onPress={handleOpenExternalSettings}
          style={styles.pushNotificationsMenuExternalButton}>
          Go to Phone settings
        </Button>
        <Text style={styles.sectionTitle}>
          Homepay Updates
        </Text>
        <Text style={styles.updatesText}>
          Get the latest news about Homepay and your account
        </Text>
        <View style={styles.updatesMenuContainer}>
          <Checkbox
            checked={currentUser.settings.allowEmailNotifications}
            onChangeChecked={handleChangeEmailNotifications}
            style={styles.updatesMenuCheckbox} />
          <Text style={styles.updatesMenuText}>
            Email
          </Text>
        </View>
        <View style={styles.updatesMenuContainer}>
          <Checkbox
            checked={currentUser.settings.allowPhoneNotifications}
            onChangeChecked={handleChangePhoneNotifications}
            style={styles.updatesMenuCheckbox} />
          <Text style={styles.updatesMenuText}>
            Phone Number
          </Text>
        </View>
        <View style={styles.spacer} />
        <Button
          onPress={handleSubmit}
          style={styles.submitButton}>
          Save
        </Button>
      </View>
      {isSubmitting && (
        <Loading />
      )}
    </ScrollView>
  )
}

export default SettingsNotifications
