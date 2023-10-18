import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type DashboardInteriorDesignFirmParamList = {
  DashboardInteriorDesignFirmHome: undefined
  DashboardInteriorDesignFirmRejectRequests: undefined
  DashboardInteriorDesignAllProjects: undefined
  DashboardInteriorDesignFirmSettings: undefined
}

export type NavigationProps<R extends keyof DashboardInteriorDesignFirmParamList = never> = BottomTabScreenProps<DashboardInteriorDesignFirmParamList, R>
