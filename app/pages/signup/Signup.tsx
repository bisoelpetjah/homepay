import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'

import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Loading from '../../components/loading/Loading'

import User from '../../models/user'

import { setHomeownerUser, setInteriorDesignFirmUser, setCurrentUser } from '../../services/user'

import { NavigationProps } from '../../navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 78,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 48,
    marginHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  spacer: {
    flex: 1,
  },
  button: {
    marginBottom: 64,
    marginHorizontal: 16,
  },
})

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Signup: FC<NavigationProps<'Signup'>> = ({ route, navigation }) => {
  const [isSubmitting, setSubmitting] = useState(false)

  const { control, getValues, formState: { errors }, handleSubmit } = useForm<SignupFormData>()

  const handleFormSubmit = useCallback(async (data: SignupFormData) => {
    setSubmitting(true)

    const user: User = {
      email: data.email,
      name: data.name,
      password: data.password,
      role: route.params.role,
    }

    switch(user.role) {
      case 'homeowner':
        await setHomeownerUser(user)
        break
      case 'interiorDesignFirm':
        await setInteriorDesignFirmUser(user)
        break
    }

    await setCurrentUser(user)

    setTimeout(() => {
      setSubmitting(false)

      requestAnimationFrame(() => {
        switch(user.role) {
          case 'homeowner':
            navigation.reset({ index: 0, routes: [{ name: 'DashboardHomeowner' }] })
            break
          case 'interiorDesignFirm':
            navigation.reset({ index: 0, routes: [{ name: 'DashboardInteriorDesignFirm' }] })
            break
        }
      })
    }, 1000)
  }, [])

  const errorMessages: Partial<SignupFormData> = Object.keys(getValues()).reduce((prev, key) => {
    const dataKey = key as keyof SignupFormData
    const error = errors[dataKey]

    if (error) {
      switch(dataKey) {
        case 'confirmPassword':
          switch(error.type) {
            case 'required':
              return { ...prev, [dataKey]: 'Please re-enter password' }
            case 'confirm':
              return { ...prev, [dataKey]: 'Password does not match' }
          }
        case 'email':
          switch(error.type) {
            case 'required':
              return { ...prev, [dataKey]: 'Please enter email' }
            case 'email': {
              return { ...prev, [dataKey]: 'Invalid email format' }
            }
          }
        default:
          return { ...prev, [dataKey]: `Please enter ${dataKey}` }
      }
    }
    return prev
  }, {})

  const isEmpty = !getValues().name?.length || !getValues().email?.length || !getValues().password?.length || !getValues().confirmPassword?.length
  const hasError = !!Object.keys(errorMessages).length

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign Up
        </Text>
        <Text style={styles.subtitle}>
          Set your password to keep your account safe!
        </Text>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
          <Input
            placeholder="Name as per NRIC*"
            errorMessage={errorMessages.name}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(handleFormSubmit)}
            style={styles.input}
            {...field} />
          )} />
        <Controller
          name="email"
          control={control}
          rules={{ required: true, validate: { email: value => isEmail(value) } }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              keyboardType="email-address"
              placeholder="Email*"
              errorMessage={errorMessages.email}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleFormSubmit)}
              style={styles.input}
              {...field} />
          )} />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              password
              showPasswordVisibilityToggle
              placeholder="Create Password*"
              errorMessage={errorMessages.password}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleFormSubmit)}
              style={styles.input}
              {...field} />
          )} />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true, validate: { confirm: value => (value === getValues().password) } }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              password
              showPasswordVisibilityToggle
              placeholder="Re-enter Password*"
              errorMessage={errorMessages.confirmPassword}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleFormSubmit)}
              style={styles.input}
              {...field} />
          )} />
        <View style={styles.spacer} />
        <Button
          disabled={isEmpty || hasError}
          onPress={handleSubmit(handleFormSubmit)}
          style={styles.button}>
          Submit
        </Button>
      </View>
      {isSubmitting && (
        <Loading />
      )}
    </ScrollView>
  )
}

export default Signup
