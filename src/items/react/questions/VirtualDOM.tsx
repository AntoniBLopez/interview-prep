import type { ReactNode } from 'react'
import { CollapsibleSection, NumberedCollapsibleSections } from '../../../components/CollapsibleSection'
import { Level } from '../../types'

function Prose({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3 leading-relaxed">{children}</div>
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">{children}</h3>
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs leading-5 text-gray-100 dark:bg-black/60">
      <code>{children}</code>
    </pre>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
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

type Resource = {
  rank: number
  title: string
  author: string
  why: string
  href: string
}

const fiberArticles: Resource[] = [
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

const fiberVideos: Resource[] = [
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

function ResourceList({ items }: { items: Resource[] }) {
  return (
    <ol className="list-none space-y-4 pl-0">
      {items.map((item) => (
        <li
          key={item.rank}
          className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 dark:border-gray-700 dark:bg-gray-800/50"
        >
          <p className="font-medium text-gray-900 dark:text-gray-100">
            <span className="text-gray-500 dark:text-gray-400">{item.rank}. </span>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-800 dark:hover:text-blue-300"
            >
              {item.title}
            </a>
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <strong className="font-medium text-gray-700 dark:text-gray-300">Autor:</strong> {item.author}
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Por qué es importante:</strong> {item.why}
          </p>
        </li>
      ))}
    </ol>
  )
}

function VirtualDOM() {
  return (
    <div className="flex flex-col gap-2">
      <NumberedCollapsibleSections>
      <CollapsibleSection title="Historia de React y el Virtual DOM" level={Level.Advanced}>
        <Prose>
          <p>
            <strong>Sí.</strong> React siempre ha creado (y sigue creando) primero una representación en memoria
            llamada <strong>Virtual DOM</strong> (o DOM virtual), y luego actualiza el DOM real del navegador de forma
            eficiente.
          </p>
          <Heading>Cómo funciona desde el principio</Heading>
          <p>
            React se lanzó públicamente en 2013 y el Virtual DOM fue una de sus características centrales desde el
            inicio (junto con el enfoque declarativo y basado en componentes). No hubo una etapa anterior en la que
            React manipulara el DOM real directamente como hacían muchas librerías de la época.
          </p>
          <p>El flujo es este:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Tú escribes JSX (o usas <code className="inline-code">React.createElement</code>).</li>
            <li>
              Eso se convierte en un árbol de objetos JavaScript ligeros → <strong>Virtual DOM</strong>.
            </li>
            <li>React compara ese árbol nuevo con el anterior (proceso de reconciliation / diffing).</li>
            <li>
              Solo aplica al <strong>DOM real</strong> los cambios mínimos necesarios (inserción, actualización o
              eliminación de nodos).
            </li>
          </ol>
          <p>
            En el primer render ya existe un contenedor real en el HTML (normalmente{' '}
            <code className="inline-code">{'<div id="root"></div>'}</code>), pero el contenido de la
            interfaz se genera a partir del Virtual DOM.
          </p>
          <Heading>Resumen histórico</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              React <strong>nunca</strong> creó el DOM real primero y luego “inventó” el Virtual DOM después.
            </li>
            <li>
              El Virtual DOM fue parte del diseño original para evitar las costosas manipulaciones directas del DOM del
              navegador y permitir un modelo declarativo (“dile a React cómo quieres que se vea la UI y él se encarga
              de actualizarla”).
            </li>
          </ul>
          <p>
            Hoy en día React sigue usando este concepto (aunque internamente ha evolucionado mucho con Fiber desde
            React 16, y el término “Virtual DOM” a veces se usa de forma un poco laxa).
          </p>
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is Fiber? Tell me more about Fiber" level={Level.Advanced}>
        <Prose>
          <p>
            <strong>React Fiber</strong> es el motor de reconciliación interno de React desde la versión{' '}
            <strong>16</strong> (lanzada en 2017). Es una reescritura completa del algoritmo anterior (llamado{' '}
            <em>Stack Reconciler</em>).
          </p>
          <Heading>¿Qué problema resolvía?</Heading>
          <p>
            Antes de Fiber, React actualizaba el Virtual DOM de forma <strong>síncrona y recursiva</strong>. Una vez
            que empezaba a recorrer el árbol de componentes, no podía parar hasta terminar. Si la aplicación era grande
            o compleja, esto podía bloquear el hilo principal del navegador y hacer que la interfaz se congelara
            (animación trabada, input lento, etc.).
          </p>
          <Heading>¿Qué es Fiber exactamente?</Heading>
          <p>
            <strong>Fiber</strong> (con mayúscula) es el nuevo algoritmo de reconciliación. Un <strong>fiber</strong>{' '}
            (con minúscula) es una <strong>unidad de trabajo</strong>: un objeto JavaScript simple que representa un
            componente o un nodo del árbol. Cada fiber contiene información como:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Tipo de elemento</li>
            <li>Props</li>
            <li>Estado</li>
            <li>Referencias a su padre, hijo y hermanos</li>
            <li>Efectos pendientes (qué hay que actualizar en el DOM)</li>
            <li>Prioridad del trabajo</li>
          </ul>
          <p>Puedes pensarlo como un “frame de pila virtual” que React puede manipular a voluntad.</p>
          <Heading>Características principales de Fiber</Heading>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Renderizado incremental.</strong> Divide el trabajo de renderizado en pequeños trozos (chunks) y
              los reparte a lo largo de varios frames del navegador.
            </li>
            <li>
              <strong>Puede pausar, reanudar o abortar trabajo.</strong> React puede dejar un trabajo a medias si llega
              algo más importante (por ejemplo, un clic del usuario) y retomarlo después.
            </li>
            <li>
              <strong>Prioridades de actualizaciones.</strong> No todas las actualizaciones tienen la misma importancia.
              Fiber permite priorizar (animaciones y respuestas a interacciones van primero; actualizaciones de datos
              en segundo plano van después).
            </li>
            <li>
              <strong>Dos fases claras:</strong>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>
                  <strong>Fase de Render (o reconciliación):</strong> se construye el nuevo árbol de fibers.{' '}
                  <strong>Es interrumpible</strong>.
                </li>
                <li>
                  <strong>Fase de Commit:</strong> se aplican los cambios reales al DOM.{' '}
                  <strong>Es síncrona e ininterrumpible</strong> (para evitar inconsistencias visuales).
                </li>
              </ul>
            </li>
            <li>
              <strong>Doble buffering.</strong> React mantiene dos árboles de fibers: <em>current</em> (lo que se
              muestra) y <em>work-in-progress</em> (el nuevo árbol en construcción).
            </li>
          </ol>
          <Heading>Beneficios que trajo</Heading>
          <p>Interfaces más fluidas y responsivas, y la base para Concurrent Rendering, Suspense, Transitions, Error Boundaries, portals y fragments.</p>
          <Heading>La gran diferencia</Heading>
          <p>
            Antes (Stack Reconciler) todo el proceso era <strong>una sola fase síncrona y recursiva</strong>. Con Fiber
            se separó en dos fases.
          </p>
          <Table
            headers={['Aspecto', 'Stack Reconciler (antes)', 'Fiber (desde React 16)']}
            rows={[
              ['Fase de cálculo', 'Síncrona + no interrumpible', 'Interrumpible'],
              ['Fase de aplicar al DOM', 'Mezclada con el cálculo', 'Separada y síncrona (commit)'],
              ['Riesgo de bloqueo', 'Alto en todo el proceso', 'Principalmente en el commit (más corto)'],
            ]}
          />
          <p>
            El trabajo pesado se movió a la fase de render, que sí se puede interrumpir. El commit suele ser corto, pero
            una actualización enorme aún puede bloquear un poco. Features posteriores (
            <code className="inline-code">startTransition</code>,{' '}
            <code className="inline-code">useDeferredValue</code>, Concurrent Rendering) ayudan a preparar
            el trabajo en segundo plano.
          </p>
          <p>
            <strong>Resumen sencillo:</strong> Fiber es el “sistema operativo” interno de React que decide{' '}
            <em>cómo</em> y <em>cuándo</em> se calculan y aplican los cambios al Virtual DOM y al DOM real. Tú sigues
            escribiendo componentes de la misma forma.
          </p>
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Cómo se ve un fiber por dentro, prioridades y Concurrent Mode" level={Level.Advanced}>
        <Prose>
          <Heading>1. Cómo se ve un Fiber por dentro</Heading>
          <p>
            Un <strong>fiber</strong> es un objeto JavaScript plano. Cada componente o elemento del DOM tiene el suyo.
            Versión simplificada:
          </p>
          <Code>{`{
  tag: 0,
  key: null,
  elementType: MyComponent,
  type: MyComponent,
  stateNode: null,

  return: parentFiber,
  child: firstChildFiber,
  sibling: nextSiblingFiber,
  index: 0,

  pendingProps: { ... },
  memoizedProps: { ... },
  memoizedState: { ... },
  updateQueue: { ... },
  dependencies: null,

  flags: 0,
  subtreeFlags: 0,
  deletions: null,

  lanes: 0,
  childLanes: 0,

  alternate: otherFiber,
  mode: ConcurrentMode,
  ref: null,
}`}</Code>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Usa <strong>lista enlazada</strong> (<code className="inline-code">child</code> +{' '}
              <code className="inline-code">sibling</code> +{' '}
              <code className="inline-code">return</code>) en lugar de un array de hijos → recorrer el
              árbol de forma no recursiva e interrumpible.
            </li>
            <li>
              <code className="inline-code">alternate</code> permite el doble buffering (árbol actual vs
              árbol en construcción).
            </li>
            <li>
              <code className="inline-code">flags</code> indica qué side-effects hay que aplicar en el
              commit.
            </li>
          </ul>
          <Heading>2. Prioridades (Lanes)</Heading>
          <p>
            React usa un modelo llamado <strong>Lanes</strong>: bitmask de 31 bits. Cada carril representa un nivel de
            urgencia y se pueden combinar con operaciones bitwise.
          </p>
          <Table
            headers={['Lane', 'Uso típico', 'Prioridad']}
            rows={[
              ['SyncLane', 'Actualizaciones síncronas (flushSync)', 'Máxima'],
              ['InputContinuousLane', 'Clicks, teclas, drag', 'Muy alta'],
              ['DefaultLane', 'setState normal', 'Media'],
              ['TransitionLanes', 'startTransition / useTransition', 'Baja'],
              ['OffscreenLane', 'Contenido fuera de pantalla', 'Muy baja'],
            ]}
          />
          <p>
            Cuando haces un <code className="inline-code">setState</code> o un evento, React asigna un
            lane. El Scheduler elige el de mayor prioridad. Si llega trabajo más urgente, puede interrumpir el actual.
          </p>
          <Heading>3. Concurrent Mode → Concurrent Rendering</Heading>
          <p>
            El término <strong>“Concurrent Mode”</strong> ya no se usa oficialmente desde React 18. Ahora se habla de{' '}
            <strong>Concurrent Rendering</strong>.
          </p>
          <p>
            En React 16-17 era un modo global (<code className="inline-code">createRoot</code> vs{' '}
            <code className="inline-code">render</code>). En React 18+ no hay un modo global: el
            renderizado concurrente se activa solo cuando usas APIs concurrentes (
            <code className="inline-code">startTransition</code>,{' '}
            <code className="inline-code">useDeferredValue</code>, Suspense en ciertos casos). El resto
            sigue síncrono por defecto.
          </p>
          <Table
            headers={['Concepto', 'Qué es', 'Para qué sirve']}
            rows={[
              ['Fiber (objeto)', 'Unidad de trabajo + estructura del árbol', 'Permite pausar y reanudar'],
              ['Lanes', 'Sistema de prioridades con bitmasks', 'Decidir qué trabajo hacer primero'],
              ['Concurrent Rendering', 'Capacidad de interrumpir renders', 'UI responsiva + features modernas'],
            ]}
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is Concurrent Mode and Concurrent Rendering?" level={Level.Advanced}>
        <Prose>
          <Heading>Concurrent Mode (el término antiguo)</Heading>
          <p>
            Fue el nombre experimental entre 2018 y 2021. Era un <strong>modo global</strong> en la raíz de la app.
            Una vez activado, <strong>toda</strong> la aplicación usaba renderizado concurrente. En React 18
            abandonaron este enfoque: ya no existe un “Concurrent Mode” como tal.
          </p>
          <Heading>Concurrent Rendering (el término actual)</Heading>
          <p>
            Es la capacidad de React de <strong>interrumpir, pausar, reanudar o descartar</strong> el trabajo de
            renderizado: time slicing, priorizar clics/escritura, preparar actualizaciones en segundo plano y descartar
            trabajo que ya no hace falta.
          </p>
          <Table
            headers={['Aspecto', 'Renderizado síncrono', 'Concurrent Rendering']}
            rows={[
              ['¿Se puede interrumpir?', 'No', 'Sí'],
              ['¿Bloquea el hilo principal?', 'Sí, hasta terminar', 'Puede ceder el control al navegador'],
              ['Actualizaciones urgentes', 'Esperan a que termine lo anterior', 'Pueden interrumpir trabajo de baja prioridad'],
              ['Cómo se activa', 'Por defecto', 'Solo cuando usas ciertas APIs'],
            ]}
          />
          <Heading>¿Cómo se activa hoy?</Heading>
          <Code>{`const [isPending, startTransition] = useTransition();

function handleSearch(text) {
  setInputValue(text);

  startTransition(() => {
    setSearchResults(text);
  });
}`}</Code>
          <p>
            El input responde de inmediato; <code className="inline-code">setSearchResults</code> es de
            baja prioridad y React puede interrumpirlo si el usuario sigue escribiendo.
          </p>
          <Table
            headers={['Término', '¿Qué es?', 'Estado actual']}
            rows={[
              ['Concurrent Mode', 'Modo global experimental', 'Obsoleto (ya no existe)'],
              ['Concurrent Rendering', 'Capacidad de interrumpir el renderizado', 'Actual (React 18+)'],
            ]}
          />
          <p>
            <strong>En pocas palabras:</strong> Concurrent Rendering es la habilidad de React de no bloquear la
            interfaz mientras calcula actualizaciones, gracias a Fiber. El “Concurrent Mode” era la forma antigua (y
            global) de activarlo.
          </p>
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Recursos recomendados: artículos y vídeos" level={Level.Advanced}>
        <Prose>
          <p>
            Lecturas y charlas de referencia para profundizar en Fiber, el Virtual DOM y la reconciliación. Ordenadas
            por relevancia y utilidad para entrevistas.
          </p>
          <Heading>Artículos</Heading>
          <ResourceList items={fiberArticles} />
          <Heading>Vídeos</Heading>
          <ResourceList items={fiberVideos} />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Respuesta" level={Level.Advanced}>
        <Prose>
          <p>
            El <strong>Virtual DOM</strong> es la representación en memoria del árbol de UI. React lo ha usado{' '}
            <strong>desde el principio</strong> (2013): JSX → objetos JS ligeros → diff → mutaciones mínimas en el DOM
            real. Fiber <strong>no sustituye</strong> al Virtual DOM.
          </p>
          <p>
            <strong>Fiber</strong> (React 16+) es el <strong>motor de reconciliación</strong> que recorre ese árbol.
            Sustituye al Stack Reconciler síncrono y recursivo por unidades de trabajo (fibers) que se pueden pausar,
            priorizar y reanudar.
          </p>
          <p>
            <strong>Diferencia clave:</strong> Virtual DOM es <em>qué</em> se representa en memoria. Fiber es{' '}
            <em>cómo y cuándo</em> React calcula el diff y aplica los cambios. Por eso Fiber habilita Concurrent
            Rendering, lanes, Suspense y transitions, mientras que el commit al DOM real sigue siendo síncrono.
          </p>
        </Prose>
      </CollapsibleSection>
      </NumberedCollapsibleSections>
    </div>
  )
}

export default VirtualDOM
