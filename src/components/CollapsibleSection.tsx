import { Children, cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from 'react'
import { Level } from '../items/types'

export type CollapsibleSectionProps = {
  title: string
  level: Level
  number?: number
  children: ReactNode
}

function levelBadgeClass(level: Level) {
  switch (level) {
    case Level.Begginer:
      return 'border-blue-200 bg-blue-100 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
    case Level.Inrtermediate:
      return 'border-orange-200 bg-orange-100 text-orange-600 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300'
    case Level.Advanced:
      return 'border-red-200 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
  }
}

export function CollapsibleSection({ title, level, number, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-md bg-white transition-all dark:bg-gray-900 ${
        open
          ? 'border-2 border-blue-500 shadow-md ring-2 ring-blue-100 dark:ring-blue-900/40'
          : 'border border-blue-200 dark:border-blue-900'
      }`}
    >
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
          open
            ? 'bg-blue-50 text-blue-950 dark:bg-blue-950/50 dark:text-blue-100'
            : 'text-blue-900 hover:bg-blue-50 dark:text-blue-200 dark:hover:bg-blue-950/40'
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="flex min-w-0 flex-1 items-start gap-2">
          {number != null ? (
            <span className="shrink-0 font-mono text-xs font-bold text-blue-500 tabular-nums dark:text-blue-400">
              {number}.
            </span>
          ) : null}
          <span className="min-w-0">{title}</span>
        </span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${levelBadgeClass(level)}`}
        >
          {level}
        </span>
        <span className="shrink-0 font-mono text-blue-600 dark:text-blue-400">{open ? '−' : '+'}</span>
      </button>
      {open ? (
        <div className="border-t-2 border-blue-200 bg-white px-4 py-4 text-sm text-gray-700 dark:border-blue-900 dark:bg-gray-900 dark:text-gray-300">
          {children}
        </div>
      ) : null}
    </div>
  )
}

type NumberedCollapsibleSectionsProps = {
  children: ReactNode
}

export function NumberedCollapsibleSections({ children }: NumberedCollapsibleSectionsProps) {
  const sections = Children.toArray(children).filter(
    (child): child is ReactElement<CollapsibleSectionProps> =>
      isValidElement(child) && child.type === CollapsibleSection,
  )

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-200">{sections.length}</span> preguntas
      </p>
      {sections.map((child, index) => cloneElement(child, { number: index + 1 }))}
    </div>
  )
}
