import { useState, useEffect } from 'react'
import './../App.css'

type IntroVideoProps = {
  onFinish?: () => void
  duration?: number
}

export default function IntroVideo({
  onFinish,
  duration = 4000,
}: IntroVideoProps) {
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHidden(true)
      onFinish?.()
    }, duration)
    return () => clearTimeout(timeout)
  }, [duration, onFinish])

  if (hidden) return null

  const handleSkip = (): void => {
    setHidden(true)
    onFinish?.()
  }

  return (
    <div className="intro-overlay" onClick={handleSkip}>
      <video
        src="/src/assets/videos/intro-logo.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleSkip}
        className="intro-video"
      />
      <p className="intro-skip">Cliquez pour passer</p>
    </div>
  )
}