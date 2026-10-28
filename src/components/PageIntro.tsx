import type { ReactNode } from 'react'

type PageIntroProps = { eyebrow: string; title: string; description: string; icon: ReactNode }

export function PageIntro({ eyebrow, title, description, icon }: PageIntroProps) {
  return (
    <div className="page-intro">
      <div className="page-intro-icon" aria-hidden="true">{icon}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
    </div>
  )
}