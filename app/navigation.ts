import { NativeStackScreenProps } from '@react-navigation/native-stack'

type UserRole = 'homeowner' | 'interiorDesignFirm'

export type RootStackParamList = {
  Splash: undefined
  Welcome: undefined
  Start: { role: UserRole }
  Login: undefined
  Signup: { role: UserRole }
}

export type NavigationProps<R extends keyof RootStackParamList = never> = NativeStackScreenProps<RootStackParamList, R>
