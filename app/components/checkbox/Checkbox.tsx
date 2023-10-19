import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, TextStyle } from 'react-native'

import { sysLightPrimary, sysLightOnPrimary, sysLightOutline, sysLightSurfaceVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  buttton: {
    alignItems: 'center',
    borderColor: sysLightOutline,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  buttonChecked: {
    backgroundColor: sysLightPrimary,
    borderColor: sysLightPrimary,
  },
  indicator: {
    height: 32,
    objectFit: 'contain',
    opacity: 0,
    width: 32,
  },
  indicatorChecked: {
    opacity: 1,
  },
})

interface CheckboxProps {
  checked?: boolean
  onChangeChecked?: (checked: boolean) => void
  style?: StyleProp<TextStyle>
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChangeChecked, style }) => {
  const [isChecked, setChecked] = useState(checked || false)

  useEffect(() => {
    if (typeof checked === 'undefined') return
    setChecked(checked)
  }, [checked])

  const handleCheckChange = useCallback(() => {
    setChecked(value => {
      if (typeof checked !== 'undefined' && !onChangeChecked) return value
      onChangeChecked && onChangeChecked(!value)
      return !value
    })
  }, [checked, onChangeChecked])

  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={handleCheckChange}
      style={StyleSheet.compose(StyleSheet.compose(styles.buttton, isChecked && styles.buttonChecked), style)}>
      <Image
        source={require('./check-small.png')}
        style={StyleSheet.compose(styles.indicator, isChecked && styles.indicatorChecked)} />
    </TouchableOpacity>
  )
}

export default Checkbox
