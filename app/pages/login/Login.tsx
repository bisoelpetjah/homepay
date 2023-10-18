import React, { FC } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, Dimensions } from 'react-native'

import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: '30%',
  },
  logo: {
    height: '60%',
    objectFit: 'contain',
    width: '30%',
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

const Login: FC = () => (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./logo.png')}
          style={styles.logo} />
      </View>
      <Input
        placeholder="Email/Phone Number"
        style={styles.input} />
      <Input
        password
        placeholder="Password"
        style={styles.input} />
      <Button style={styles.button}>
        Verify
      </Button>
    </View>
  </ScrollView>
)

export default Login
