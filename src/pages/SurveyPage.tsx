import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, ClipboardList, LockKeyhole } from 'lucide-react'
import { api } from '../api'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Field, Input, Textarea } from '../components/ui/field'
import { collectFieldErrors, surveySchema } from '../lib/validation'

const categories = ['Wet / organic', 'Dry recyclables', 'Paper and cardboard', 'Glass', 'Electronic waste', 'Sanitary waste']
const frequencyOptions = ['Always', 'Often', 'Sometimes', 'Rarely', 'Never']

type Errors = Record<string, string>

function SurveyRadioGroup({ name, options, error }: { name: string; options: string[]; error?: string }) {
  return (
    <div className="choice-list" role="radiogroup" aria-label={name} aria-invalid={Boolean(error)}>
      {options.map((option) => <label className="choice-option" key={option}><input type="radio" name={name} value={option} /><span className="choice-control" /><span>{option}</span></label>)}
    </div>
  )
}

export function SurveyPage() {
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setFormError('')
    const formData = new FormData(event.currentTarget)
    const parsed = surveySchema.safeParse({
      categories: formData.getAll('categories').map(String),
      frequency: String(formData.get('frequency') ?? ''),
      binsAvailable: String(formData.get('binsAvailable') ?? ''),
      foodScraps: String(formData.get('foodScraps') ?? ''),
      difficultMaterials: String(formData.get('difficultMaterials') ?? ''),
      usedDropoff: String(formData.get('usedDropoff') ?? ''),
      improvement: String(formData.get('improvement') ?? ''),
      suggestion: String(formData.get('suggestion') ?? ''),
    })
    if (!parsed.success) {
      setErrors(collectFieldErrors(parsed.error))
      setFormError('Review the highlighted fields before continuing.')
      return
    }
    setSubmitting(true)
    try {
      await api.submitSurvey(parsed.data)
      setFormError('Your response was accepted by the configured service.')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Survey persistence is unavailable. Your response was not submitted.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-stack">
      <PageIntro eyebrow="Anonymous community input" title="Community survey" description="Eight short prompts about the waste-separation options and challenges you see." icon={<ClipboardList size={20} />} />
      <div className="form-layout">
        <Card className="form-card">
          <div className="form-card-top"><span className="form-count">8 questions <i>·</i> about 3 minutes</span><span className="anonymous-label"><LockKeyhole size={13} /> Anonymous</span></div>
          <form onSubmit={handleSubmit} noValidate>
            <fieldset className="question-block">
              <legend><span className="question-number">01</span> Which waste categories do you separate at home or on campus?</legend>
              <p className="field-hint">Select all that apply.</p>
              <div className="checkbox-grid">{categories.map((category) => <label className="checkbox-option" key={category}><input type="checkbox" name="categories" value={category} /><span className="checkbox-control"><CheckCircle2 size={12} /></span>{category}</label>)}</div>
              {errors.categories && <p className="field-error" role="alert">{errors.categories}</p>}
            </fieldset>
            <fieldset className="question-block">
              <legend><span className="question-number">02</span> How often do you separate waste before disposal?</legend>
              <SurveyRadioGroup name="frequency" options={frequencyOptions} error={errors.frequency} />
              {errors.frequency && <p className="field-error" role="alert">{errors.frequency}</p>}
            </fieldset>
            <fieldset className="question-block">
              <legend><span className="question-number">03</span> Are separate wet- and dry-waste bins available where you live or study?</legend>
              <SurveyRadioGroup name="binsAvailable" options={['Yes, both', 'Only one type', 'No', 'Not sure']} error={errors.binsAvailable} />
              {errors.binsAvailable && <p className="field-error" role="alert">{errors.binsAvailable}</p>}
            </fieldset>
            <Field id="foodScraps" label="04 · How are food scraps usually disposed of?" error={errors.foodScraps} required>
              <Textarea id="foodScraps" name="foodScraps" rows={3} maxLength={600} placeholder="For example: separate organics bin, mixed waste, home composting…" aria-invalid={Boolean(errors.foodScraps)} />
            </Field>
            <Field id="difficultMaterials" label="05 · Which materials are hardest for you to sort?" error={errors.difficultMaterials} required>
              <Input id="difficultMaterials" name="difficultMaterials" placeholder="Name one or more materials" aria-invalid={Boolean(errors.difficultMaterials)} />
            </Field>
            <fieldset className="question-block">
              <legend><span className="question-number">06</span> Have you used a campus or community recycling drop-off?</legend>
              <SurveyRadioGroup name="usedDropoff" options={['Yes', 'No', 'Not sure']} error={errors.usedDropoff} />
              {errors.usedDropoff && <p className="field-error" role="alert">{errors.usedDropoff}</p>}
            </fieldset>
            <Field id="improvement" label="07 · What would help improve waste segregation in your community?" error={errors.improvement} required>
              <Textarea id="improvement" name="improvement" rows={3} maxLength={600} placeholder="Share a practical change…" aria-invalid={Boolean(errors.improvement)} />
            </Field>
            <Field id="suggestion" label="08 · What additional suggestion would you like to share?" hint="Optional · up to 600 characters" error={errors.suggestion}>
              <Textarea id="suggestion" name="suggestion" rows={3} maxLength={600} placeholder="Anything else you would like the project team to know?" />
            </Field>
            {formError && <p className={formError.startsWith('Survey persistence') ? 'inline-alert' : 'field-error'} role="alert">{formError}</p>}
            <div className="form-actions"><Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit response'} <ArrowRight size={16} /></Button><span>Submission is disabled until a data service is configured.</span></div>
          </form>
        </Card>
        <aside className="form-aside"><Card className="aside-card"><p className="eyebrow">A small note</p><h2>Your perspective matters.</h2><p>Responses are intended to help a student project understand sorting barriers across campus and nearby communities.</p><div className="aside-divider" /><p className="privacy-caption">No account is required. This preview does not store or transmit your answers.</p></Card><div className="form-side-number">01 <span>/ COMMUNITY INPUT</span></div></aside>
      </div>
    </div>
  )
}