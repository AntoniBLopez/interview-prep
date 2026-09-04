import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function EffectVsLayoutEffect() {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null)
  const [position, setPosition] = useState(0)

  const x = target?.x ?? 0

  // Con useEffect → el usuario puede ver el tooltip en la posición incorrecta un instante
  useEffect(() => {
    if (!tooltipRef.current) return
    const { width } = tooltipRef.current.getBoundingClientRect()
    setPosition(x - width / 2)
  }, [x])

  // Con useLayoutEffect → el ajuste ocurre antes de pintar → no se ve el salto
  // useLayoutEffect(() => {
  //   if (!tooltipRef.current) return
  //   const { width } = tooltipRef.current.getBoundingClientRect()
  //   setPosition(x - width / 2)
  // }, [x])

  return (
    <div
      className="min-h-screen cursor-crosshair bg-white"
      onClick={(event) => {
        setTarget({ x: event.clientX, y: event.clientY })
        setPosition(event.clientX)
      }}
    >
      {target ? (
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed rounded bg-gray-900 px-3 py-1.5 text-sm text-white"
          style={{ left: position, top: target.y + 12 }}
        >
          Tooltip
        </div>
      ) : null}
    </div>
  )
}
