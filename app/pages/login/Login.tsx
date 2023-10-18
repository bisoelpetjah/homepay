import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Loading from '../../components/loading/Loading'

import User from '../../models/user'

import { getHomeownerUser, getInteriorDesignFirmUser, setCurrentUser } from '../../services/user'

import { NavigationProps } from '../../navigation'

import { sysLightError } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
    paddingTop: '30%',
  },
  logo: {
    height: '70%',
    objectFit: 'contain',
    width: '50%',
  },
  errorMessage: {
    color: sysLightError,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorMessageHidden: {
    opacity: 0,
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  button: {
    marginBottom: 64,
    marginHorizontal: 16,
    marginTop: '60%',
  },
})

interface LoginFormData {
  email: string
  password: string
}

const Login: FC<NavigationProps<'Login'>> = ({ route, navigation }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const { control, getValues, formState: { errors }, handleSubmit } = useForm<LoginFormData>()

  const handleFormSubmit = useCallback(async (data: LoginFormData) => {
    setSubmitError(false)
    setSubmitting(true)

    let registeredUser: User | null = null
    switch (route.params.role) {
      case 'homeowner':
        registeredUser = await getHomeownerUser()
        break
      case 'interiorDesignFirm':
        registeredUser = await getInteriorDesignFirmUser()
        break
    }

    setTimeout(() => {
      setSubmitting(false)

      requestAnimationFrame(async () => {
        if (!registeredUser) {
          setSubmitError(true)
          return
        }

        if (registeredUser.email !== data.email || registeredUser.password !== data.password) {
          setSubmitError(true)
          return
        }

        await setCurrentUser(registeredUser)

        switch (route.params.role) {
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

  const errorMessages: Partial<LoginFormData> = Object.keys(getValues()).reduce((prev, key) => {
    const dataKey = key as keyof LoginFormData
    const error = errors[dataKey]

    if (error) return { ...prev, [dataKey]: `Please enter ${dataKey}` }

    return prev
  }, {})

  const isEmpty = !getValues().email?.length || !getValues().password?.length
  const hasError = !!Object.keys(errorMessages).length

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./logo.png')}
            style={styles.logo} />
        </View>
        <Text style={StyleSheet.compose(styles.errorMessage, submitError ? {} : styles.errorMessageHidden)}>
          Incorrect log in or password
        </Text>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              keyboardType="email-address"
              placeholder="Email/Phone Number"
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
              placeholder="Password"
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleFormSubmit)}
              style={styles.input}
              {...field} />
          )} />
        <Button
          disabled={isEmpty || hasError}
          onPress={handleSubmit(handleFormSubmit)}
          style={styles.button}>
          Verify
        </Button>
      </View>
      {isSubmitting && (
        <Loading />
      )}
    </ScrollView>
  )
}

export default Login
