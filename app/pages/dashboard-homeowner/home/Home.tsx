import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import Loading from '../../../components/loading/Loading'
import Button from '../../../components/button/Button'

import User from '../../../models/user'

import Transaction from '../../../models/transaction'
import Project from '../../../models/project'

import { getCurrentUser } from '../../../services/user'

import { NavigationProps } from '../navigation'
import { RootStackParamList } from '../../../navigation'

import { sysLightPrimary, sysLightOnPrimary, sysLightOnPrimaryContainer, sysLightSecondary, sysLightSecondary99, sysLightOutlineVariant, sysLightSurfaceVariant } from '../../../styles/colors'
import { NavigationProp } from '@react-navigation/native'

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
    lineHeight: 16,
    textAlign: 'center',
  },
  transactionContainer: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    marginBottom: 32,
    marginTop: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  transactionActionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  transactionActionContainer: {
    alignItems: 'center',
    flex: 1,
  },
  transactionActionButtonContainer: {
    alignItems: 'center',
    padding: 8,
  },
  transactionActionButtonIcon: {
    height: 32,
    width: 32,
  },
  transactionActionButtonText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    lineHeight: 16,
  },
  transactionActionDivider: {
    backgroundColor: sysLightSurfaceVariant,
    height: 40,
    width: 1,
  },
  transactionListTitle: {
    color: sysLightOnPrimaryContainer,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  transactionItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  transactionItemIcon: {
    height: 28,
    marginEnd: 8,
    width: 28,
  },
  transactionItemTextContainer: {
    flex: 1,
  },
  transactionItemText: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    lineHeight: 16,
  },
  transactionItemAmount: {
    color: sysLightOnPrimaryContainer,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 40,
  },
  transactionListActionContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionListActionText: {
    color: sysLightSecondary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  projectListTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  projectListTitle: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 8,
  },
  projectListTitleAction: {
    height: 32,
    padding: 4,
    width: 32,
  },
  projectListTitleActionIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  projectItemContainer: {
    backgroundColor: sysLightSecondary99,
    borderRadius: 10,
    padding: 16,
  },
  projectItemTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  projectItemTitle: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  projectItemTitleActionIcon: {
    height: 24,
    objectFit: 'contain',
    width: 24,
  },
  projectItemPaymentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  projectItemPaymentInfoContainer: {
    flex: 1,
  },
  projectItemPaymentInfo: {
    color: sysLightOnPrimaryContainer,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  projectItemDivider: {
    backgroundColor: sysLightOutlineVariant,
    height: 1,
  },
  projectItemBalanceContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  projectItemBalanceLabelContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
  },
  projectItemBalanceLabel: {
    color: sysLightOnPrimaryContainer,
    fontSize: 18,
    lineHeight: 24,
    marginEnd: 8,
  },
  projectItemBalanceLabelInfoIcon: {
    height: 20,
    objectFit: 'contain',
    width: 20,
  },
  projectItemBalanceAmount: {
    color: sysLightOnPrimaryContainer,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
})

const transactions: Transaction[] = [
  {
    direction: 'outgoing',
    target: 'Fadhil',
    amount: '$200,000',
    date: '09/25/23',
  },
  {
    direction: 'incoming',
    target: 'DBS',
    amount: '$200,000',
    date: '09/25/23',
  },
]

const projects: Project[] = [
  {
    name: 'Renovation for Stephen’s House',
    tranches: [
      {
        name: 'Tranche 1',
        description: 'Lorem ipsum dolor sit amet consectetur. Risus mi placerat cras dolor augue dolor fringilla. Natoque orci euismod aliquam enim ut. Facilisi sed id turpis tincidunt. Nibh leo fusce fusce tortor nisl suspendisse nec.',
        progress: '20%',
        paymentAmount: '$40,000',
      },
      {
        name: 'Tranche 2',
        description: 'Lorem ipsum dolor sit amet consectetur. Risus mi placerat cras dolor augue dolor fringilla. Natoque orci euismod aliquam enim ut. Facilisi sed id turpis tincidunt. Nibh leo fusce fusce tortor nisl suspendisse nec.',
        progress: '20%',
        paymentAmount: '$40,000',
      },
      {
        name: 'Tranche 3',
        description: 'Lorem ipsum dolor sit amet consectetur. Risus mi placerat cras dolor augue dolor fringilla. Natoque orci euismod aliquam enim ut. Facilisi sed id turpis tincidunt. Nibh leo fusce fusce tortor nisl suspendisse nec.',
        progress: '20%',
        paymentAmount: '$40,000',
      },
    ],
    currentTrancheName: 'Tranche 1',
    escrowWalletAmount: '$20,000',
    attachmentImage: require('./tranche-attachment.jpeg'),
  },
]

const DashboardHomeownerHome: FC<NavigationProps<'DashboardHomeownerHome'>> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isFocused = useIsFocused()

  const handleGetCurrentUser = useCallback(async () => {
    const data = await getCurrentUser()
    setCurrentUser(data)
  }, [])

  useEffect(() => {
    if (isFocused) setTimeout(handleGetCurrentUser, 500)
  }, [isFocused])

  if (!currentUser) return <Loading />

  return (
    <ScrollView>
      <View style={styles.topBannerBackground} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.role}>
              Homeowner
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
          <TouchableOpacity
            activeOpacity={.5}
            onPress={() => {}}
            style={styles.notificationsButton}>
            <Image
              source={require('./notifications.png')}
              style={styles.notificationsButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceCardContainer}>
            <Text style={styles.balanceTitle}>
              Available Balance
            </Text>
            <Text style={styles.balance}>
              $20,000
            </Text>
            <Text style={styles.balanceCurrency}>
              Singapore Dollar (SGD)
            </Text>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <View style={styles.transactionActionsContainer}>
            <View style={styles.transactionActionContainer}>
              <TouchableOpacity
                activeOpacity={.5}
                onPress={() => {}}>
                <View style={styles.transactionActionButtonContainer}>
                  <Image
                    source={require('./briefcase-dollar.png')}
                    style={styles.transactionActionButtonIcon} />
                  <Text style={styles.transactionActionButtonText}>
                    Add Money
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.transactionActionDivider} />
            <View style={styles.transactionActionContainer}>
              <TouchableOpacity
                activeOpacity={.5}
                onPress={() => {}}>
                <View style={styles.transactionActionButtonContainer}>
                  <Image
                    source={require('./send-money.png')}
                    style={styles.transactionActionButtonIcon} />
                  <Text style={styles.transactionActionButtonText}>
                    Transfer Money
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.transactionListTitle}>
            Transactions
          </Text>
          {transactions.map(({ direction, target, amount, date }, i) => (
            <View
              key={i}
              style={styles.transactionItemContainer}>
                {direction === 'outgoing' && (
                  <Image
                    source={require('./money-send.png')}
                    style={styles.transactionItemIcon} />
                )}
                {direction === 'incoming' && (
                  <Image
                    source={require('./money-receive.png')}
                    style={styles.transactionItemIcon} />
                )}
                <View style={styles.transactionItemTextContainer}>
                  <Text style={styles.transactionItemText}>
                    {direction === 'outgoing' && 'Transfer Money to '}
                    {direction === 'incoming' && 'Add Money from '}
                    {target}
                  </Text>
                  <Text style={styles.transactionItemText}>
                    {date}
                  </Text>
                </View>
                <Text style={styles.transactionItemAmount}>
                  {direction === 'outgoing' && '- '}
                  {direction === 'incoming' && '+ '}
                  {amount}
                </Text>
              </View>
          ))}
          <View style={styles.transactionListActionContainer}>
            <TouchableOpacity
              activeOpacity={.5}
              onPress={() => { navigation.getParent<NavigationProp<RootStackParamList>>().navigate('SettingsTransactionHistory') }}>
              <Text style={styles.transactionListActionText}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.projectListTitleContainer}>
          <Text style={styles.projectListTitle}>
            Projects
          </Text>
          <TouchableOpacity
            activeOpacity={.5}
            onPress={() => {}}
            style={styles.projectListTitleAction}>
            <Image
              source={require('./arrow-forward.png')}
              style={styles.projectListTitleActionIcon} />
          </TouchableOpacity>
        </View>
        {projects.map((project, i) => {
          const { name, tranches, currentTrancheName, escrowWalletAmount } = project
          const currentTranche = tranches.find(({ name }) => (name === currentTrancheName))

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={.5}
              onPress={() => { navigation.getParent<NavigationProp<RootStackParamList>>().navigate('HomeownerProjectDetail', { project }) }}>
              <View style={styles.projectItemContainer}>
                <View style={styles.projectItemTitleContainer}>
                  <Text style={styles.projectItemTitle}>
                    {name}
                  </Text>
                  <Image
                    source={require('./arrow-back-ios.png')}
                    style={styles.projectItemTitleActionIcon} />
                </View>
                <View style={styles.projectItemPaymentContainer}>
                  <View style={styles.projectItemPaymentInfoContainer}>
                    <Text style={styles.projectItemPaymentInfo}>
                      Next Payment
                    </Text>
                    <Text style={styles.projectItemPaymentInfo}>
                      {currentTranche?.name}: {currentTranche?.progress}
                    </Text>
                  </View>
                  <Button onPress={() => {}}>
                    Make Payment
                  </Button>
                </View>
                <View style={styles.projectItemDivider} />
                <View style={styles.projectItemBalanceContainer}>
                  <View style={styles.projectItemBalanceLabelContainer}>
                    <Text style={styles.projectItemBalanceLabel}>
                      Escrow Wallet
                    </Text>
                    <TouchableOpacity
                      activeOpacity={.5}
                      onPress={() => {}}>
                      <Image
                        source={require('./info-outline.png')}
                        style={styles.projectItemBalanceLabelInfoIcon} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.projectItemBalanceAmount}>
                    {escrowWalletAmount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default DashboardHomeownerHome
