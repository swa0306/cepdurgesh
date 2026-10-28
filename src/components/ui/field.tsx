import * as Label from '@radix-ui/react-label'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from './utils'

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function Field({ id, label, hint, error, required, children }: FieldProps) {
  return (
    <div className="field">
      <Label.Root className="field-label" htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </Label.Root>
      {children}
      {error ? <p className="field-error" role="alert">{error}</p> : hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  )
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('control', className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('control textarea', className)} {...props} />
}