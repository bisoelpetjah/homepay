import React, { FC, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { NavigationProps } from '../../navigation'

import { getCurrentUser } from '../../services/user'

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
    setTimeout(async () => {
      const user = await getCurrentUser()

      if (!user) {
        navigation.replace('Welcome')
        return
      }

      switch (user.role) {
        case 'homeowner':
          navigation.replace('DashboardHomeowner')
          break
        case 'interiorDesignFirm':
          navigation.replace('DashboardInteriorDesignFirm')
          break
      }
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
