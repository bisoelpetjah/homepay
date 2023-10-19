import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type SettingsParamList = {
  Settings: undefined
}

export type SettingsMenuParamList = {
  SettingsInformation: undefined
  SettingsNotifications: undefined
  SettingsTransactionHistory: undefined
}

export type NavigationProps<R extends keyof SettingsParamList = never> = BottomTabScreenProps<SettingsParamList, R>

export type MenuNavigationProps<R extends keyof SettingsMenuParamList = never> = NativeStackScreenProps<SettingsMenuParamList, R>
