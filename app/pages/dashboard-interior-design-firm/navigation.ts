import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { SettingsParamList } from '../settings/navigation'

export type DashboardInteriorDesignFirmParamList = {
  DashboardInteriorDesignFirmHome: undefined
  DashboardInteriorDesignFirmRejectRequests: undefined
  DashboardInteriorDesignAllProjects: undefined
} & SettingsParamList

export type NavigationProps<R extends keyof DashboardInteriorDesignFirmParamList = never> = BottomTabScreenProps<DashboardInteriorDesignFirmParamList, R>
