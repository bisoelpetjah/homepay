import React, { FC, useCallback } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import Button from '../../components/button/Button'

import { NavigationProps } from '../../navigation'

import { sysLightOnPrimary } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  background: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: '40%',
    objectFit: 'contain',
    width: '40%',
  },
  actionContainer: {
    marginBottom: 100,
    marginHorizontal: 16,
  },
  actionPrompt: {
    color: sysLightOnPrimary,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  actionFirstButton: {
    marginBottom: 16,
  },
})

const Welcome: FC<NavigationProps<'Welcome'>> = ({ navigation }) => {
  const handleContinueAsHomeowner = useCallback(() => {
    navigation.push('Start', { role: 'homeowner' })
  }, [])

  const handleContinueAsInteriorDesignFirm = useCallback(() => {
    navigation.push('Start', { role: 'interiorDesignFirm' })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('./welcome-screen.gif')}
          style={styles.background} />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require('./logo.png')}
          style={styles.logo} />
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.actionPrompt}>
          Are you entering as
        </Text>
        <Button
          onPress={handleContinueAsHomeowner}
          style={styles.actionFirstButton}>
          Homeowner
        </Button>
        <Button onPress={handleContinueAsInteriorDesignFirm}>
          Interior Design Firm
        </Button>
      </View>
    </View>
  )
}

export default Welcome
