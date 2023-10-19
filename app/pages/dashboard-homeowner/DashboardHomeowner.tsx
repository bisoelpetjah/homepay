import React, { FC } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BottomBar, { GetDisplayNameHandler, GetDisplayIconHandler } from '../../components/bottom-bar/BottomBar'
import DashboardHomeownerHome from './home/Home'
import Settings from '../settings/Settings'

import { DashboardHomeownerParamList } from './navigation'

const Tab = createBottomTabNavigator<DashboardHomeownerParamList>()

const getDisplayName: GetDisplayNameHandler = routeName => {
  switch (routeName as keyof DashboardHomeownerParamList) {
    case 'DashboardHomeownerHome':
      return 'Dashboard'
    case 'DashboardHomeownerProjects':
      return 'Projects'
    case 'Settings':
      return 'Settings'
  }
}

const getDisplayIcon: GetDisplayIconHandler = routeName => {
  switch (routeName as keyof DashboardHomeownerParamList) {
    case 'DashboardHomeownerHome':
      return require('./dashboard-layout.png')
    case 'DashboardHomeownerProjects':
      return require('./folder-open.png')
    case 'Settings':
      return require('./settings.png')
  }
}

const DashboardHomeowner: FC = () => (
  <Tab.Navigator
    initialRouteName="DashboardHomeownerHome"
    screenOptions={{ headerShown: false }}
    tabBar={props => <BottomBar getDisplayName={getDisplayName} getDisplayIcon={getDisplayIcon} {...props} />}>
    <Tab.Screen
      name="DashboardHomeownerHome"
      component={DashboardHomeownerHome} />
    <Tab.Screen
      name="DashboardHomeownerProjects"
      component={View} />
    <Tab.Screen
      name="Settings"
      component={Settings} />
  </Tab.Navigator>
)

export default DashboardHomeowner
