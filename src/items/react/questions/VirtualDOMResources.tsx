export type LearningResource = {
  rank: number
  title: string
  author: string
  why: string
  href: string
}

export const fiberArticles: LearningResource[] = [
  {
    rank: 1,
    title: 'Inside Fiber: in-depth overview of the new reconciliation algorithm in React',
    author: 'Max Koretskyi (React In Depth)',
    why: 'El deep-dive clásico. Sigue siendo el artículo más referenciado sobre Fiber. Extremadamente detallado y preciso.',
    href: 'https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e',
  },
  {
    rank: 2,
    title: 'React Fiber Architecture',
    author: 'Andrew Clark (React team)',
    why: 'Las notas originales de un miembro del core team de React. El documento fundacional al que todo el mundo hace referencia.',
    href: 'https://github.com/acdlite/react-fiber-architecture',
  },
  {
    rank: 3,
    title: 'A deep dive into React Fiber',
    author: 'Karthik Kalyanaraman (LogRocket)',
    why: 'Uno de los mejores deep dives modernos y actualizados (cubre conceptos hasta React 18/19).',
    href: 'https://blog.logrocket.com/deep-dive-react-fiber/',
  },
  {
    rank: 4,
    title: 'The Internals of React: Understanding DOM Reconciliation and the React Fiber Architecture',
    author: 'Fabrice Monnier',
    why: 'Excelente explicación reciente y clara de cómo Fiber habilita el concurrent rendering.',
    href: 'https://fabricemonnier.substack.com/p/the-internals-of-react-understanding',
  },
  {
    rank: 5,
    title: 'Overreacted — escritos de Dan Abramov',
    author: 'Dan Abramov',
    why: 'Aunque no es un único artículo largo sobre Fiber, sus explicaciones (especialmente sobre concurrent mode) son esenciales.',
    href: 'https://overreacted.io/',
  },
]

export const fiberVideos: LearningResource[] = [
  {
    rank: 1,
    title: 'A Cartoon Intro to Fiber (React Conf 2017)',
    author: 'Lin Clark',
    why: 'La introducción más famosa y accesible. Explicación estilo cartoon que hizo Fiber comprensible para miles de desarrolladores.',
    href: 'https://www.youtube.com/watch?v=ZCuYPiUIONs',
  },
  {
    rank: 2,
    title: 'Beyond React 16 (JSConf Iceland 2018)',
    author: 'Dan Abramov',
    why: 'Charla legendaria. Muestra el problema que Fiber resuelve con demos en vivo de time-slicing y Suspense.',
    href: 'https://www.youtube.com/watch?v=v6iR3Zk4oDY',
  },
  {
    rank: 3,
    title: 'What Is React Fiber? React.js Deep Dive #2',
    author: 'Philip Fabianek',
    why: 'Visión general clara, estructurada y bien explicada de los nodos Fiber, las fases y los árboles.',
    href: 'https://www.youtube.com/watch?v=0ympFIwQFJw',
  },
  {
    rank: 4,
    title: 'React Fiber Is Confusing.. So I Made It Simple',
    author: 'Sofia Goyal',
    why: 'Explicación visual moderna con buenos diagramas de Current Tree vs Work In Progress Tree.',
    href: 'https://www.youtube.com/watch?v=6JOm5rGvogc',
  },
  {
    rank: 5,
    title: 'React Fiber Reconciliation: How it Works (Part 1)',
    author: 'Tejas Kumar',
    why: 'Excelente explicación técnica del reconciler Stack vs Fiber.',
    href: 'https://www.youtube.com/watch?v=rKk4XJYzSQA',
  },
  {
    rank: 6,
    title: 'Inside Fiber (React Summit 2022)',
    author: 'Matheus Albuquerque',
    why: 'Muy buena charla que profundiza en la estructura del FiberNode.',
    href: 'https://www.youtube.com/watch?v=NLF0N9SACD4',
  },
]

function ResourceGroup({ title, items }: { title: string; items: LearningResource[] }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</h3>
      <ol className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item.rank}
            className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-2 dark:border-gray-700 dark:bg-gray-950/50"
          >
            <p className="text-sm leading-snug font-medium text-gray-900 dark:text-gray-100">
              <span className="text-gray-400 dark:text-gray-500">{item.rank}. </span>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-800 dark:hover:text-blue-300"
              >
                {item.title}
              </a>
            </p>
            <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">{item.author}</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.why}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function VirtualDOMResources() {
  return (
    <nav aria-label="Recursos recomendados sobre React Fiber" className="flex h-full flex-col">
      <div className="shrink-0 border-b border-gray-200 pb-4 dark:border-gray-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Recursos</p>
        <h2 className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">Artículos y vídeos</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Lecturas y charlas de referencia para profundizar en Fiber y reconciliación.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto pt-4">
        <ResourceGroup title="Artículos" items={fiberArticles} />
        <ResourceGroup title="Vídeos" items={fiberVideos} />
      </div>
    </nav>
  )
}
