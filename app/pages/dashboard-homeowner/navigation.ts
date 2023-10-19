import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { SettingsParamList } from '../settings/navigation'

export type DashboardHomeownerParamList = {
  DashboardHomeownerHome: undefined
  DashboardHomeownerProjects: undefined
} & SettingsParamList

export type NavigationProps<R extends keyof DashboardHomeownerParamList = never> = BottomTabScreenProps<DashboardHomeownerParamList, R>
