import React, { FC, Fragment, useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'

import Loading from '../../components/loading/Loading'
import Switch from '../../components/switch/Switch'

import User from '../../models/user'
import SubAccount from '../../models/subAccount'

import { getCurrentUser, setCurrentUser as setUser } from '../../services/user'

import { sysLightPrimary, sysLightOnPrimary, sysLightOnPrimaryContainer, sysLightSecondary, sysLightSecondary99, sysLightOutlineVariant, sysLightSurfaceVariant } from '../../styles/colors'

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 16,
  },
  topBannerBackground: {
    backgroundColor: sysLightPrimary,
    height: 312,
    position: 'absolute',
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 28,
  },
  notificationsButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  notificationsButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  titleContainer: {
    flex: 1,
  },
  role: {
    color: sysLightOnPrimary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginHorizontal: 8,
  },
  nameContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  name: {
    color: sysLightOnPrimary,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginHorizontal: 8,
    marginTop: 4,
  },
  id: {
    color: sysLightOnPrimary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  balanceCardContainer: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingVertical: 16,
  },
  balanceTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  balance: {
    color: sysLightOnPrimaryContainer,
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    textAlign: 'center',
  },
  balanceCurrency: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
  },
  balanceDetailsContainer: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    marginBottom: 24,
    marginTop: 36,
    paddingVertical: 8,
  },
  balanceDetailContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  balanceDetailItemContainer: {
    flex: 1,
    paddingStart: 16,
  },
  balanceDetailLabel: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  balanceDetailAmount: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  balanceDetailItemActionContainer: {
    flex: 1,
  },
  balanceDetailActionButtonContainer: {
    alignItems: 'center',
    padding: 8,
  },
  balanceDetailActionButtonIcon: {
    height: 32,
    width: 32,
  },
  balanceDetailActionButtonText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  balanceDetailDivider: {
    backgroundColor: sysLightSurfaceVariant,
    height: 40,
    width: 1,
  },
  projectApprovalTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  projectApprovalEmpty: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionDivider: {
    backgroundColor: sysLightOutlineVariant,
    height: 1,
  },
  actionButton: {
    marginVertical: 8,
  },
  actionButtonFirst: {
    marginTop: 16,
  },
  actionButtonLast: {
    marginBottom: 16,
  },
  actionButtonContainer: {
    backgroundColor: sysLightOnPrimary,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
  },
  actionButtonTextContainer: {
    backgroundColor: sysLightOnPrimary,
    borderRadius: 12,
    padding: 16,
  },
  actionButtonText: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  actionButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  subAccountsContainer: {
    backgroundColor: sysLightOnPrimary,
    borderRadius: 10,
    marginVertical: 16,
    padding: 16,
  },
  subAccountsTitleContainer: {
    flexDirection: 'row',
  },
  subAccountsTitle: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  subAccountsTitleAddButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  subAccountsTitleAddButtonIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  subAccountsTitleToggleButton: {
    height: 32,
    padding: 4,
    width: 32,
  },
  subAccountsTitleToggleButtonOpen: {
    transform: [{ rotate: '180deg' }],
  },
  subAccountsTitleToggleButtonIcon: {
    height: 24,
    objectFit: 'contain',
    transform: [{ rotate: '90deg' }],
    width: 24,
  },
  subAccountItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  subAccountItemName: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
})

const DashboardInteriorDesignFirm: FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isSubAccountOpen, setSubAccountOpen] = useState(true)

  useEffect(() => {
    setTimeout(async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }, 1000)
  }, [])

  const handleToggleSubAccountOpen = useCallback(() => {
    setSubAccountOpen(value => !value)
  }, [])

  const handleSubAccountActiveChange = useCallback((i: number, isActive: boolean) => {
    if (!currentUser?.subAccounts) return

    const data = {...currentUser}
    data.subAccounts![i].isActive = isActive

    setCurrentUser(data)

    setUser(data)
  }, [currentUser])

  if (!currentUser) return <Loading />

  return (
    <ScrollView>
      <View style={styles.topBannerBackground} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.role}>
              Interior Designer
            </Text>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {currentUser.name}
              </Text>
              <Text style={styles.id}>
                #1234
              </Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => {}}
            style={styles.notificationsButton}>
            <Image
              source={require('./notifications.png')}
              style={styles.notificationsButtonIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceCardContainer}>
            <Text style={styles.balanceTitle}>
              Whole Wallet
            </Text>
            <Text style={styles.balance}>
              $20,000
            </Text>
            <Text style={styles.balanceCurrency}>
              Singapore Dollar (SGD)
            </Text>
          </View>
        </View>
        <View style={styles.balanceDetailsContainer}>
          <View style={styles.balanceDetailContainer}>
            <View style={styles.balanceDetailItemContainer}>
              <Text style={styles.balanceDetailLabel}>
                Received
              </Text>
              <Text style={styles.balanceDetailAmount}>
                $50,000
              </Text>
            </View>
            <View style={styles.balanceDetailDivider} />
            <View style={styles.balanceDetailItemContainer}>
              <Text style={styles.balanceDetailLabel}>
                In Escrow
              </Text>
              <Text style={styles.balanceDetailAmount}>
                $50,000
              </Text>
            </View>
            <View style={styles.balanceDetailDivider} />
            <View style={styles.balanceDetailItemActionContainer}>
              <TouchableHighlight onPress={() => {}}>
                <View style={styles.balanceDetailActionButtonContainer}>
                  <Image
                    source={require('./send-money.png')}
                    style={styles.balanceDetailActionButtonIcon} />
                  <Text style={styles.balanceDetailActionButtonText}>
                    Transfer Money
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <Text style={styles.projectApprovalTitle}>
          Project Approval Alert
        </Text>
        <Text style={styles.projectApprovalEmpty}>
          No projects to approve at the moment
        </Text>
        <View style={styles.sectionDivider} />
        <TouchableHighlight
          onPress={() => {}}
          style={StyleSheet.compose(styles.actionButton, styles.actionButtonFirst)}>
          <View style={styles.actionButtonContainer}>
            <Text style={styles.actionButtonText}>
              Create a new project
            </Text>
            <Image
              source={require('./add.png')}
              style={styles.actionButtonIcon} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {}}
          style={styles.actionButton}>
          <View style={styles.actionButtonContainer}>
            <Text style={styles.actionButtonText}>
              View Reject Requests
            </Text>
            <Image
              source={require('./arrow-forward-ios.png')}
              style={styles.actionButtonIcon} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {}}
          style={StyleSheet.compose(styles.actionButton, styles.actionButtonLast)}>
          <View style={styles.actionButtonContainer}>
            <Text style={styles.actionButtonText}>
              View All Projects
            </Text>
            <Image
              source={require('./arrow-forward-ios.png')}
              style={styles.actionButtonIcon} />
          </View>
        </TouchableHighlight>
        <View style={styles.sectionDivider} />
        <View style={styles.subAccountsContainer}>
          <View style={styles.subAccountsTitleContainer}>
            <Text style={styles.subAccountsTitle}>
              Sub-Accounts
            </Text>
            <TouchableHighlight
              onPress={() => {}}
              style={styles.subAccountsTitleAddButton}>
              <Image
                source={require('./add.png')}
                style={styles.subAccountsTitleAddButtonIcon} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleToggleSubAccountOpen}
              style={StyleSheet.compose(styles.subAccountsTitleToggleButton, isSubAccountOpen ? styles.subAccountsTitleToggleButtonOpen : {})}>
              <Image
                source={require('./arrow-forward-ios.png')}
                style={styles.subAccountsTitleToggleButtonIcon} />
            </TouchableHighlight>
          </View>
          {isSubAccountOpen && currentUser.subAccounts?.map(({ name, isActive }, i) => (
            <Fragment key={i}>
              <View style={styles.subAccountItemContainer}>
                <Text style={styles.subAccountItemName}>
                  {name}
                </Text>
                <Switch
                  selected={isActive}
                  onChangeSelected={value => handleSubAccountActiveChange(i, value)} />
              </View>
              {i !== (currentUser.subAccounts!.length - 1) && (
                <View style={styles.sectionDivider} />
              )}
            </Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default DashboardInteriorDesignFirm
