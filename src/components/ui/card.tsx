import type { HTMLAttributes } from 'react'
import { cn } from './utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('surface-card', className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card-header', className)} {...props} />
}