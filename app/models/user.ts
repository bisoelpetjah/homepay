export type UserRole = 'homeowner' | 'interiorDesignFirm'

interface User {
  email: string
  name: string
  password: string
  role: UserRole
}

export default User
