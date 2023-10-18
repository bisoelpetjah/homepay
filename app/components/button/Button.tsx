import React, { FC } from 'react'
import { StyleSheet, StyleProp, TextStyle, TouchableHighlight, Text, GestureResponderEvent } from 'react-native'

import { sysLightPrimary, sysLightOnPrimary, sysLightSecondaryContainer, sysLightOnSecondaryContainer, sysLightOutline } from '../../styles/colors'

interface ButtonProps {
  children: string
  role?: 'primary' | 'secondary'
  outlined?: boolean
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    height: 40,
  },
  primary: {
    backgroundColor: sysLightPrimary,
  },
  secondary: {
    backgroundColor: sysLightSecondaryContainer,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: sysLightOutline,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  primaryText: {
    color: sysLightOnPrimary,
  },
  secondaryText: {
    color: sysLightOnSecondaryContainer,
  },
  primaryTextOutlined: {
    color: sysLightPrimary,
  },
  secondaryTextOutlined: {
    color: sysLightSecondaryContainer,
  },
})

const Button: FC<ButtonProps> = ({ children, role = 'primary', outlined = false, onPress, style }) => (
  <TouchableHighlight
    onPress={onPress}
    style={StyleSheet.compose(StyleSheet.compose(StyleSheet.compose(styles.button, styles[role]), outlined ? styles.outlined : {}), style)}>
    <Text style={StyleSheet.compose(StyleSheet.compose(styles.text, styles[`${role}Text`]), outlined ? styles[`${role}TextOutlined`] : {})}>
      {children}
    </Text>
  </TouchableHighlight>
)

export default Button
