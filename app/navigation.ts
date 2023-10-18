import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { UserRole } from './models/user'
import Project from './models/project'

export type RootStackParamList = {
  Splash: undefined
  Welcome: undefined
  Start: { role: UserRole }
  Login: { role: UserRole }
  Signup: { role: UserRole }
  DashboardHomeowner: undefined
  HomeownerProjectDetail: { project: Project }
  DashboardInteriorDesignFirm: undefined
}

export type NavigationProps<R extends keyof RootStackParamList = never> = NativeStackScreenProps<RootStackParamList, R>
