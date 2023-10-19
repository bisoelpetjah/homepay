import React, { FC } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BottomBar, { GetDisplayNameHandler, GetDisplayIconHandler } from '../../components/bottom-bar/BottomBar'
import DashboardInteriorDesignFirmHome from './home/Home'
import Settings from '../settings/Settings'

import { DashboardInteriorDesignFirmParamList } from './navigation'


const Tab = createBottomTabNavigator<DashboardInteriorDesignFirmParamList>()

const getDisplayName: GetDisplayNameHandler = routeName => {
  switch (routeName as keyof DashboardInteriorDesignFirmParamList) {
    case 'DashboardInteriorDesignFirmHome':
      return 'Dashboard'
    case 'DashboardInteriorDesignFirmRejectRequests':
      return 'Reject Requests'
    case 'DashboardInteriorDesignAllProjects':
      return 'All Projects'
    case 'Settings':
      return 'Settings'
  }
}

const getDisplayIcon: GetDisplayIconHandler = routeName => {
  switch (routeName as keyof DashboardInteriorDesignFirmParamList) {
    case 'DashboardInteriorDesignFirmHome':
      return require('./dashboard-layout.png')
    case 'DashboardInteriorDesignFirmRejectRequests':
      return require('./dangerous-outline.png')
    case 'DashboardInteriorDesignAllProjects':
      return require('./folder-open.png')
    case 'Settings':
      return require('./settings.png')
  }
}

const DashboardInteriorDesignFirm: FC = () => (
  <Tab.Navigator
    initialRouteName="DashboardInteriorDesignFirmHome"
    screenOptions={{ headerShown: false }}
    tabBar={props => <BottomBar getDisplayName={getDisplayName} getDisplayIcon={getDisplayIcon} {...props} />}>
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
      name="Settings"
      component={Settings} />
  </Tab.Navigator>
)

export default DashboardInteriorDesignFirm
