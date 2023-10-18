import User from '../models/user'

import { getData, setData, clearData } from '../data/asyncStorage'

export const getHomeownerUser = async () => {
  const data = await getData('homeownerUser')
  if (!data) return null
  return JSON.parse(data) as User
}

export const setHomeownerUser = async (user: User) => {
  const data = JSON.stringify(user)
  return setData('homeownerUser', data)
}

export const clearHomeownerUser = () => clearData('homeownerUser')

export const getInteriorDesignFirmUser = async () => {
  const data = await getData('interiorDesignFirmUser')
  if (!data) return null
  return JSON.parse(data) as User
}

export const setInteriorDesignFirmUser = async (user: User) => {
  const data = JSON.stringify(user)
  return setData('interiorDesignFirmUser', data)
}

export const clearInteriorDesignFirmUser = () => clearData('interiorDesignFirmUser')

export const getCurrentUser = async () => {
  const data = await getData('currentUser')
  if (!data) return null
  return JSON.parse(data) as User
}

export const setCurrentUser = async (user: User) => {
  const data = JSON.stringify(user)
  return setData('currentUser', data)
}

export const clearCurrentUser = () => clearData('currentUser')
