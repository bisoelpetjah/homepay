import SubAccount from './subAccount'

export type UserRole = 'homeowner' | 'interiorDesignFirm'

interface User {
  email: string
  name: string
  password: string
  role: UserRole
  subAccounts?: SubAccount[]
}

export default User
