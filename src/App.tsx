import { useEffect, useState } from 'react'
import { ExerciseLayout } from './components/ExerciseLayout'
import { QuestionLayout } from './components/QuestionLayout'
import { TrackHeader } from './components/TrackHeader'
import { tracks } from './tracks/registry'
import type { TrackItem } from './tracks/types'

const TRACK_STORAGE_KEY = 'interview-lab-track'
const itemStorageKey = (trackId: string) => `interview-lab-exercise-${trackId}`

function trackItems(track: (typeof tracks)[number]): TrackItem[] {
  return [...track.questions, ...track.exercises]
}

function App() {
  const [activeTrackId, setActiveTrackId] = useState(
    () => localStorage.getItem(TRACK_STORAGE_KEY) ?? tracks[0]?.id ?? '',
  )
  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0]
  const items = activeTrack ? trackItems(activeTrack) : []

  const [activeItemId, setActiveItemId] = useState(() => {
    const savedTrackId = localStorage.getItem(TRACK_STORAGE_KEY) ?? tracks[0]?.id ?? ''
    const savedItemId = localStorage.getItem(itemStorageKey(savedTrackId))
    const track = tracks.find((item) => item.id === savedTrackId) ?? tracks[0]
    const list = track ? trackItems(track) : []
    const exists = list.some((item) => item.id === savedItemId)
    return exists && savedItemId ? savedItemId : (list[0]?.id ?? '')
  })

  useEffect(() => {
    localStorage.setItem(TRACK_STORAGE_KEY, activeTrackId)
  }, [activeTrackId])

  useEffect(() => {
    localStorage.setItem(itemStorageKey(activeTrackId), activeItemId)
  }, [activeTrackId, activeItemId])

  const activeItem = items.find((item) => item.id === activeItemId)

  function handleTrackChange(trackId: string) {
    const track = tracks.find((item) => item.id === trackId)
    if (!track) return

    setActiveTrackId(trackId)

    const savedItemId = localStorage.getItem(itemStorageKey(trackId))
    const list = trackItems(track)
    const savedExists = list.some((item) => item.id === savedItemId)
    setActiveItemId(savedExists && savedItemId ? savedItemId : (list[0]?.id ?? ''))
  }

  if (!activeTrack || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <TrackHeader tracks={tracks} activeTrackId={activeTrackId} onTrackChange={handleTrackChange} />
        <p className="p-8 text-gray-600 dark:text-gray-300">No hay preguntas ni ejercicios registrados para este track.</p>
      </div>
    )
  }

  if (!activeItem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <TrackHeader tracks={tracks} activeTrackId={activeTrackId} onTrackChange={handleTrackChange} />
        <p className="p-8 text-gray-600 dark:text-gray-300">Selecciona una pregunta o un ejercicio.</p>
      </div>
    )
  }

  const { Component } = activeItem
  const Resources = activeItem.kind === 'question' ? activeItem.Resources : undefined

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <TrackHeader tracks={tracks} activeTrackId={activeTrackId} onTrackChange={handleTrackChange} />

      <div className="grid flex-1 md:grid-cols-[280px_1fr]">
        <aside className="flex flex-col gap-4 border-b border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 md:border-r md:border-b-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{activeTrack.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeTrack.questions.length} preguntas · {activeTrack.exercises.length} ejercicios
            </p>
          </div>
          <nav>
            <ul className="flex flex-col gap-1.5">
              {items.map((item) => {
                const isActive = item.id === activeItemId
                const isQuestion = item.kind === 'question'
                const className = isQuestion
                  ? isActive
                    ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-600'
                    : 'border-blue-300 bg-blue-50 text-blue-900 hover:border-blue-600 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:border-blue-500'
                  : isActive
                    ? 'border-gray-800 bg-gray-800 text-white dark:border-gray-600 dark:bg-gray-700'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500'

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${className}`}
                      onClick={() => setActiveItemId(item.id)}
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
          <footer className="mt-auto text-sm text-gray-500 dark:text-gray-400">
            <p>
              Añade preguntas en{' '}
              <code className="inline-code py-0.5 font-mono text-xs">
                {activeTrack.questionsPath}
              </code>{' '}
              y ejercicios en{' '}
              <code className="inline-code py-0.5 font-mono text-xs">
                {activeTrack.exercisesPath}
              </code>
              .
            </p>
            <p className="mt-2">
              Nuevo track: crea registries en{' '}
              <code className="inline-code py-0.5 font-mono text-xs">
                src/items/&lt;track&gt;/exercises/
              </code>{' '}
              y{' '}
              <code className="inline-code py-0.5 font-mono text-xs">
                src/items/&lt;track&gt;/questions/
              </code>{' '}
              y añádelo en{' '}
              <code className="inline-code py-0.5 font-mono text-xs">
                src/tracks/registry.ts
              </code>
              .
            </p>
          </footer>
        </aside>

        <div className="flex min-w-0">
          <main
            className={`min-w-0 w-full shrink-0${
              activeItem.kind === 'exercise' && activeItem.blankLayout ? '' : ' max-w-6xl p-8'
            }`}
          >
            {activeItem.kind === 'question' ? (
              <QuestionLayout question={activeItem}>
                <Component />
              </QuestionLayout>
            ) : activeItem.blankLayout ? (
              <Component />
            ) : (
              <ExerciseLayout exercise={activeItem}>
                <Component />
              </ExerciseLayout>
            )}
            {Resources ? (
              <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 min-[1720px]:hidden">
                <Resources />
              </div>
            ) : null}
          </main>

          {Resources ? (
            <aside className="sticky top-0 hidden max-h-screen shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 min-[1720px]:block min-[1720px]:w-[clamp(18rem,calc(100vw-19.75rem-72rem),36rem)]">
              <Resources />
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
