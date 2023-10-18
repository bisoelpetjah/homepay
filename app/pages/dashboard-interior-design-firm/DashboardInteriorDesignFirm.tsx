import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native'
import type { NavigationState } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs'

import DashboardInteriorDesignFirmHome from './home/Home'

import { DashboardInteriorDesignFirmParamList } from './navigation'

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

const NavigationBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const routes = state.routes as NavigationState<DashboardInteriorDesignFirmParamList>['routes']
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

        let displayName: string
        let displayIcon: ImageSourcePropType
        switch (route.name) {
          case 'DashboardInteriorDesignFirmHome':
            displayName = 'Dashboard'
            displayIcon = require('./dashboard-layout.png')
            break
          case 'DashboardInteriorDesignFirmRejectRequests':
            displayName = 'Reject Requests'
            displayIcon = require('./dangerous-outline.png')
            break
          case 'DashboardInteriorDesignAllProjects':
            displayName = 'All Projects'
            displayIcon = require('./folder-open.png')
            break
          case 'DashboardInteriorDesignFirmSettings':
            displayName = 'Settings'
            displayIcon = require('./settings.png')
            break
        }

        return (
          <TouchableOpacity
            key={i}
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

const Tab = createBottomTabNavigator<DashboardInteriorDesignFirmParamList>()

const DashboardInteriorDesignFirm: FC = () => (
  <Tab.Navigator
    initialRouteName="DashboardInteriorDesignFirmHome"
    screenOptions={{ headerShown: false }}
    tabBar={NavigationBar}>
    <Tab.Screen
      name="DashboardInteriorDesignFirmHome"
      component={DashboardInteriorDesignFirmHome} />
    <Tab.Screen
      name="DashboardInteriorDesignFirmRejectRequests"
      component={View} />
    <Tab.Screen
      name="DashboardInteriorDesignAllProjects"
      component={View} />
    <Tab.Screen
      name="DashboardInteriorDesignFirmSettings"
      component={View} />
  </Tab.Navigator>
)

export default DashboardInteriorDesignFirm
