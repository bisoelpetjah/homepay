import React, { FC, Fragment, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

import Loading from '../../../components/loading/Loading'

import User from '../../../models/user'
import Transaction from '../../../models/transaction'

import { getCurrentUser } from '../../../services/user'

import { NavigationProps } from '../../../navigation'

import { sysLightOnPrimaryContainer, sysLightOutlineVariant } from '../../../styles/colors'

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
  dateText: {
    color: sysLightOnPrimaryContainer,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  dailyTransactionContainer: {
    marginBottom: 16,
  },
  transactionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  transactionLeftContainer: {
    flex: 1,
  },
  transactionText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  divider: {
    backgroundColor: sysLightOutlineVariant,
    height: 1,
  },
})

const transactionHistory: Transaction[] = [
  {
    direction: 'incoming',
    target: 'Wallet',
    amount: '$5,000.00',
    date: '23 May 2023, 12:00PM',
  },
  {
    direction: 'outgoing',
    target: 'Bank Account',
    amount: '$5,000.00',
    date: '23 May 2023, 12:00PM',
  },
  {
    direction: 'outgoing',
    target: 'Bank Account',
    amount: '$5,000.00',
    date: '23 May 2023, 11:00PM',
  },
  {
    direction: 'incoming',
    target: 'Wallet',
    amount: '$5,000.00',
    date: '20 May 2023, 12:00PM',
  },
  {
    direction: 'outgoing',
    target: 'Bank Account',
    amount: '$5,000.00',
    date: '20 May 2023, 12:00PM',
  },
]

interface DailyTransaction {
  date: string
  transactions: Transaction[]
}

const SettingsTransactionHistory: FC<NavigationProps<'SettingsTransactionHistory'>> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setTimeout(async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }, 500)
  }, [])

  const dailyTransactions = transactionHistory.reduce((prev, transaction) => {
    const dateSplit = transaction.date.split(',')
    const day = dateSplit[0]

    let next = [...prev]

    let existingDayIndex = next.findIndex(({ date }) => (date === day))
    if (existingDayIndex === -1) {
      next = [...next, { date: day, transactions: [] }]
      existingDayIndex = next.length - 1
    }

    next[existingDayIndex].transactions = [... next[existingDayIndex].transactions, transaction]

    return next
  }, [] as DailyTransaction[])

  if (!currentUser) return <Loading />

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
          Transaction History
        </Text>
      </View>
      <View style={styles.container}>
        {dailyTransactions.map(({ date, transactions }, i) => (
          <View
            key={i}
            style={styles.dailyTransactionContainer}>
            <Text style={styles.dateText}>
              {date}
            </Text>
            {transactions.map(({ direction, target, date, amount }, i) => (
              <Fragment key={i}>
                <View style={styles.transactionContainer}>
                  <View style={styles.transactionLeftContainer}>
                    <Text style={styles.transactionText}>
                      {direction === 'outgoing' ? 'Transfer Money to ' : 'Add Money into '}
                      {target}
                    </Text>
                    <Text style={styles.transactionText}>
                      {date}
                    </Text>
                  </View>
                  <Text style={styles.transactionText}>
                    {direction === 'outgoing' ? '- ' : '+ '}
                    {amount}
                  </Text>
                </View>
                {(i !== transactions.length - 1) && (
                  <View style={styles.divider} />
                )}
              </Fragment>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default SettingsTransactionHistory
