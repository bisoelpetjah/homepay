import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

import Loading from '../../../components/loading/Loading'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'

import User from '../../../models/user'

import { getCurrentUser, setCurrentUser as setUser, setHomeownerUser, setInteriorDesignFirmUser } from '../../../services/user'

import { NavigationProps } from '../../../navigation'

import { surfacesLightSurface3, surfacesLightSurface3Alpha, sysLightPrimary, sysLightOnPrimaryContainer, sysLightOutlineVariant } from '../../../styles/colors'

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
  sectionTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  sectionTitleText: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  sectionTitleAction: {
    height: 20,
  },
  sectionTitleActionText: {
    color: sysLightPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginBottom: 32,
    marginTop: 56,
  },
})

interface InformationFormData {
  name: string
  email: string
  phoneNumber: string
  address: string
  houseType: string
  keyCollectionDate: string
  password: string
}

const SettingsInformation: FC<NavigationProps<'SettingsInformation'>> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isEditingPersonalInfo, setEditingPersonalInfo] = useState(false)
  const [isEditingRenovationInfo, setEditingRenovationInfo] = useState(false)
  const [isEditingPassword, setEditingPassword] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTimeout(async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }, 1000)
  }, [])

  const { control, getValues, setValue, clearErrors, formState: { errors }, handleSubmit } = useForm<InformationFormData>()

  const handleToggleEditingPersonalInfo = useCallback(() => {
    setEditingPersonalInfo(value => !value)
  }, [currentUser])

  const handleToggleEditingRenovationInfo = useCallback(() => {
    setEditingRenovationInfo(value => !value)
  }, [currentUser])

  const handleToggleEditingPassword = useCallback(() => {
    setEditingPassword(value => !value)
  }, [])

  useEffect(() => {
    if (!currentUser || isEditingPersonalInfo) return

    setValue('name', currentUser.name)
    setValue('email', currentUser.email)
    setValue('phoneNumber', currentUser.phoneNumber)

    clearErrors('name')
    clearErrors('email')
    clearErrors('phoneNumber')
  }, [currentUser, isEditingPersonalInfo])

  useEffect(() => {
    if (!currentUser || isEditingRenovationInfo) return

    setValue('address', currentUser.renovationInfo.address)
    setValue('houseType', currentUser.renovationInfo.houseType)
    setValue('keyCollectionDate', currentUser.renovationInfo.keyCollectionDate)

    clearErrors('address')
    clearErrors('houseType')
    clearErrors('keyCollectionDate')
  }, [currentUser, isEditingRenovationInfo])

  useEffect(() => {
    if (isEditingPassword) return

    setValue('password', '')
    clearErrors('password')
  }, [isEditingPassword])

  const handleFormSubmit = useCallback(async (data: InformationFormData) => {
    setSubmitting(true)

    const user: User = { ...currentUser! }

    if (isEditingPersonalInfo) {
      user.name = data.name
      user.email = data.email
      user.phoneNumber = data.phoneNumber
    }

    if (isEditingRenovationInfo) {
      user.renovationInfo.address = data.address
      user.renovationInfo.houseType = data.houseType
      user.renovationInfo.keyCollectionDate = data.keyCollectionDate
    }

    if (isEditingPassword ) {
      user.password = data.password
    }

    switch (user.role) {
      case 'homeowner':
        await setHomeownerUser(user)
        break
      case 'interiorDesignFirm':
        await setInteriorDesignFirmUser(user)
        break
    }

    await setUser(user)
    setCurrentUser(user)

    setTimeout(() => {
      setSubmitting(false)

      requestAnimationFrame(() => {
        if (isEditingPersonalInfo) handleToggleEditingPersonalInfo()
        if (isEditingRenovationInfo) handleToggleEditingRenovationInfo()
        if (isEditingPassword) handleToggleEditingPassword()
      })
    }, 1000)
  }, [currentUser, isEditingPersonalInfo, isEditingRenovationInfo, isEditingPassword])

  const errorMessages: Partial<InformationFormData> = Object.keys(getValues()).reduce((prev, key) => {
    const dataKey = key as keyof InformationFormData
    const error = errors[dataKey]

    if (error) {
      switch (dataKey) {
        case 'email':
          switch (error.type) {
            case 'required':
              return { ...prev, [dataKey]: 'Please enter email' }
            case 'email': {
              return { ...prev, [dataKey]: 'Invalid email format' }
            }
          }
        case 'phoneNumber':
          switch (error.type) {
            case 'required':
              return { ...prev, [dataKey]: 'Please enter phone number' }
            case 'phone': {
              return { ...prev, [dataKey]: 'Invalid phone number format' }
            }
          }
        default:
          return { ...prev, [dataKey]: `Please enter ${dataKey}` }
      }
    }
    return prev
  }, {})

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
          Edit Information
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>
            Personal Information
          </Text>
          <TouchableOpacity
            onPress={handleToggleEditingPersonalInfo}
            style={styles.sectionTitleAction}>
            <Text style={styles.sectionTitleActionText}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Controller
          name="name"
          control={control}
          defaultValue={currentUser.name}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              placeholder="Name as per NRIC"
              disabled={!isEditingPersonalInfo}
              errorMessage={errorMessages.name}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <Controller
          name="email"
          control={control}
          defaultValue={currentUser.email}
          rules={{ required: true, validate: { email: value => isEmail(value) } }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              keyboardType="email-address"
              placeholder="Email"
              disabled={!isEditingPersonalInfo}
              errorMessage={errorMessages.email}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue={currentUser.phoneNumber}
          rules={{ required: true, validate: { phone: value => isMobilePhone(value) } }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              keyboardType="phone-pad"
              placeholder="Phone Number"
              disabled={!isEditingPersonalInfo}
              errorMessage={errorMessages.phoneNumber}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>
            Renovation Information
          </Text>
          <TouchableOpacity
            onPress={handleToggleEditingRenovationInfo}
            style={styles.sectionTitleAction}>
            <Text style={styles.sectionTitleActionText}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Controller
          name="address"
          control={control}
          defaultValue={currentUser.renovationInfo.address}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              placeholder="Address"
              disabled={!isEditingRenovationInfo}
              errorMessage={errorMessages.address}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
            )} />
        <Controller
          name="houseType"
          control={control}
          defaultValue={currentUser.renovationInfo.houseType}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              placeholder="House Type"
              disabled={!isEditingRenovationInfo}
              errorMessage={errorMessages.houseType}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <Controller
          name="keyCollectionDate"
          control={control}
          defaultValue={currentUser.renovationInfo.keyCollectionDate}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              placeholder="Key Collection Date"
              disabled={!isEditingRenovationInfo}
              errorMessage={errorMessages.keyCollectionDate}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>
            Password
          </Text>
          <TouchableOpacity
            onPress={handleToggleEditingPassword}
            style={styles.sectionTitleAction}>
            <Text style={styles.sectionTitleActionText}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Controller
          name="password"
          control={control}
          rules={{ required: isEditingPassword }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              password
              showPasswordVisibilityToggle
              placeholder="Password"
              disabled={!isEditingPassword}
              errorMessage={errorMessages.password}
              onChangeText={onChange}
              style={styles.input}
              {...field} />
          )} />
        <Button
          disabled={!isEditingPersonalInfo && !isEditingRenovationInfo && !isEditingPassword}
          onPress={handleSubmit(handleFormSubmit)}
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

export default SettingsInformation
