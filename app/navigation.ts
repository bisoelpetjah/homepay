import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { UserRole } from './models/user'

export type RootStackParamList = {
  Splash: undefined
  Welcome: undefined
  Start: { role: UserRole }
  Login: undefined
  Signup: { role: UserRole }
  DashboardHomeowner: undefined
  DashboardInteriorDesignFirm: undefined
}

export type NavigationProps<R extends keyof RootStackParamList = never> = NativeStackScreenProps<RootStackParamList, R>
