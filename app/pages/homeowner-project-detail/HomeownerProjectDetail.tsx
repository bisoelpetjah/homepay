import React, { FC } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native'

import { NavigationProps } from '../../navigation'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 16,
  },
})

const HomeownerProjectDetail: FC<NavigationProps<'HomeownerProjectDetail'>> = ({ route }) => {
  const project = route.params.project

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>
          Project detail {project.name}
        </Text>
      </View>
    </ScrollView>
  )
}

export default HomeownerProjectDetail
