import type { Track } from '../tracks/types'
import { ThemeToggle } from './ThemeToggle'

type TrackHeaderProps = {
  tracks: Track[]
  activeTrackId: string
  onTrackChange: (trackId: string) => void
}

export function TrackHeader({ tracks, activeTrackId, onTrackChange }: TrackHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Interview Lab</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Práctica para entrevistas técnicas</p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5 md:min-w-[220px]">
            <label
              htmlFor="track-select"
              className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              Aprender
            </label>
            <select
              id="track-select"
              value={activeTrackId}
              onChange={(e) => onTrackChange(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none transition-colors hover:border-blue-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-900/40"
            >
              {tracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
