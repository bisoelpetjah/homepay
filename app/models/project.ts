import { ImageSourcePropType } from 'react-native'

export interface ProjectTranche {
  name: string
  description: string
  progress: string
  paymentAmount: string
  attachmentImage?: ImageSourcePropType
}

interface Project {
  name: string
  tranches: ProjectTranche[]
  currentTrancheName: string
  escrowWalletAmount: string
}

export default Project
