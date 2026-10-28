import { AlertTriangle, BatteryWarning, BookOpenText, Check, GlassWater, Leaf, Recycle } from 'lucide-react'
import { PageIntro } from '../components/PageIntro'
import { Card } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const guidance = [
  { title: 'Clean corrugated cardboard', icon: BookOpenText, action: 'Keep dry and flatten where accepted.', caveat: 'Confirm local collection rules.' },
  { title: 'Empty aluminum drink can', icon: Recycle, action: 'Empty and rinse if required locally.', caveat: 'Check campus bin labels.' },
  { title: 'Glass food jar', icon: GlassWater, action: 'Empty; check lid and glass acceptance rules.', caveat: 'Local systems differ.' },
  { title: 'Food scraps', icon: Leaf, action: 'Use a designated organics stream where available.', caveat: 'Do not assume compost acceptance.' },
]

export function AwarenessPage() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Practical sorting notes" title="Awareness center" description="General guidance for common materials. Local collection rules always take precedence." icon={<BookOpenText size={20} />} />
      <Tabs defaultValue="everyday" className="awareness-tabs">
        <TabsList aria-label="Guidance category">
          <TabsTrigger value="everyday"><Recycle size={15} /> Everyday materials</TabsTrigger>
          <TabsTrigger value="special"><BatteryWarning size={15} /> Special handling</TabsTrigger>
        </TabsList>
        <TabsContent value="everyday">
          <div className="guidance-grid">
            {guidance.map(({ title, icon: Icon, action, caveat }, index) => <Card className="guidance-card" key={title} style={{ animationDelay: `${index * 65}ms` }}><div className="guidance-card-top"><span className="guidance-icon"><Icon size={19} /></span><span className="guidance-index">0{index + 1}</span></div><h2>{title}</h2><p>{action}</p><div className="guidance-caveat"><span><Check size={13} /></span>{caveat}</div></Card>)}
          </div>
          <div className="guidance-footnote"><AlertTriangle size={17} /><p>Packaging and contamination rules vary. When in doubt, check the bin label or your local collection guidance.</p></div>
        </TabsContent>
        <TabsContent value="special">
          <Card className="special-guidance"><span className="special-icon"><BatteryWarning size={24} /></span><div><p className="eyebrow">Keep out of ordinary recycling</p><h2>Batteries and electronic waste</h2><p>Keep these materials separate and use an authorized collection point. Never place batteries or electronic waste in ordinary recycling or general waste streams.</p><p className="special-caveat">Follow campus or municipal hazardous-waste guidance for the correct collection location. This project does not verify local drop-off points.</p></div></Card>
        </TabsContent>
      </Tabs>
      <section className="awareness-safety"><span><AlertTriangle size={17} /></span><p><strong>Unknown or dangerous items:</strong> Do not handle hazardous, biomedical, chemical, sanitary, or unidentified dangerous waste. Follow qualified local guidance.</p></section>
    </div>
  )
}