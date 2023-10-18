import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, StyleProp, TextStyle, View, TextInput, TextInputProps, TouchableHighlight, Image } from 'react-native'

import { sysLightOnSurfaceVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    borderColor: sysLightOnSurfaceVariant,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    height: 56,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  visibilityToggleButton: {
    position: 'absolute',
    right: 8,
    top: 16,
  },
  visibilityToggleButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  }
})

interface InputBaseProps {
  password?: boolean
  showPasswordVisibilityToggle?: boolean
  inputStyle?: StyleProp<TextStyle>
}

type InputProps = InputBaseProps & Omit<TextInputProps, 'secureTextEntry'>

const Input: FC<InputProps> = ({ password = false, showPasswordVisibilityToggle = false, style, inputStyle, ...props }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = useCallback(() => {
    setPasswordVisible(value => !value)
  }, [])

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      <TextInput
        secureTextEntry={password && !isPasswordVisible}
        style={StyleSheet.compose(styles.input, inputStyle)}
        {...props}>
      </TextInput>
      {password && showPasswordVisibilityToggle && (
        <TouchableHighlight
          onPress={handleTogglePasswordVisibility}
          style={styles.visibilityToggleButton}>
          <Image
            source={require('./remove-red-eye.png')}
            style={styles.visibilityToggleButtonIcon} />
        </TouchableHighlight>
      )}
    </View>
  )
}

export default Input
