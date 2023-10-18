import React, { FC } from 'react'
import { StyleSheet, StyleProp, TextStyle, TouchableHighlight, TouchableHighlightProps, Text, GestureResponderEvent } from 'react-native'

import { sysLightPrimary, sysLightOnPrimary, sysLightSecondaryContainer, sysLightOnSecondaryContainer, sysLightOutline } from '../../styles/colors'

interface ButtonBaseProps {
  children: string
  role?: 'primary' | 'secondary'
  outlined?: boolean
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 24,
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
  disabled: {
    opacity: .6,
  },
})

type ButtonProps = ButtonBaseProps & Omit<TouchableHighlightProps, keyof ButtonBaseProps>

const Button: FC<ButtonProps> = ({ children, role = 'primary', outlined = false, disabled = false, style, ...props }) => (
  <TouchableHighlight
    disabled={disabled}
    style={StyleSheet.compose(StyleSheet.compose(StyleSheet.compose(StyleSheet.compose(styles.button, styles[role]), outlined ? styles.outlined : {}), disabled ? styles.disabled : {}), style)}
    {...props}>
    <Text style={StyleSheet.compose(StyleSheet.compose(styles.text, styles[`${role}Text`]), outlined ? styles[`${role}TextOutlined`] : {})}>
      {children}
    </Text>
  </TouchableHighlight>
)

export default Button
