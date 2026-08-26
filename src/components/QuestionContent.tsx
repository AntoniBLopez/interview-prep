import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3 leading-relaxed">{children}</div>
}

export function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">{children}</h3>
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs leading-5 text-gray-100 dark:bg-black/60">
      <code>{children}</code>
    </pre>
  )
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border border-gray-200 bg-gray-50 px-2 py-1.5 font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-200 px-2 py-1.5 align-top dark:border-gray-700 dark:text-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InterviewTipsCard() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/40">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
        Consejos para la entrevista
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-amber-950 dark:text-amber-100">
        <li>Explica siempre el por qué, no solo la sintaxis.</li>
        <li>Habla de las reglas de los Hooks y de la inmutabilidad.</li>
        <li>
          Menciona buenas prácticas: no mutar el state directamente, usar keys correctas, evitar efectos
          innecesarios.
        </li>
        <li>Si te piden código, escribe componentes funcionales modernos.</li>
      </ul>
    </div>
  )
}

type LinkItem = {
  label: string
  href: string
}

export function LearningLinksCard({ links }: { links: LinkItem[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Links</p>
      <ul className="flex flex-col gap-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-800 dark:hover:text-blue-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function QuickAnswerCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-950 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
        Respuesta rápida
      </p>
      {children}
    </div>
  )
}

export function DocLink({ href, label = 'Documentación oficial →' }: { href: string; label?: string }) {
  return (
    <p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-800 dark:hover:text-blue-300"
      >
        {label}
      </a>
    </p>
  )
}

export function PatternsIntroCard() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950/40">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
        Antes de empezar
      </p>
      <p className="text-sm text-blue-950 dark:text-blue-100">
        El objetivo de HOCs (Higher-Order Components), render props, custom hooks y compound components es el mismo:{' '}
        <strong>compartir lógica, reutilizar código y mantener la UI modular y limpia</strong>. No son
        competidores sin más — son herramientas distintas para el mismo problema. Hoy, en entrevistas senior,
        suele valorarse que sepas el patrón clásico y también cuándo un hook o compound components es la
        opción más legible.
      </p>
    </div>
  )
}
