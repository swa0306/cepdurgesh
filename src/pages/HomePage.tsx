import { ArrowDownRight, ArrowRight, BookOpenText, Camera, ChartNoAxesCombined, ChevronRight, ClipboardList, MapPin, Recycle, ShieldCheck, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

const workflows = [
  { to: '/classify', title: 'Classify waste', description: 'Inspect an image and check current model availability.', icon: Camera, tag: 'Model unavailable' },
  { to: '/dashboard', title: 'Community dashboard', description: 'View community records when a real data service is connected.', icon: ChartNoAxesCombined, tag: 'No records yet' },
  { to: '/survey', title: 'Community survey', description: 'Share how waste is separated at home or on campus.', icon: ClipboardList, tag: 'Anonymous' },
  { to: '/report', title: 'Report an issue', description: 'Describe a waste or collection concern in your area.', icon: TriangleAlert, tag: 'Service offline' },
]

export function HomePage() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Campus sustainability workspace" title="Make better sorting easier." description="A practical space for waste guidance, campus observations, and community input." icon={<Recycle size={20} />} />

      <section className="home-hero" aria-labelledby="hero-title">
        <img className="hero-photo" src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1500&q=85" alt="Recycling bins arranged for waste separation" />
        <div className="hero-photo-shade" />
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> DYPCOEI · AI &amp; DATA SCIENCE</p>
          <h2 id="hero-title">Small choices.<br />A cleaner campus.</h2>
          <p>Explore sorting guidance, share what works, and help surface issues around Dr. D.Y. Patil College of Engineering &amp; Innovation.</p>
          <div className="hero-actions">
            <Button asChild><Link to="/awareness">Explore sorting guide <ArrowRight size={16} /></Link></Button>
            <Button variant="outline" asChild><Link to="/survey">Take the survey <ChevronRight size={16} /></Link></Button>
          </div>
        </div>
        <div className="hero-caption"><MapPin size={14} /> Varale-Talegaon, Pune <span>·</span> Academic year 2026–2027</div>
      </section>

      <section className="section-block" aria-labelledby="workflows-heading">
        <div className="section-heading">
          <div><p className="eyebrow">Get involved</p><h2 id="workflows-heading">Choose a starting point</h2></div>
          <Link className="text-link" to="/about">About this project <ArrowDownRight size={15} /></Link>
        </div>
        <div className="workflow-grid">
          {workflows.map(({ to, title, description, icon: Icon, tag }, index) => (
            <Link className="workflow-link" to={to} key={to}>
              <Card className="workflow-card" style={{ animationDelay: `${index * 70}ms` }}>
                <span className="workflow-icon"><Icon size={19} /></span>
                <span className="workflow-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="workflow-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <span className="note-icon"><ShieldCheck size={18} /></span>
        <p><strong>Honest by design.</strong> Community records, image classification, and submissions are unavailable until their services are configured. This workspace does not display sample analytics or predictions.</p>
        <Link to="/about" aria-label="Read project limitations"><ArrowRight size={18} /></Link>
      </section>

      <section className="home-bottom-row">
        <div className="project-signature"><BookOpenText size={17} /><span>Student project · Academic year <strong>2026–2027</strong></span></div>
        <span className="team-line">Krishna Sankeshwari <i>+</i> Durgesh Upasani</span>
      </section>
    </div>
  )
}