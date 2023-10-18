import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type DashboardHomeownerParamList = {
  DashboardHomeownerHome: undefined
  DashboardHomeownerProjects: undefined
  DashboardHomeownerSettings: undefined
}

export type NavigationProps<R extends keyof DashboardHomeownerParamList = never> = BottomTabScreenProps<DashboardHomeownerParamList, R>
