import { useEffect, useState } from 'react'
import { AlertCircle, ArrowRight, Inbox, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import type { CommunityRecord } from '../api/types'
import { subscribePreviewState } from '../api/previewState'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

type LoadState = 'loading' | 'error' | 'ready'

export function DashboardPage() {
  const [records, setRecords] = useState<CommunityRecord[]>([])
  const [status, setStatus] = useState<LoadState>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      setStatus('loading')
      setErrorMessage('')
      try {
        const result = await api.listCommunityRecords()
        if (active) {
          setRecords(result)
          setStatus('ready')
        }
      } catch (error) {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : 'Community records could not be loaded.')
          setStatus('error')
        }
      }
    }
    void load()
    const unsubscribe = subscribePreviewState(() => void load())
    return () => { active = false; unsubscribe() }
  }, [requestId])

  return (
    <div className="page-stack">
      <PageIntro eyebrow="Community records" title="Community dashboard" description="A clear view of validated community input, when a real data service is connected." icon={<Inbox size={20} />} />
      <div className="dashboard-toolbar"><div><span className="service-indicator" /><span>Live data source</span><strong>Not configured</strong></div><span className="dashboard-date">No reporting period available</span></div>
      {status === 'loading' && <Card className="dashboard-state loading-state" aria-live="polite"><div className="loading-heading"><span className="skeleton skeleton-icon" /><span className="skeleton skeleton-title" /></div><span className="skeleton skeleton-line" /><span className="skeleton skeleton-line short" /><span className="skeleton skeleton-row" /><span className="skeleton skeleton-row" /></Card>}
      {status === 'error' && <Card className="dashboard-state error-state" role="alert"><span className="state-art error-art"><AlertCircle size={31} /></span><p className="eyebrow">Could not load records</p><h2>Something interrupted the request.</h2><p>{errorMessage}</p><Button variant="outline" onClick={() => setRequestId((value) => value + 1)}><RefreshCw size={15} /> Retry</Button></Card>}
      {status === 'ready' && records.length === 0 && <Card className="dashboard-state empty-state"><span className="state-art"><Inbox size={33} strokeWidth={1.5} /></span><p className="eyebrow">No activity to display</p><h2>No community records available yet</h2><p>There are no connected records. Once a reviewed data service is configured and people submit responses, validated records can appear here.</p><div className="empty-actions"><Button asChild><Link to="/survey">Share a survey response <ArrowRight size={15} /></Link></Button><Button variant="outline" asChild><Link to="/report">Report an issue</Link></Button></div></Card>}
      {status === 'ready' && records.length > 0 && <Card className="records-card"><div className="records-heading"><div><p className="eyebrow">Verified submissions</p><h2>Community activity</h2></div><span>{records.length} records</span></div><div className="records-table-wrap"><table className="records-table"><thead><tr><th>Type</th><th>Location</th><th>Summary</th><th>Received</th></tr></thead><tbody>{records.map((record) => <tr key={record.id}><td>{record.kind === 'survey' ? 'Survey' : 'Issue'}</td><td>{record.location}</td><td>{record.summary}</td><td>{new Date(record.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></Card>}
      <div className="dashboard-footnote"><span className="service-indicator" /><p>Analytics are intentionally hidden until real, permissioned records are available. No totals or example activity are shown.</p></div>
    </div>
  )
}