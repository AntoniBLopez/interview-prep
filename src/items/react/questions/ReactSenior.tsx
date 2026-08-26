import { CollapsibleSection, NumberedCollapsibleSections } from '../../../components/CollapsibleSection'
import {
  Code,
  DocLink,
  Heading,
  PatternsIntroCard,
  Prose,
  QuickAnswerCard,
  Table,
} from '../../../components/QuestionContent'
import { Level } from '../../types'

function ReactSenior() {
  return (
    <div className="flex flex-col gap-2">
      <PatternsIntroCard />

      <NumberedCollapsibleSections>
      <CollapsibleSection title="Higher-Order Component (HOC)" level={Level.Advanced}>
        <Prose>
          <QuickAnswerCard>
            <p>
              Prefiero usar <strong>custom hooks</strong> para compartir lógica. Son más legibles, fáciles de
              entender y de usar que envolver componentes.
            </p>
          </QuickAnswerCard>
          <p>
            Un <strong>Higher-Order Component</strong> es una función que recibe un componente y devuelve un
            componente nuevo con lógica o props extra. Es un patrón para <strong>reutilizar código</strong>{' '}
            entre componentes sin duplicarlo.
          </p>
          <p>
            La convención de nombres suele empezar con <code className="inline-code">with</code>:
          </p>
          <Code>{`function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const user = useAuth(); // lógica compartida
    if (!user) return <LoginPrompt />;
    return <WrappedComponent {...props} user={user} />;
  };
}

const Dashboard = withAuth(DashboardBase);`}</Code>
          <p>Ejemplos clásicos en ecosistemas React: <code className="inline-code">withRouter</code>,{' '}
            <code className="inline-code">connect</code> (Redux), HOCs de librerías de estilos.
          </p>
          <Heading>Inconvenientes</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Wrapper hell: muchos HOCs anidados dificultan el debug.</li>
            <li>Colisión de props (<code className="inline-code">displayName</code>, refs).</li>
            <li>Menos explícito que un hook que lees en el cuerpo del componente.</li>
          </ul>
          <p>
            Hoy la recomendación oficial es extraer la lógica a un <strong>custom hook</strong> y componer la UI
            normalmente.
          </p>
          <DocLink
            href="https://react.dev/reference/react/legacy"
            label="React docs — Legacy React APIs (HOCs)"
          />
          <DocLink
            href="https://react.dev/learn/reusing-logic-with-custom-hooks"
            label="React docs — Reusing logic with custom hooks (alternativa moderna)"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Render props" level={Level.Advanced}>
        <Prose>
          <QuickAnswerCard>
            <p>
              Recomiendo <strong>compound components con Context</strong> para compartir state. Suele ser más legible
              que pasar una función render como prop.
            </p>
          </QuickAnswerCard>
          <p>
            Un componente con <strong>render prop</strong> recibe una función (normalmente{' '}
            <code className="inline-code">render</code> o{' '}
            <code className="inline-code">children</code> como función) y la invoca con datos internos
            para que el consumidor decida qué pintar.
          </p>
          <Code>{`function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return render(position);
}

// Uso:
<MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />`}</Code>
          <Heading>Alternativa moderna: compound components</Heading>
          <Code>{`const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ id, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
}`}</Code>
          <p>
            Ambos patrones comparten lógica entre componentes. Render props es explícito; compound components +
            Context suele escalar mejor en APIs de librerías (Tabs, Select, Accordion).
          </p>
          <DocLink
            href="https://react.dev/reference/react/legacy#sharing-logic-with-render-props"
            label="React docs — Render props (legacy)"
          />
          <DocLink
            href="https://react.dev/learn/passing-data-deeply-with-context"
            label="React docs — Context y compound components"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="¿Cómo escribir un custom hook?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            Un custom hook es una función cuyo nombre empieza por{' '}
            <code className="inline-code">use</code> y puede llamar a otros hooks. Extrae lógica
            reutilizable sin cambiar el árbol de componentes.
          </p>
          <Code>{`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme('dark')}>{theme}</button>;
}`}</Code>
          <Heading>Reglas</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Nombre <code className="inline-code">use*</code> obligatorio.</li>
            <li>Solo llamar hooks en el nivel superior del custom hook.</li>
            <li>Devuelve lo que necesiten los consumidores: valores, setters, funciones.</li>
          </ul>
          <DocLink
            href="https://react.dev/learn/reusing-logic-with-custom-hooks"
            label="React docs — Reusing logic with custom hooks"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="¿Cómo pasar datos de hijo a padre?" level={Level.Begginer}>
        <Prose>
          <p>
            React fluye datos hacia abajo (props). Para que un hijo comunique algo al padre, el padre pasa un{' '}
            <strong>callback</strong> y el hijo lo invoca — esto es{' '}
            <strong>lifting state up</strong> cuando el state vive en el ancestro común.
          </p>
          <Code>{`function Parent() {
  const [message, setMessage] = useState('');

  return (
    <>
      <p>El padre recibió: {message}</p>
      <Child onSend={(text) => setMessage(text)} />
    </>
  );
}

function Child({ onSend }) {
  return <button onClick={() => onSend('Hola desde el hijo')}>Enviar</button>;
}`}</Code>
          <p>
            No existe un mecanismo directo “hijo → padre” sin callback. Alternativas indirectas: Context (si muchos
            niveles), estado global, o event emitters (menos idiomático en React).
          </p>
          <DocLink
            href="https://react.dev/learn/sharing-state-between-components"
            label="React docs — Sharing state between components"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Code splitting y React.lazy" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <strong>Code splitting</strong> divide el bundle en trozos que se cargan bajo demanda. La app arranca
            más rápido porque no descarga todo el JS de golpe.
          </p>
          <Code>{`import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Suspense fallback={<p>Cargando módulo...</p>}>
      <AdminPanel />
    </Suspense>
  );
}`}</Code>
          <Heading>¿Por qué?</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Rutas pesadas (dashboard, editor) solo se cargan al visitarlas.</li>
            <li>Menor tiempo hasta interactive (TTI).</li>
            <li>Combinable con <code className="inline-code">import()</code> dinámico en bundlers (Vite, Webpack).</li>
          </ul>
          <p>
            También puedes hacer route-based splitting con{' '}
            <code className="inline-code">React.lazy</code> por ruta en React Router.
          </p>
          <DocLink href="https://react.dev/reference/react/lazy" label="React docs — lazy" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="¿Cómo funciona SSR con React Router?" level={Level.Advanced}>
        <Prose>
          <p>
            En <strong>SSR</strong> el servidor genera HTML con el contenido ya renderizado. El navegador muestra
            esa página de inmediato; luego React <strong>hidrata</strong> el DOM para hacerlo interactivo.
          </p>
          <Heading>Flujo típico con React Router</Heading>
          <ol className="list-decimal space-y-1 pl-5">
            <li>El servidor recibe la URL (<code className="inline-code">/users/42</code>).</li>
            <li>Crea un router en modo servidor y resuelve la ruta.</li>
            <li>Renderiza la app a string HTML (<code className="inline-code">renderToString</code> o streaming).</li>
            <li>Envía HTML + datos embebidos (si hace falta) al cliente.</li>
            <li>El cliente hidrata con el mismo router y la misma URL.</li>
          </ol>
          <Code>{`// Servidor (simplificado)
const html = renderToString(
  <StaticRouter location={req.url}>
    <App />
  </StaticRouter>
);

// Cliente
hydrateRoot(document.getElementById('root'), (
  <BrowserRouter>
    <App />
  </BrowserRouter>
));`}</Code>
          <p>
            Frameworks como Remix y React Router v7 (framework mode) automatizan loaders, streaming y hydration.
            Clave: servidor y cliente deben acordar la misma URL, datos y markup para evitar hydration mismatches.
          </p>
          <DocLink
            href="https://reactrouter.com/start/framework/rendering"
            label="React Router docs — Rendering (SSR)"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="¿Por qué useEffect corre después del render?" level={Level.Advanced}>
        <Prose>
          <p>
            React separa la fase de <strong>render</strong> (pura, calcula qué mostrar) de los{' '}
            <strong>efectos secundarios</strong> (fetch, suscripciones, mutaciones externas).
          </p>
          <Heading>Razones de diseño</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>El render debe ser predecible y sin side effects — facilita Concurrent Rendering.</li>
            <li>Si el render se interrumpe o se descarta, no quieres efectos ya ejecutados.</li>
            <li>Permite pintar la UI antes de esperar APIs o suscripciones.</li>
          </ul>
          <p>Orden en un commit:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Render (función del componente).</li>
            <li>React actualiza el DOM.</li>
            <li>El navegador pinta.</li>
            <li>Se ejecutan los <code className="inline-code">useEffect</code> (asíncronos).</li>
          </ol>
          <p>
            <code className="inline-code">useLayoutEffect</code> corre antes del paint (síncrono) para
            casos que necesitan medir o mutar el DOM antes de que el usuario vea la pantalla.
          </p>
          <DocLink href="https://react.dev/reference/react/useEffect" label="React docs — useEffect" />
          <DocLink
            href="https://overreacted.io/a-complete-guide-to-useeffect/"
            label="Overreacted — A Complete Guide to useEffect"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Linked list de hooks y errores de orden" level={Level.Advanced}>
        <Prose>
          <p>
            Internamente React guarda los hooks de cada componente en una{' '}
            <strong>lista enlazada</strong> en memoria (no en el Virtual DOM). En cada render recorre esa lista en
            el mismo orden en que se llamaron los hooks.
          </p>
          <Heading>¿Por qué lista enlazada?</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Cada hook guarda su propio state/memo/effect asociado a una “celda” de la lista.</li>
            <li>React identifica hooks por <strong>posición</strong>, no por nombre.</li>
            <li>Permite añadir hooks sin cambiar la estructura del fiber.</li>
          </ul>
          <Heading>Si cambias el orden o la cantidad de hooks</Heading>
          <p>Errores típicos:</p>
          <Code>{`Rendered more hooks than during the previous render.
Rendered fewer hooks than expected.
React has detected a change in the order of Hooks.`}</Code>
          <p>Esto pasa si llamas hooks dentro de condicionales, bucles o después de un early return variable.</p>
          <Code>{`// ❌ Mal — el orden cambia según loggedIn
if (loggedIn) {
  useEffect(() => {}, []);
}

// ✅ Bien — hooks siempre en el mismo orden
useEffect(() => {
  if (!loggedIn) return;
  // ...
}, [loggedIn]);`}</Code>
          <DocLink href="https://react.dev/reference/rules/rules-of-hooks" label="React docs — Rules of Hooks" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="Sincronizar la misma app en dos pestañas" level={Level.Advanced}>
        <Prose>
          <p>
            Cada pestaña del navegador tiene su propio JavaScript heap — el state de React{' '}
            <strong>no se comparte automáticamente</strong> entre pestañas.
          </p>
          <Heading>Soluciones habituales</Heading>
          <Table
            headers={['Mecanismo', 'Uso típico']}
            rows={[
              ['localStorage + storage event', 'Preferencias, carrito, borradores'],
              ['BroadcastChannel API', 'Mensajes en tiempo real entre pestañas del mismo origen'],
              ['SharedWorker / Service Worker', 'Coordinación más avanzada'],
              ['Backend + WebSockets / SSE', 'Fuente de verdad centralizada (chat, colaboración)'],
            ]}
          />
          <Code>{`// Ejemplo: sync simple con localStorage
function useCrossTabState(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    function onStorage(e) {
      if (e.key === key && e.newValue) {
        setValue(JSON.parse(e.newValue));
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  function update(next) {
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return [value, update];
}`}</Code>
          <p>
            El evento <code className="inline-code">storage</code> solo se dispara en{' '}
            <em>otras</em> pestañas, no en la que escribió. Para sync bidireccional instantáneo, combina con{' '}
            <code className="inline-code">BroadcastChannel</code> o un backend.
          </p>
          <DocLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event"
            label="MDN — storage event"
          />
          <DocLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API"
            label="MDN — Broadcast Channel API"
          />
        </Prose>
      </CollapsibleSection>
      </NumberedCollapsibleSections>
    </div>
  )
}

export default ReactSenior
