import { qrcodegen } from './qrcodegen'

// A4 à 300 dpi
const W = 2480
const H = 3508
const CM = 118.11 // pixels par cm à 300 dpi
const COLS = 4
const ROWS = 6

export const PER_SHEET = COLS * ROWS // 24

export function makeSheet(items: { url: string; label: string }[]): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, W, H)

  const cellW = 4 * CM
  const cellH = 4.5 * CM
  const qrPx = 3 * CM
  const startX = (W - cellW * COLS) / 2
  const startY = (H - cellH * ROWS) / 2

  items.slice(0, PER_SHEET).forEach((it, idx) => {
    const col = idx % COLS
    const row = Math.floor(idx / COLS)
    const cx = startX + col * cellW
    const cy = startY + row * cellH

    // pointillés de découpe
    ctx.strokeStyle = '#999'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.strokeRect(cx, cy, cellW, cellH)
    ctx.setLineDash([])

    // QR (bordure blanche de 2 modules comprise dans les 3 cm)
    const qr = qrcodegen.QrCode.encodeText(it.url, qrcodegen.QrCode.Ecc.MEDIUM)
    const border = 2
    const total = qr.size + border * 2
    const m = qrPx / total
    const ox = cx + (cellW - qrPx) / 2
    const oy = cy + (cellH - qrPx) / 2 - 0.2 * CM

    ctx.fillStyle = '#000'
    for (let y = 0; y < qr.size; y++) {
      let x = 0
      while (x < qr.size) {
        if (qr.getModule(x, y)) {
          let w = 1
          while (x + w < qr.size && qr.getModule(x + w, y)) w++
          const x0 = Math.round(ox + (x + border) * m)
          const x1 = Math.round(ox + (x + border + w) * m)
          const y0 = Math.round(oy + (y + border) * m)
          const y1 = Math.round(oy + (y + border + 1) * m)
          ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
          x += w
        } else {
          x++
        }
      }
    }

    // code court sous le QR
    ctx.fillStyle = '#000'
    ctx.font = '28px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(it.label, cx + cellW / 2, oy + qrPx + 0.45 * CM)
  })

  return new Promise((resolve, reject) =>
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Image non générée'))), 'image/png'),
  )
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}