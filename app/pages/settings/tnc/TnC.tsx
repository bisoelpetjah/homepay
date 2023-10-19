import React, { FC, Fragment } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

import { sysLightOnPrimaryContainer } from '../../../styles/colors'

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
  lastUpdateText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionContent: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
})

interface TnCSection {
  title: string
  content: string
}

const tncSections: TnCSection[] = [
  {
    title: 'General Terms',
    content: 'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
  },
  {
    title: 'License',
    content: 'Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  },
  {
    title: 'Definitions of Key Terms',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.\n\nCurabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis.\nSed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.\nAenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh.\nMauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.',
  },
]

const SettingsTnC: FC<NavigationProps<'SettingsTnC'>> = ({ navigation }) => (
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
        Terms and Conditions
      </Text>
    </View>
    <View style={styles.container}>
      {tncSections.map(({ title, content }, i) => (
        <Fragment key={i}>
          <Text style={styles.sectionTitle}>
            {title}
          </Text>
          <Text style={styles.sectionContent}>
            {content}
          </Text>
        </Fragment>
      ))}
    </View>
  </ScrollView>
)

export default SettingsTnC
