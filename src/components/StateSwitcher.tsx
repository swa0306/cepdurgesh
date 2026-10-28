import { useSyncExternalStore } from 'react'
import { getPreviewState, setPreviewState, subscribePreviewState } from '../api/previewState'
import type { PreviewDataState } from '../api/types'

const states: { value: PreviewDataState; label: string }[] = [
  { value: 'data', label: 'Data' },
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'error', label: 'Error' },
]

export function StateSwitcher() {
  const state = useSyncExternalStore(subscribePreviewState, getPreviewState, () => 'data')
  if (!import.meta.env.DEV) return null
  return (
    <div className="state-switcher" aria-label="Preview data state">
      <span>Preview</span>
      {states.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={state === option.value}
          onClick={() => setPreviewState(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}