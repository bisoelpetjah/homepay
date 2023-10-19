import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type SettingsParamList = {
  Settings: undefined
}

export type NavigationProps<R extends keyof SettingsParamList = never> = BottomTabScreenProps<SettingsParamList, R>
