import React, { FC } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native'

import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

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

const Signup: FC<NavigationProps<'Signup'>> = ({ route }) => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign Up
      </Text>
      <Text style={styles.subtitle}>
        Set your password to keep your account safe!
      </Text>
      <Input
        placeholder="Name as per NRIC*"
        style={styles.input} />
      <Input
        placeholder="Email*"
        style={styles.input} />
      <Input
        password
        showPasswordVisibilityToggle
        placeholder="Create Password*"
        style={styles.input} />
      <Input
        password
        showPasswordVisibilityToggle
        placeholder="Re-enter Password*"
        style={styles.input} />
      <View style={styles.spacer} />
      <Button style={styles.button}>
        Submit
      </Button>
    </View>
  </ScrollView>
)

export default Signup
