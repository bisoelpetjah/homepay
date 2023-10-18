export type TransactionDirection = 'incoming' | 'outgoing'

interface Transaction {
  direction: TransactionDirection
  target: string
  amount: string
  date: string
}

export default Transaction
