import React, { FC, useState, useCallback } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, ImageSourcePropType } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import Button from '../../components/button/Button'

import { NavigationProps } from '../../navigation'

import { surfacesLightSurface3Alpha, sysLightPrimary, sysLightSurfaceContainerHighest } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: surfacesLightSurface3Alpha,
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  carouselIndicatorContainer: {
    paddingBottom: 72,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  carouselIndicator: {
    marginEnd: 12,
  },
  carouselIndicatorLast: {
    marginEnd: 0,
  },
  carouselActiveIndicator: {
    backgroundColor: sysLightSurfaceContainerHighest,
    borderRadius: 20,
    flex: 1,
    height: 4,
  },
  carouselActiveIndicatorChild: {
    backgroundColor: sysLightPrimary,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    height: 4,
    width: 6,
  },
  carouselInactiveIndicator: {
    backgroundColor: sysLightSurfaceContainerHighest,
    borderRadius: 20,
    flex: 1,
    height: 4,
  },
  carouselInactiveIndicatorBefore: {
    backgroundColor: sysLightPrimary,
  },
  carouselItemContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  carouselItemText: {
    color: sysLightPrimary,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  icon: {
    height: '40%',
    flex: 1,
    objectFit: 'contain',
    width: '40%',
  },
  actionContainer: {
    marginBottom: 100,
    marginHorizontal: 16,
  },
  actionFirstButton: {
    marginBottom: 8,
  },
})

interface CarouselIndicatorProps {
  index?: number
  activeIndex: number
}

const CarouselActiveIndicator: FC<CarouselIndicatorProps> = ({ index }) => (
  <View style={StyleSheet.compose(StyleSheet.compose(styles.carouselIndicator, index === (carouselData.length - 1) ? styles.carouselIndicatorLast : {}), styles.carouselActiveIndicator)}>
    <View style={styles.carouselActiveIndicatorChild} />
  </View>
)

const CarouselInactiveIndicator: FC<CarouselIndicatorProps> = ({ index = 0, activeIndex }) => (
  <View style={StyleSheet.compose(StyleSheet.compose(StyleSheet.compose(styles.carouselIndicator, index === (carouselData.length - 1) ? styles.carouselIndicatorLast : {}), styles.carouselInactiveIndicator), index < activeIndex ? styles.carouselInactiveIndicatorBefore : {})} />
)

interface CarouselItem {
  icon: ImageSourcePropType
  text: string
}

const carouselData: CarouselItem[] = [
  {
    icon: require('./wallet.png'),
    text: 'HomePay is partnered with DBS hold in trust to ensure your money in escrow is kept safe!',
  },
  {
    icon: require('./engineer.png'),
    text: 'All Interior Designers are made to ensure deliverables so that you can approve the work!',
  },
  {
    icon: require('./boss.png'),
    text: 'If issues arise with your renovation, HomePay will provide another vendor at no extra cost!',
  },
]

const renderCarouselItem = (item: { item: CarouselItem, index: number }) => (
  <View style={styles.carouselItemContainer}>
    <Image
      source={item.item.icon}
      style={styles.icon} />
    <Text style={styles.carouselItemText}>
      {item.item.text}
    </Text>
  </View>
)

const Start: FC<NavigationProps<'Start'>> = ({ route, navigation }) => {
  const [activeCarouselItemIndex, setActiveCarouselItemIndex] = useState(0)

  const handleLogin = useCallback(() => {
    navigation.push('Login', { role: route.params.role })
  }, [])

  const handleSignup = useCallback(() => {
    navigation.push('Signup', { role: route.params.role })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={activeCarouselItemIndex}
          containerStyle={styles.carouselIndicatorContainer}
          dotElement={<CarouselActiveIndicator activeIndex={activeCarouselItemIndex} />}
          inactiveDotElement={<CarouselInactiveIndicator activeIndex={activeCarouselItemIndex} />} />
        <Carousel
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          scrollEnabled={false}
          loop
          autoplay
          inactiveSlideScale={1}
          onSnapToItem={setActiveCarouselItemIndex} />
      </View>
      <View style={styles.actionContainer}>
        <Button
          onPress={handleLogin}
          style={styles.actionFirstButton}>
          Log In
        </Button>
        <Button
          outlined
          onPress={handleSignup}>
          Sign Up
        </Button>
      </View>
    </View>
  )
}

export default Start
