import React, { FC, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { NavigationProps } from '../../navigation'

import { surfacesLightSurface3Alpha } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: surfacesLightSurface3Alpha,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: '50%',
    objectFit: 'contain',
    width: '50%',
  },
})

const Splash: FC<NavigationProps<'Splash'>> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome')
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')}
        style={styles.logo} />
    </View>
  )
}

export default Splash
