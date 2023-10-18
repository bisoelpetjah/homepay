import AsyncStorage from '@react-native-async-storage/async-storage'

type keys = {
  homeownerUser: 'homeowner-user',
  interiorDesignFirmUser: 'interior-design-firm-user',
  currentUser: 'current-user',
}

type StorageKey = keyof keys

export const getData = (key: StorageKey) => AsyncStorage.getItem(key)

export const setData = (key: StorageKey, value: string) => AsyncStorage.setItem(key, value)

export const clearData = (key: StorageKey) => AsyncStorage.removeItem(key)
