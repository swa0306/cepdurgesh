import { describe, expect, it } from 'vitest'
import { issueSchema, surveySchema, validateImage } from '../lib/validation'

describe('survey validation', () => {
  it('requires all seven required responses while allowing an optional suggestion', () => {
    expect(surveySchema.safeParse({}).success).toBe(false)
    expect(surveySchema.safeParse({
      categories: ['Wet / organic'],
      frequency: 'Often',
      binsAvailable: 'Yes, both',
      foodScraps: 'Separate organics bin',
      difficultMaterials: 'Plastic film',
      usedDropoff: 'No',
      improvement: 'Clearer bin labels',
      suggestion: '',
    }).success).toBe(true)
  })
})

describe('issue validation', () => {
  it('requires a valid category, place, description, and consent when image evidence is present', () => {
    expect(issueSchema.safeParse({
      category: 'Unsafe waste',
      location: 'North campus entrance',
      description: 'An overflowing bin was observed near the entrance.',
      imageConsent: false,
    }).success).toBe(false)
  })
})

describe('image validation', () => {
  it('accepts supported image types and rejects unsupported, empty, or oversized files', () => {
    expect(validateImage(new File(['image'], 'photo.webp', { type: 'image/webp' }))).toBeUndefined()
    expect(validateImage(new File(['text'], 'notes.txt', { type: 'text/plain' }))).toContain('JPEG, PNG, or WebP')
    expect(validateImage(new File([], 'empty.png', { type: 'image/png' }))).toContain('empty')
    expect(validateImage(new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' }))).toContain('10 MB')
  })
})