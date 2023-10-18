import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, StyleProp, TextStyle } from 'react-native'

import { sysLightPrimary, sysLightOnPrimary, sysLightOutline, sysLightSurfaceVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  button: {
    backgroundColor: sysLightSurfaceVariant,
    borderColor: sysLightOutline,
    borderRadius: 16,
    borderWidth: 2,
    height: 32,
    width: 52,
  },
  buttonSelected: {
    alignItems: 'flex-end',
    backgroundColor: sysLightPrimary,
    borderColor: sysLightPrimary,
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: sysLightOutline,
    borderRadius: 9,
    height: 18,
    margin: 5,
    width: 18,
  },
  indicatorSelected: {
    backgroundColor: sysLightOnPrimary,
    borderRadius: 12,
    height: 24,
    margin: 2,
    width: 24,
  },
})

interface SwitchProps {
  selected?: boolean
  onChangeSelected?: (selected: boolean) => void
  style?: StyleProp<TextStyle>
}

const Switch: FC<SwitchProps> = ({ selected, onChangeSelected, style }) => {
  const [isSelected, setSelected] = useState(selected || false)

  useEffect(() => {
    if (typeof selected === 'undefined') return
    setSelected(selected)
  }, [selected])

  const handleSelectChange = useCallback(() => {
    setSelected(value => {
      if (typeof selected !== 'undefined' && !onChangeSelected) return value
      onChangeSelected && onChangeSelected(!value)
      return !value
    })
  }, [selected, onChangeSelected])

  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={handleSelectChange}
      style={StyleSheet.compose(StyleSheet.compose(styles.button, isSelected ? styles.buttonSelected : {}), style)}>
      <View style={StyleSheet.compose(styles.indicator, isSelected ? styles.indicatorSelected : {})} />
    </TouchableOpacity>
  )
}

export default Switch
