import SubAccount from './subAccount'

export type UserRole = 'homeowner' | 'interiorDesignFirm'

export interface UserRenovationInfo {
  address: string
  houseType: string
  keyCollectionDate: string
}

export interface UserSettings {
  allowPushNotifications: boolean
  allowEmailNotifications: boolean
  allowPhoneNotifications: boolean
}

interface User {
  email: string
  name: string
  phoneNumber: string
  password: string
  role: UserRole
  renovationInfo: UserRenovationInfo
  subAccounts?: SubAccount[]
  settings: UserSettings
}

export default User
