import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertTriangle, Check, ImagePlus, MapPin, Paperclip, ShieldCheck, Trash2 } from 'lucide-react'
import { api } from '../api'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Field, Input, Textarea } from '../components/ui/field'
import { collectFieldErrors, issueSchema, validateImage } from '../lib/validation'

const issueTypes = [
  'Mixed or overflowing bin',
  'Missed collection',
  'Unsafe waste',
  'Other',
]

export function ReportPage() {
  const [image, setImage] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [imageError, setImageError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!image) {
      setPreviewUrl(undefined)
      return
    }
    const url = URL.createObjectURL(image)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const next = event.currentTarget.files?.[0]
    setImageError('')
    if (!next) return
    const issue = validateImage(next)
    if (issue) {
      setImage(undefined)
      setImageError(issue)
      event.currentTarget.value = ''
      return
    }
    setImage(next)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setFormError('')
    const form = new FormData(event.currentTarget)
    const parsed = issueSchema.safeParse({
      category: String(form.get('category') ?? ''),
      location: String(form.get('location') ?? ''),
      description: String(form.get('description') ?? ''),
      imageConsent: !image || form.get('imageConsent') === 'on',
    })
    if (!parsed.success) {
      setErrors(collectFieldErrors(parsed.error))
      setFormError('Review the highlighted fields before continuing.')
      return
    }
    setSubmitting(true)
    try {
      await api.submitIssue({ ...parsed.data, ...(image ? { image } : {}) })
      setFormError('Your report was accepted by the configured service.')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Issue reporting is unavailable. Your report was not submitted.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-stack">
      <PageIntro eyebrow="Campus and community" title="Report an issue" description="Describe a waste or collection concern so it can be reviewed when reporting is connected." icon={<AlertTriangle size={20} />} />
      <div className="form-layout report-layout">
        <Card className="form-card report-card">
          <div className="form-card-top"><span className="form-count">ISSUE DETAILS</span><span className="service-tag">Service not connected</span></div>
          <form onSubmit={handleSubmit} noValidate>
            <Field id="category" label="Issue category" error={errors.category} required>
              <select id="category" name="category" className="control select-control" defaultValue="" aria-invalid={Boolean(errors.category)}>
                <option value="" disabled>Select a category</option>
                {issueTypes.map((type) => <option value={type} key={type}>{type}</option>)}
              </select>
            </Field>
            <Field id="location" label="Campus or community location" hint="Use a place description; do not include personal addresses." error={errors.location} required>
              <div className="input-with-icon"><MapPin size={16} /><Input id="location" name="location" placeholder="Building, area, or nearby landmark" aria-invalid={Boolean(errors.location)} /></div>
            </Field>
            <Field id="description" label="What happened?" hint="15–1,200 characters" error={errors.description} required>
              <Textarea id="description" name="description" rows={5} maxLength={1200} placeholder="Share what you observed, when it happened, and any relevant context." aria-invalid={Boolean(errors.description)} />
            </Field>
            <div className="field">
              <label className="field-label" htmlFor="issue-image">Image evidence <span className="optional-label">Optional</span></label>
              <p className="field-hint">JPEG, PNG, or WebP up to 10 MB. Image stays on this device in preview.</p>
              {image ? <div className="evidence-preview">{previewUrl && <img src={previewUrl} alt={`Selected evidence: ${image.name}`} />}<span><strong>{image.name}</strong><small>{(image.size / 1024 / 1024).toFixed(2)} MB</small></span><Button variant="quiet" size="icon" type="button" title="Remove image" aria-label="Remove image" onClick={() => { setImage(undefined); if (inputRef.current) inputRef.current.value = '' }}><Trash2 size={16} /></Button></div> : <button className="evidence-picker" type="button" onClick={() => inputRef.current?.click()}><ImagePlus size={17} /> Attach an image <Paperclip size={14} /></button>}
              <input ref={inputRef} id="issue-image" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} />
              {imageError && <p className="field-error" role="alert">{imageError}</p>}
            </div>
            {image && <label className="consent-option"><input type="checkbox" name="imageConsent" /><span className="checkbox-control"><Check size={12} /></span><span>I consent to sharing this image with the project team if reporting is enabled.</span></label>}
            {errors.imageConsent && <p className="field-error" role="alert">{errors.imageConsent}</p>}
            {formError && <p className="inline-alert" role="alert">{formError}</p>}
            <div className="form-actions"><Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit report'} <AlertTriangle size={15} /></Button><span>No reference number or tracking is available in this preview.</span></div>
          </form>
        </Card>
        <aside className="form-aside"><Card className="safety-card"><ShieldCheck size={20} /><div><h3>Report safely</h3><p>Do not approach or handle hazardous, chemical, biomedical, or unidentified waste. Contact qualified campus staff or local authorities.</p></div></Card><Card className="aside-card report-side"><p className="eyebrow">Before submitting</p><h2>Keep it useful.</h2><ul><li>Describe the visible issue, not assumptions about its cause.</li><li>Use a general location rather than a personal address.</li><li>Only attach an image if it does not put you at risk.</li></ul></Card><div className="form-side-number">02 <span>/ COMMUNITY INPUT</span></div></aside>
      </div>
    </div>
  )
}