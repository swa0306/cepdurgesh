import { useEffect, useRef, useState, type DragEvent } from 'react'
import { AlertTriangle, Check, ImagePlus, RotateCcw, ShieldAlert, Sparkles, Upload } from 'lucide-react'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { validateImage } from '../lib/validation'

export function ClassifyPage() {
  const [file, setFile] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [fileError, setFileError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function chooseFile(next?: File) {
    setFileError('')
    if (!next) return
    const error = validateImage(next)
    if (error) {
      setFile(undefined)
      setFileError(error)
      return
    }
    setFile(next)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    chooseFile(event.dataTransfer.files[0])
  }

  return (
    <div className="page-stack">
      <PageIntro eyebrow="Image inspection" title="Classify waste" description="Add a photo to inspect it. Classification stays disabled until a real model service is configured." icon={<Sparkles size={20} />} />
      <div className="classify-layout">
        <div className="classify-primary">
          <Card className="upload-card">
            <div className="card-title-row"><div><p className="eyebrow">Image input</p><h2>Choose a waste image</h2></div><span className="step-marker">01 <span>/ 02</span></span></div>
            <div className={`upload-zone ${file ? 'upload-zone-filled' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
              {previewUrl ? <img className="upload-preview" src={previewUrl} alt={`Selected image: ${file?.name ?? 'uploaded waste'}`} /> : <span className="upload-symbol"><ImagePlus size={27} /></span>}
              {file ? <><strong>{file.name}</strong><small>{(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for preview</small></> : <><strong>Drop an image here</strong><small>or choose a file from your device</small></>}
              <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose an image to inspect" onChange={(event) => chooseFile(event.currentTarget.files?.[0])} />
              <Button variant="secondary" type="button" onClick={() => inputRef.current?.click()}><Upload size={15} /> Choose image</Button>
              <span className="upload-rules">JPEG, PNG, or WebP <i>·</i> up to 10 MB</span>
            </div>
            {fileError && <p className="field-error upload-error" role="alert">{fileError}</p>}
            {file && <div className="upload-file-actions"><span><Check size={15} /> Image validated locally</span><Button variant="quiet" size="sm" type="button" onClick={() => { setFile(undefined); if (inputRef.current) inputRef.current.value = '' }}><RotateCcw size={14} /> Remove image</Button></div>}
          </Card>
          <Card className="model-card">
            <div className="model-card-icon"><AlertTriangle size={18} /></div>
            <div className="model-status-copy"><div className="status-heading"><h2>Model unavailable</h2><span className="status-label">NOT CONFIGURED</span></div><p>No model endpoint is configured for this project. No category, prediction, or confidence score will be generated.</p></div>
            <Button type="button" disabled><Sparkles size={15} /> Classify image</Button>
          </Card>
        </div>
        <aside className="classify-aside">
          <Card className="aside-card"><p className="eyebrow">What happens next</p><div className="process-step"><span>1</span><div><strong>Preview the image</strong><p>Confirm the right photo was selected.</p></div></div><div className="process-step process-disabled"><span>2</span><div><strong>Wait for service setup</strong><p>Classification can be enabled when a reviewed model endpoint is connected.</p></div></div></Card>
          <Card className="safety-card"><ShieldAlert size={20} /><div><h3>Safety comes first</h3><p>For hazardous, biomedical, chemical, sanitary, electronic, or unidentified dangerous waste, do not rely on this tool. Follow qualified local guidance.</p></div></Card>
          <p className="privacy-caption">Image stays in this browser preview and is not uploaded.</p>
        </aside>
      </div>
    </div>
  )
}