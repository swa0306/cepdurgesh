import type { PreviewDataState } from './types'

const allowedStates: PreviewDataState[] = ['data', 'loading', 'empty', 'error']
const listeners = new Set<() => void>()

function fromSearch(): PreviewDataState | undefined {
  const value = new URLSearchParams(window.location.search).get('previewState')
  return allowedStates.find((state) => state === value)
}

function fromStorage(): PreviewDataState | undefined {
  const value = window.localStorage.getItem('previewState')
  return allowedStates.find((state) => state === value)
}

let state: PreviewDataState = import.meta.env.DEV
  ? (fromSearch() ?? fromStorage() ?? 'data')
  : 'data'

export function getPreviewState(): PreviewDataState {
  return import.meta.env.DEV ? state : 'data'
}

export function setPreviewState(next: PreviewDataState): void {
  if (!import.meta.env.DEV) return
  state = next
  window.localStorage.setItem('previewState', next)
  listeners.forEach((listener) => listener())
}

export function subscribePreviewState(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export async function applyPreviewState(): Promise<void> {
  const current = getPreviewState()
  if (current === 'loading') return new Promise<void>(() => undefined)
  if (current === 'error') throw new Error('Preview service request failed. Retry after switching states.')
  if (current === 'empty') return
  await new Promise<void>((resolve) => window.setTimeout(resolve, 180))
}