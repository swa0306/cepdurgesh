import type { ApiClient } from './types'
import { applyPreviewState } from './previewState'

const unavailable = 'This service is not configured yet. No information was submitted or classified.'

export const mockClient: ApiClient = {
  async listCommunityRecords() {
    await applyPreviewState()
    return []
  },
  async submitSurvey(_input) {
    await applyPreviewState()
    throw new Error(`Survey persistence is unavailable. ${unavailable}`)
  },
  async submitIssue(_input) {
    await applyPreviewState()
    throw new Error(`Issue reporting is unavailable. ${unavailable}`)
  },
  async classifyImage(_image) {
    await applyPreviewState()
    throw new Error(`No model endpoint is configured. ${unavailable}`)
  },
}