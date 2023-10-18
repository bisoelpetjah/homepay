import { ImageSourcePropType } from 'react-native'

export interface ProjectTranche {
  name: string
  description: string
  progress: string
  paymentAmount: string
}

interface Project {
  name: string
  tranches: ProjectTranche[]
  currentTrancheName: string
  escrowWalletAmount: string
  attachmentImage?: ImageSourcePropType
}

export default Project
