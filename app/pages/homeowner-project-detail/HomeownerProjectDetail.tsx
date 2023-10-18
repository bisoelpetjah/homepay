import React, { FC } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

import Button from '../../components/button/Button'

import { NavigationProps } from '../../navigation'

import { sysLightOnPrimaryContainer, sysLightSecondary, sysLightSecondary99, sysLightOutlineVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height - 32 - 8 - 24,
    paddingHorizontal: 16,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  topBarActionButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  topBarActionButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  title: {
    color: sysLightOnPrimaryContainer,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 16,
  },
  descriptionTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 8,
  },
  descriptionCard: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  descriptionContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionLabel: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
  },
  descriptionText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    backgroundColor: sysLightOutlineVariant,
    height: 1,
  },
  attachmentImage: {
    borderRadius: 10,
    height: 120,
    marginBottom: 20,
    marginTop: 8,
    objectFit: 'cover',
    width: '100%',
  },
  trancheTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  trancheCard: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  trancheCardNext: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    marginBottom: 16,
    opacity: .3,
    padding: 16,
  },
  trancheDetailTitleContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  trancheDetailTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  trancheDetailStatus: {
    color: sysLightSecondary,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 16,
    marginBottom: 8,
  },
  trancheDetailDesription: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 16,
  },
  trancheDetailProgress: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    lineHeight: 24,
  },
  trancheDetailPaymentContainer: {
    flexDirection: 'row',
  },
  trancheDetailPaymentLabel: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    lineHeight: 24,
    marginEnd: 4,
  },
  trancheDetailPaymentAmount: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  trancheDetailActionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  trancheDetailActionsButtonFirst: {
    flex: 1,
    marginEnd: 16,
  },
  trancheDetailActionsButton: {
    flex: 1,
  },
})

const HomeownerProjectDetail: FC<NavigationProps<'HomeownerProjectDetail'>> = ({ route, navigation }) => {
  const project = route.params.project
  const currentTrancheIndex = project.tranches.findIndex(({ name }) => (name === project.currentTrancheName))
  const currentTranches = project.tranches.slice(0, currentTrancheIndex + 1)
  const nextTranches = project.tranches.slice(currentTrancheIndex + 1)

  return (
    <ScrollView>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.topBarActionButton}>
          <Image
            source={require('./arrow-back-ios-new.png')}
            style={styles.topBarActionButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.topBarActionButton}>
          <Image
            source={require('./history.png')}
            style={styles.topBarActionButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          {project.name}
        </Text>
        <Text style={styles.descriptionTitle}>
          Vendor Description
        </Text>
        <View style={styles.descriptionCard}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Interior Designer
            </Text>
            <Text style={styles.descriptionText}>
              Rendy Steven
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Company
            </Text>
            <Text style={styles.descriptionText}>
              Homeez
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Phone Number
            </Text>
            <Text style={styles.descriptionText}>
              Homeez
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Email
            </Text>
            <Text style={styles.descriptionText}>
              rendy@homeez.com
            </Text>
          </View>
        </View>
        <Text style={styles.descriptionTitle}>
          Property Description
        </Text>
        <View style={styles.descriptionCard}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Property
            </Text>
            <Text style={styles.descriptionText}>
              HDB 3 Room BTO Premium
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Key Collection Date
            </Text>
            <Text style={styles.descriptionText}>
              24 September 2023
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Address
            </Text>
            <Text style={styles.descriptionText}>
              Singapore
            </Text>
          </View>
        </View>
        <Text style={styles.descriptionTitle}>
          Quotation Details
        </Text>
        <View style={styles.descriptionCard}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Quotation
            </Text>
            <Text style={styles.descriptionText}>
              $100,000,000
            </Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.descriptionLabel}>
            Attachment
          </Text>
          <Image
            source={project.attachmentImage!}
            style={styles.attachmentImage} />
        </View>
        <Text style={styles.trancheTitle}>
          Current Tranches
        </Text>
        {currentTranches.map(({ name, description, progress, paymentAmount }, i) => (
          <View
            key={i}
            style={styles.trancheCard}>
            <View style={styles.trancheDetailTitleContainer}>
              <Text style={styles.trancheDetailTitle}>
                {name}
              </Text>
              <Text style={styles.trancheDetailStatus}>
                Awaiting Payment
              </Text>
            </View>
            <Text style={styles.trancheDetailDesription}>
              {description}
            </Text>
            <Text style={styles.trancheDetailProgress}>
              {progress}
            </Text>
            <View style={styles.trancheDetailPaymentContainer}>
              <Text style={styles.trancheDetailPaymentLabel}>
                Payment:
              </Text>
              <Text style={styles.trancheDetailPaymentAmount}>
                {paymentAmount}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.trancheDetailActionsContainer}>
              <Button
                onPress={() => {}}
                style={styles.trancheDetailActionsButtonFirst}>
                Make Payment
              </Button>
              <Button
                role="secondary"
                onPress={() => {}}
                style={styles.trancheDetailActionsButton}>
                View Works
              </Button>
            </View>
          </View>
        ))}
        <Text style={styles.trancheTitle}>
          Next Tranches
        </Text>
        {nextTranches.map(({ name, description, progress, paymentAmount }, i) => (
          <View
            key={i}
            style={styles.trancheCardNext}>
            <View style={styles.trancheDetailTitleContainer}>
              <Text style={styles.trancheDetailTitle}>
                {name}
              </Text>
              <Text style={styles.trancheDetailStatus}>
                Awaiting Payment
              </Text>
            </View>
            <Text style={styles.trancheDetailDesription}>
              {description}
            </Text>
            <Text style={styles.trancheDetailProgress}>
              {progress}
            </Text>
            <View style={styles.trancheDetailPaymentContainer}>
              <Text style={styles.trancheDetailPaymentLabel}>
                Payment:
              </Text>
              <Text style={styles.trancheDetailPaymentAmount}>
                {paymentAmount}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.trancheDetailActionsContainer}>
              <Button
                disabled
                style={styles.trancheDetailActionsButtonFirst}>
                Make Payment
              </Button>
              <Button
                role="secondary"
                disabled
                style={styles.trancheDetailActionsButton}>
                View Works
              </Button>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeownerProjectDetail
