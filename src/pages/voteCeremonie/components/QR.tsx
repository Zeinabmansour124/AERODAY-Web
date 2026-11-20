import { useMemo } from 'react'
import { qrcodegen } from '../../../utils/qrcodegen'

export default function QR({ value, size }: { value: string; size?: number }) {
  const { path, dim } = useMemo(() => {
    const qr = qrcodegen.QrCode.encodeText(value, qrcodegen.QrCode.Ecc.MEDIUM)
    const border = 2
    const parts: string[] = []
    for (let y = 0; y < qr.size; y++) {
      let x = 0
      while (x < qr.size) {
        if (qr.getModule(x, y)) {
          let w = 1
          while (x + w < qr.size && qr.getModule(x + w, y)) w++
          parts.push(`M${x + border},${y + border}h${w}v1h-${w}z`)
          x += w
        } else {
          x++
        }
      }
    }
    return { path: parts.join(''), dim: qr.size + border * 2 }
  }, [value])

  return (
    <svg
      viewBox={`0 0 ${dim} ${dim}`}
      width={size}
      height={size}
      className="qr-svg"
      shapeRendering="crispEdges"
    >
      <rect width="100%" height="100%" fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
  )
}