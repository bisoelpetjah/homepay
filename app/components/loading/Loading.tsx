import React, { FC, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { sysLightPrimary, sysLightSecondaryContainer } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlay: {
    backgroundColor: '#000000aa',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: sysLightSecondaryContainer,
    borderRadius: 4,
    height: 120,
    justifyContent: 'center',
    width: 150,
  },
  loading: {
    transform: [{ scale: 1.5 }],
  },
})

const Loading: FC = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', e => { e.preventDefault() })
    return removeListener
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={sysLightPrimary}
          style={styles.loading} />
      </View>
    </View>
  )
}

export default Loading
