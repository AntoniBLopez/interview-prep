import type { ReactNode } from 'react'
import { Level } from '../items/types'
import type { Question } from '../items/types'

type QuestionLayoutProps = {
  question: Question
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

export function QuestionLayout({ question, children }: QuestionLayoutProps) {
  return (
    <article>
      <header className="mb-6 flex flex-col border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p>Level: </p>
            <p
              className={`flex w-fit rounded-xl border-2 px-2 py-1 font-bold capitalize ${levelBadgeClass(question.level)}`}
            >
              {question.level}
            </p>
          </div>
          <div className="mb-5 rounded-lg border border-blue-200 border-l-4 border-l-blue-600 bg-blue-50 px-5 py-4 dark:border-blue-900 dark:border-l-blue-500 dark:bg-blue-950/40">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Interview question
            </span>
            <p className="text-lg font-medium leading-snug text-gray-900 dark:text-gray-100">{question.question}</p>
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">{question.title}</h2>
        <p className="mb-3 text-gray-600 dark:text-gray-300">{question.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {question.file}
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {question.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-950 dark:text-blue-300"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <section>{children}</section>
    </article>
  )
}
