import { z } from 'zod'

export const surveySchema = z.object({
  categories: z.array(z.string()).min(1, 'Choose at least one category.'),
  frequency: z.string().min(1, 'Choose how often you separate waste.'),
  binsAvailable: z.string().min(1, 'Choose an answer.'),
  foodScraps: z.string().trim().min(2, 'Tell us how food scraps are usually handled.'),
  difficultMaterials: z.string().trim().min(2, 'Name the materials that are hardest to sort.'),
  usedDropoff: z.string().min(1, 'Choose an answer.'),
  improvement: z.string().trim().min(2, 'Share one way to improve segregation.'),
  suggestion: z.string().trim().max(600, 'Keep the suggestion under 600 characters.').optional(),
})

export const issueSchema = z.object({
  category: z.string().min(1, 'Choose an issue category.'),
  location: z.string().trim().min(3, 'Enter a campus or community location.'),
  description: z.string().trim().min(15, 'Add at least 15 characters of detail.').max(1200),
  imageConsent: z.boolean().refine((value) => value, 'Consent is required when attaching an image.'),
})

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export function collectFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form')
    errors[field] ??= issue.message
  }
  return errors
}

export function validateImage(file: File): string | undefined {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return 'Choose a JPEG, PNG, or WebP image.'
  }
  if (file.size > MAX_IMAGE_BYTES) return 'Image must be 10 MB or smaller.'
  if (file.size === 0) return 'The selected image is empty.'
  return undefined
}