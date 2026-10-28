import { BookOpenText, Check, Code2, GraduationCap, MapPin, ShieldCheck, UsersRound } from 'lucide-react'
import { PageIntro } from '../components/PageIntro'
import { Card } from '../components/ui/card'

const limitations = [
  'Image classification is not operational: no model endpoint is configured.',
  'Supabase persistence and community analytics are not operational until a real project and policies are configured.',
  'This preview does not store survey or issue submissions, or upload images.',
]

export function AboutPage() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="About this academic project" title="A campus-first approach to circularity." description="A student-built workspace for practical waste guidance and community input, designed with clear limits until real services are available." icon={<BookOpenText size={20} />} />
      <div className="about-layout">
        <div className="about-main">
          <section className="about-copy">
            <p className="eyebrow">The project</p>
            <h2>Make the next right step easier to find.</h2>
            <p>Campus Circularity brings together waste-sorting guidance, a community survey, issue reporting, and an image-classification interface. The aim is to support informed choices, not replace campus procedures or qualified waste-management advice.</p>
          </section>
          <Card className="limitations-card"><div className="section-heading"><div><p className="eyebrow">Current boundaries</p><h2>What is not live yet</h2></div><ShieldCheck size={20} /></div><ul>{limitations.map((item) => <li key={item}><span><Check size={13} /></span>{item}</li>)}</ul></Card>
          <section className="responsible-use"><span><ShieldCheck size={19} /></span><div><strong>Responsible use</strong><p>Do not use the interface to identify or handle hazardous, biomedical, chemical, sanitary, electronic, or unidentified dangerous waste. Follow qualified local guidance.</p></div></section>
        </div>
        <aside className="about-aside">
          <Card className="project-facts"><p className="eyebrow">Project details</p><div className="fact-row"><GraduationCap size={17} /><div><small>Institution</small><strong>Dr. D.Y. Patil College of Engineering &amp; Innovation</strong></div></div><div className="fact-row"><MapPin size={17} /><div><small>Location</small><strong>Varale-Talegaon, Pune</strong></div></div><div className="fact-row"><Code2 size={17} /><div><small>Department</small><strong>Artificial Intelligence and Data Science</strong></div></div><div className="fact-row"><UsersRound size={17} /><div><small>Project team</small><strong>Krishna Sankeshwari<br />Durgesh Upasani</strong></div></div><div className="project-year">ACADEMIC YEAR <strong>2026–2027</strong></div></Card>
          <div className="about-quote"><span>“</span><p>Useful guidance. Clear boundaries. Community voices.</p><small>CAMPUS CIRCULARITY</small></div>
        </aside>
      </div>
    </div>
  )
}