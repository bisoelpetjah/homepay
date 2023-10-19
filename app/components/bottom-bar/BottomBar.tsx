import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native'
import type { NavigationState } from '@react-navigation/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { sysLightOnPrimaryContainer, sysLightSecondaryContainer, sysLightSurfaceContainerLowest } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: sysLightSurfaceContainerLowest,
    flexDirection: 'row',
    height: 80,
  },
  button: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 16,
    paddingTop: 12,
  },
  buttonIconContainer: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginBottom: 4,
    width: 64,
  },
  buttonIconContainerActive: {
    backgroundColor: sysLightSecondaryContainer,
  },
  buttonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  buttonText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  buttonTextActive: {
    fontWeight: '700',
  },
})

export type GetDisplayNameHandler = (routeName: string) => string
export type GetDisplayIconHandler = (routeName: string) => ImageSourcePropType

interface BottomBarBaseProps {
  getDisplayName: GetDisplayNameHandler
  getDisplayIcon: GetDisplayIconHandler
}

type BottomBarProps = BottomBarBaseProps & BottomTabBarProps

const BottomBar: FC<BottomBarProps> = ({ state, navigation, getDisplayName, getDisplayIcon }) => {
  const routes = state.routes as NavigationState['routes']

  return (
    <View style={styles.container}>
      {routes.map((route, i) => {
        const isActive = (state.index === i)

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              params: undefined,
              merge: true,
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const displayName = getDisplayName(route.name)
        const displayIcon = getDisplayIcon(route.name)

        return (
          <TouchableOpacity
            key={i}
            activeOpacity={.5}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}>
            <View style={styles.buttonContainer}>
              <View style={StyleSheet.compose(styles.buttonIconContainer, isActive && styles.buttonIconContainerActive)}>
                <Image
                  source={displayIcon}
                  style={styles.buttonIcon} />
              </View>
              <Text style={StyleSheet.compose(styles.buttonText, isActive && styles.buttonTextActive)}>
                {displayName}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default BottomBar
