import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

import { surfacesLightSurface3, surfacesLightSurface3Alpha, sysLightOnPrimaryContainer } from '../../../styles/colors'

import { NavigationProps } from '../../../navigation'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height - 32 - 8 - 32,
    paddingHorizontal: 16,
  },
  topBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  topBarBackButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  topBarBackButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  topBarPageTitle: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    marginEnd: 32,
    textAlign: 'center',
  },
  itemButtonContainer: {
    backgroundColor: surfacesLightSurface3,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: surfacesLightSurface3Alpha,
    borderRadius: 12,
    padding: 16,
  },
  itemQuestionContainer: {
    flexDirection: 'row',
  },
  itemQuestion: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginEnd: 16,
  },
  toggleIcon: {
    height: 24,
    objectFit: 'contain',
    transform: [{ rotate: '-90deg' }],
    width: 24,
  },
  toggleIconOpen: {
    transform: [{ rotate: '90deg' }],
  },
  itemAnswer: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Homepay?',
    answer: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  },
  {
    question: 'How does Homepay Work?',
    answer: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  },
  {
    question: 'How is my money secured?',
    answer: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  },
  {
    question: 'What if my works are not done correctly?',
    answer: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  },
  {
    question: 'What if the Interior Design Company I engage disputes my claims?',
    answer: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  },
]

const SettingsFAQ: FC<NavigationProps<'SettingsFAQ'>> = ({ navigation }) => {
  const [openIndexes, setOpenIndexes] = useState([0])

  const handleToggleItem = useCallback((index: number) => {
    setOpenIndexes(value => {
      if (value.includes(index)) return value.filter(i => (i !== index))
      return [...value, index]
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          activeOpacity={.5}
          onPress={() => navigation.goBack()}
          style={styles.topBarBackButton}>
          <Image
            source={require('./arrow-back-ios-new.png')}
            style={styles.topBarBackButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.topBarPageTitle}>
          FAQ
        </Text>
      </View>
      <View style={styles.container}>
        {faqItems.map(({ question, answer }, i) => {
          const isOpen = openIndexes.includes(i)

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={.5}
              onPress={() => handleToggleItem(i)}
              style={styles.itemButtonContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.itemQuestionContainer}>
                  <Text style={styles.itemQuestion}>
                    {question}
                  </Text>
                  <Image
                    source={require('./arrow-back-ios-new.png')}
                    style={StyleSheet.compose(styles.toggleIcon, isOpen && styles.toggleIconOpen)} />
                </View>
                {isOpen && (
                  <Text style={styles.itemAnswer}>
                    {answer}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default SettingsFAQ
