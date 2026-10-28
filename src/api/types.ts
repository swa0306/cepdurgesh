export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error'

export type CommunityRecord = {
  id: string
  kind: 'survey' | 'issue'
  location: string
  summary: string
  createdAt: string
}

export type SurveySubmission = {
  categories: string[]
  frequency: string
  binsAvailable: string
  foodScraps: string
  difficultMaterials: string
  usedDropoff: string
  improvement: string
  suggestion?: string
}

export type IssueSubmission = {
  category: string
  location: string
  description: string
  image?: File
  imageConsent: boolean
}

export type ApiClient = {
  listCommunityRecords(): Promise<CommunityRecord[]>
  submitSurvey(input: SurveySubmission): Promise<void>
  submitIssue(input: IssueSubmission): Promise<void>
  classifyImage(image: File): Promise<never>
}