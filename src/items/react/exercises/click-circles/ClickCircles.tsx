import { useRef, useState, type MouseEvent } from 'react'

type Circle = {
  id: number
  x: number
  y: number
}

const CIRCLE_RADIUS = 20

/**
 * Objetivo: pintar círculos donde el usuario hace click, con undo y redo.
 *
 * - Click en el canvas → añade un círculo en esa posición
 * - Undo → deshace el último círculo
 * - Redo → restaura el último undo
 */

export function ClickCircles() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  const [circles, setCircles] = useState<Circle[]>([])
  const [past, setPast] = useState<Circle[][]>([])
  const [future, setFuture] = useState<Circle[][]>([])

  function pushHistory(nextCircles: Circle[]) {
    setPast((prev) => [...prev, circles])
    setFuture([])
    setCircles(nextCircles)
  }

  function handleCanvasClick(event: MouseEvent<HTMLDivElement>) {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    pushHistory([...circles, { id: nextId.current++, x, y }])
  }

  function undo() {
    if (past.length === 0) return

    const previous = past[past.length - 1]
    setPast((prev) => prev.slice(0, -1))
    setFuture((prev) => [circles, ...prev])
    setCircles(previous)
  }

  function redo() {
    if (future.length === 0) return

    const [next, ...rest] = future
    setFuture(rest)
    setPast((prev) => [...prev, circles])
    setCircles(next)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500"
          onClick={undo}
          disabled={past.length === 0}
        >
          Undo
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500"
          onClick={redo}
          disabled={future.length === 0}
        >
          Redo
        </button>
      </div>

      <div
        ref={canvasRef}
        role="presentation"
        className="relative h-80 w-full cursor-crosshair overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
        onClick={handleCanvasClick}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="pointer-events-none absolute rounded-full bg-blue-500/70"
            style={{
              width: CIRCLE_RADIUS * 2,
              height: CIRCLE_RADIUS * 2,
              left: circle.x - CIRCLE_RADIUS,
              top: circle.y - CIRCLE_RADIUS,
            }}
          />
        ))}
        {circles.length === 0 ? (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
            Haz click para pintar círculos
          </p>
        ) : null}
      </div>
    </div>
  )
}
