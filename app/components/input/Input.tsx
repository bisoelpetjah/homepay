import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, StyleProp, TextStyle, View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native'

import { sysLightOnSurfaceVariant, sysLightError, sysLightSurfaceContainerHighest } from '../../styles/colors'

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
  inputDisabled: {
    backgroundColor: sysLightSurfaceContainerHighest,
    opacity: .4,
  },
  inputError: {
    borderColor: sysLightError,
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
  },
  errorMessage: {
    color: sysLightError,
    fontSize: 12,
  },
})

interface InputBaseProps {
  password?: boolean
  showPasswordVisibilityToggle?: boolean
  disabled?: boolean
  hasError?: boolean
  errorMessage?: string
  inputStyle?: StyleProp<TextStyle>
}

type OmittedTextInputProps = {
  secureTextEntry: string
  editable: boolean
}

type InputProps = InputBaseProps & Omit<TextInputProps, keyof OmittedTextInputProps>

const Input: FC<InputProps> = ({ password = false, showPasswordVisibilityToggle = false, disabled = false, hasError = false, errorMessage, style, inputStyle, ...props }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = useCallback(() => {
    setPasswordVisible(value => !value)
  }, [])

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      <TextInput
        editable={!disabled}
        secureTextEntry={password && !isPasswordVisible}
        style={StyleSheet.compose(StyleSheet.compose(StyleSheet.compose(styles.input, disabled && styles.inputDisabled), (hasError || !!errorMessage) && styles.inputError), inputStyle)}
        {...props}>
      </TextInput>
      {errorMessage && (
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}
      {password && showPasswordVisibilityToggle && (
        <TouchableOpacity
          activeOpacity={.5}
          onPress={handleTogglePasswordVisibility}
          style={styles.visibilityToggleButton}>
          <Image
            source={require('./remove-red-eye.png')}
            style={styles.visibilityToggleButtonIcon} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Input
