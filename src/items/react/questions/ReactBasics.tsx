import { CollapsibleSection, NumberedCollapsibleSections } from '../../../components/CollapsibleSection'
import { Code, DocLink, Heading, InterviewTipsCard, Prose, Table } from '../../../components/QuestionContent'
import { Level } from '../../types'

function ReactBasics() {
  return (
    <div className="flex flex-col gap-2">
      <InterviewTipsCard />

      <NumberedCollapsibleSections>
      <CollapsibleSection
        title="What is React and how can you best describe it?"
        level={Level.Begginer}
      >
        <Prose>
          <p>
            <strong>React</strong> is a JavaScript library (not a full framework) for building user interfaces with
            reusable <strong>components</strong>.
          </p>
          <p>
            You describe what the UI should look like for a given state; React efficiently updates the real DOM when
            data changes, using an in-memory representation called the Virtual DOM.
          </p>
          <p>
            It is <strong>declarative</strong>: instead of imperatively mutating the DOM step by step, you declare the
            desired output and React figures out the minimal updates.
          </p>
          <DocLink href="https://react.dev/learn" label="React docs — Learn React" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is JSX?" level={Level.Begginer}>
        <Prose>
          <p>
            <strong>JSX</strong> is a syntax extension that lets you write HTML-like markup inside JavaScript. Browsers
            do not understand it directly — a transpiler converts it to{' '}
            <code className="inline-code">React.createElement()</code> calls.
          </p>
          <Code>{`const element = <h1 className="title">Hello</h1>;

// Transpiles roughly to:
const element = React.createElement('h1', { className: 'title' }, 'Hello');`}</Code>
          <p>
            JSX must return a single root element (or a Fragment). JavaScript expressions go inside{' '}
            <code className="inline-code">{'{ }'}</code>.
          </p>
          <DocLink href="https://react.dev/learn/writing-markup-with-jsx" label="React docs — Writing markup with JSX" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What is the virtual DOM and how is it used by React?"
        level={Level.Begginer}
      >
        <Prose>
          <p>
            The <strong>Virtual DOM</strong> is a lightweight in-memory tree of JavaScript objects that represents the
            UI. When state or props change:
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>React builds a new Virtual DOM tree.</li>
            <li>It compares it with the previous tree (<strong>diffing</strong> / reconciliation).</li>
            <li>It applies only the minimal changes to the real DOM.</li>
          </ol>
          <Heading>Advantages</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Declarative UI — you describe the end state, not every DOM mutation.</li>
            <li>Fewer expensive direct DOM operations.</li>
            <li>Predictable updates across complex UIs.</li>
            <li>Enables batching and optimizations (Fiber, concurrent rendering).</li>
          </ul>
          <Heading>Disadvantages</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Extra memory and work to build and diff the tree.</li>
            <li>Not always faster than hand-tuned DOM updates for very simple UIs.</li>
            <li>Abstraction can hide performance issues until profiling.</li>
            <li>The term is sometimes used loosely — React has evolved beyond a simple VDOM mental model.</li>
          </ul>
          <DocLink href="https://react.dev/learn/render-and-commit" label="React docs — Render and commit" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What is the difference between controlled and uncontrolled components?"
        level={Level.Begginer}
      >
        <Prose>
          <p>
            In a <strong>controlled</strong> component, React state is the single source of truth for the input value.
            In an <strong>uncontrolled</strong> component, the DOM holds the value and you read it when needed (e.g. on
            submit) via a ref.
          </p>
          <Table
            headers={['', 'Controlled', 'Uncontrolled']}
            rows={[
              ['Source of truth', 'React state', 'The DOM'],
              ['Value', 'value + onChange', 'defaultValue or ref'],
              ['Best for', 'Validation, live preview, predictable state', 'Simple forms, file inputs, integrations'],
            ]}
          />
          <Code>{`// Controlled
function Controlled() {
  const [email, setEmail] = useState('');
  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}

// Uncontrolled
function Uncontrolled() {
  const inputRef = useRef(null);
  return <input ref={inputRef} defaultValue="" />;
}`}</Code>
          <DocLink
            href="https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components"
            label="React docs — Controlled and uncontrolled components"
          />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What are some of the hooks commonly used in React?"
        level={Level.Begginer}
      >
        <Prose>
          <p>
            Hooks let functional components use state, side effects, and other React features. The most common:
          </p>
          <Table
            headers={['Hook', 'Purpose']}
            rows={[
              ['useState', 'Local component state'],
              ['useEffect', 'Side effects after render (fetch, subscriptions)'],
              ['useContext', 'Read a Context value without prop drilling'],
              ['useRef', 'Mutable ref to DOM or value without re-render'],
              ['useMemo', 'Memoize expensive computed values'],
              ['useCallback', 'Memoize callback functions'],
              ['useReducer', 'Complex state with explicit actions'],
            ]}
          />
          <p>
            Custom hooks (functions starting with <code className="inline-code">use</code>) extract and
            reuse logic across components.
          </p>
          <DocLink href="https://react.dev/reference/react/hooks" label="React docs — Built-in Hooks" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="When it comes to performance in React, what do you need to look out for?"
        level={Level.Inrtermediate}
      >
        <Prose>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Unnecessary re-renders</strong> — parent updates causing large child trees to re-render.</li>
            <li><strong>Unstable references</strong> — new objects/functions in props on every render.</li>
            <li><strong>Missing or wrong keys</strong> in lists causing expensive reconciliation.</li>
            <li><strong>Heavy work during render</strong> — move it to useMemo or web workers.</li>
            <li><strong>Large bundles</strong> — use code splitting and React.lazy.</li>
            <li><strong>Long lists</strong> — consider virtualization (react-window, TanStack Virtual).</li>
            <li><strong>Context overuse</strong> — broad providers re-render many consumers.</li>
            <li><strong>Effects running too often</strong> — check dependency arrays.</li>
          </ul>
          <p>
            Always <strong>measure first</strong> with React DevTools Profiler before optimizing.
          </p>
          <DocLink href="https://react.dev/learn/render-and-commit" label="React docs — Render and commit (performance)" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useMemo and how does it work?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <code className="inline-code">useMemo</code> caches the <strong>result</strong> of a computation
            between renders. It only recalculates when dependencies change.
          </p>
          <Code>{`const sortedItems = useMemo(
  () => items.slice().sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);`}</Code>
          <p>
            Use it for expensive calculations, not for every value. Overusing useMemo adds complexity and can hurt
            performance.
          </p>
          <DocLink href="https://react.dev/reference/react/useMemo" label="React docs — useMemo" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useCallback and how does it work?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <code className="inline-code">useCallback</code> caches a <strong>function reference</strong>{' '}
            between renders. Useful when passing callbacks to memoized children (
            <code className="inline-code">React.memo</code>).
          </p>
          <Code>{`const handleClick = useCallback(() => {
  console.log(count);
}, [count]);

// Without useCallback, a new function is created every render
// and memoized children would re-render anyway.`}</Code>
          <DocLink href="https://react.dev/reference/react/useCallback" label="React docs — useCallback" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useRef and how does it work?" level={Level.Begginer}>
        <Prose>
          <p>
            <code className="inline-code">useRef</code> returns a mutable object{' '}
            <code className="inline-code">{'{ current }'}</code> that persists across renders. Changing{' '}
            <code className="inline-code">current</code> does <strong>not</strong> trigger a re-render.
          </p>
          <Code>{`function TextInput() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}`}</Code>
          <Heading>How does it differ from useState?</Heading>
          <Table
            headers={['', 'useRef', 'useState']}
            rows={[
              ['Triggers re-render on change', 'No', 'Yes'],
              ['Typical use', 'DOM access, timers, previous values', 'UI state that affects rendering'],
              ['Value read during render', 'May be stale if updated in same render', 'Always current for that render'],
            ]}
          />
          <DocLink href="https://react.dev/reference/react/useRef" label="React docs — useRef" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is Context and how does it work?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <strong>Context</strong> lets you pass data through the component tree without manually threading props at
            every level.
          </p>
          <Code>{`const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`}</Code>
          <p>
            Place the Provider as <strong>low as possible</strong> in the tree to avoid re-rendering unrelated
            components when the value changes.
          </p>
          <DocLink href="https://react.dev/learn/passing-data-deeply-with-context" label="React docs — Passing data deeply with Context" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What is state management and when is it useful?"
        level={Level.Inrtermediate}
      >
        <Prose>
          <p>
            <strong>State management</strong> is how you store, update, and share application data. Local{' '}
            <code className="inline-code">useState</code> is enough for component-specific UI state.
          </p>
          <p>Use dedicated state management when:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Many distant components need the same data.</li>
            <li>Server/cache state must be synchronized (lists, auth, cart).</li>
            <li>You need predictable updates, middleware, or time-travel debugging.</li>
            <li>Context causes too many re-renders or becomes hard to maintain.</li>
          </ul>
          <Heading>Examples of state management libraries</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Redux / Redux Toolkit</strong> — predictable global store, great for large apps.</li>
            <li><strong>Zustand</strong> — minimal API, no boilerplate.</li>
            <li><strong>Jotai / Recoil</strong> — atomic state model.</li>
            <li><strong>TanStack Query</strong> — server/async state (fetching, caching).</li>
            <li><strong>Context + useReducer</strong> — built-in option for moderate complexity.</li>
          </ul>
          <DocLink href="https://react.dev/learn/managing-state" label="React docs — Managing state" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What is the recommended way to structure your React code?"
        level={Level.Inrtermediate}
      >
        <Prose>
          <p>
            There is no single official folder structure, but React teams usually organize by <strong>feature</strong>{' '}
            (domain) rather than only by file type. Keep related components, hooks, and tests together so changes stay
            localized.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Feature-based folders</strong> — group by domain (users/, dashboard/) not only by type.</li>
            <li><strong>Colocation</strong> — keep components, hooks, and tests close to where they are used.</li>
            <li><strong>Separate concerns</strong> — UI components vs data hooks vs utilities.</li>
            <li><strong>Flat is better than nested</strong> — avoid deep folder hierarchies early on.</li>
            <li><strong>Shared UI</strong> in a <code className="inline-code">components/</code> or{' '}
              <code className="inline-code">ui/</code> folder; business logic in features.</li>
            <li><strong>Custom hooks</strong> for reusable stateful logic (<code className="inline-code">useAuth</code>,{' '}
              <code className="inline-code">useCart</code>).</li>
          </ul>
          <Code>{`src/
  features/
    auth/
      LoginForm.tsx
      useAuth.ts
  components/
    Button.tsx
  hooks/
  utils/`}</Code>
          <DocLink href="https://react.dev/learn/thinking-in-react" label="React docs — Thinking in React" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What are some best practices for writing React code?"
        level={Level.Begginer}
      >
        <Prose>
          <ul className="list-disc space-y-1 pl-5">
            <li>Prefer functional components and hooks over classes.</li>
            <li>Follow the Rules of Hooks — same order every render.</li>
            <li>Never mutate state directly; always use setters immutably.</li>
            <li>Use stable, unique <code className="inline-code">key</code> props in lists.</li>
            <li>Colocate state — keep it as close as possible to where it is used.</li>
            <li>Avoid premature optimization; profile before memoizing.</li>
            <li>Extract custom hooks when logic is reused or a component grows too large.</li>
            <li>Prefer composition over inheritance.</li>
            <li>Handle loading, error, and empty states explicitly.</li>
          </ul>
          <DocLink href="https://react.dev/learn" label="React docs — Learn React (best practices)" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What are the React DevTools and what can you use them for?"
        level={Level.Begginer}
      >
        <Prose>
          <p>
            <strong>React DevTools</strong> is a browser extension for inspecting React component trees in development.
          </p>
          <Heading>Components tab</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Inspect the component hierarchy and props/state/hooks.</li>
            <li>Edit props or state live to test UI behavior.</li>
            <li>See which components rendered and why (with “Highlight updates”).</li>
          </ul>
          <Heading>Profiler tab</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Record renders and see which components are slow.</li>
            <li>Identify unnecessary re-renders and optimize with memo/useMemo/useCallback.</li>
            <li>Compare commit durations across interactions.</li>
          </ul>
          <DocLink href="https://react.dev/learn/react-developer-tools" label="React docs — React Developer Tools" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection
        title="What is a good way to test your React applications?"
        level={Level.Inrtermediate}
      >
        <Prose>
          <p>
            Use <strong>React Testing Library</strong> with <strong>Vitest</strong> or <strong>Jest</strong>. Test how
            users interact with the UI, not implementation details.
          </p>
          <Code>{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('increments counter', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('1')).toBeInTheDocument();
});`}</Code>
          <Heading>What to test</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>User-visible behavior (clicks, forms, navigation).</li>
            <li>Accessibility queries (<code className="inline-code">getByRole</code>,{' '}
              <code className="inline-code">getByLabelText</code>).</li>
            <li>Edge cases: loading, errors, empty states.</li>
          </ul>
          <Heading>What to avoid</Heading>
          <ul className="list-disc space-y-1 pl-5">
            <li>Testing internal state or private methods.</li>
            <li>Snapshot-testing everything without meaningful assertions.</li>
          </ul>
          <DocLink href="https://react.dev/learn/testing" label="React docs — Testing" />
        </Prose>
      </CollapsibleSection>

      {/* Extra questions from original React Basics */}
      <CollapsibleSection title="What is the component lifecycle?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            Every component goes through three phases: it <strong>mounts</strong> (appears on screen),{' '}
            <strong>updates</strong> when props or state change, and <strong>unmounts</strong> when it is removed. Class
            components expose this with lifecycle methods; with hooks you express the same ideas mainly through{' '}
            <code className="inline-code">useEffect</code>.
          </p>
          <Table
            headers={['Class lifecycle', 'Hooks equivalent']}
            rows={[
              ['constructor + state', 'useState'],
              ['componentDidMount', 'useEffect(() => {}, [])'],
              ['componentDidUpdate', 'useEffect(() => {}, [deps])'],
              ['componentWillUnmount', 'cleanup in useEffect'],
            ]}
          />
          <DocLink href="https://react.dev/learn/synchronizing-with-effects" label="React docs — Synchronizing with Effects" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is prop drilling and how do you solve it?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <strong>Prop drilling</strong> happens when you pass data through many intermediate components that do not
            need it, just to reach a deep child. It makes the tree harder to read and refactor.
          </p>
          <p>
            Solutions: lift state only where needed, use <strong>composition</strong> (pass components as children),
            <strong> Context</strong> for shared data in a subtree, or a <strong>global store</strong> (Redux, Zustand)
            when many distant parts of the app need the same state.
          </p>
          <DocLink href="https://react.dev/learn/passing-data-deeply-with-context" label="React docs — Passing data deeply with Context" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is the difference between useEffect and useLayoutEffect?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            Both run after React updates the DOM, but at different times.{' '}
            <code className="inline-code">useEffect</code> runs <strong>after the browser paints</strong>,
            so it does not block the UI. <code className="inline-code">useLayoutEffect</code> runs{' '}
            <strong>before paint</strong>, synchronously — useful when you must measure or adjust the DOM before the user
            sees the result.
          </p>
          <Table
            headers={['Hook', 'When', 'Blocks paint?']}
            rows={[
              ['useEffect', 'After paint (async)', 'No'],
              ['useLayoutEffect', 'After DOM update, before paint', 'Yes'],
            ]}
          />
          <DocLink href="https://react.dev/reference/react/useLayoutEffect" label="React docs — useLayoutEffect" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is the difference between functional and class components?" level={Level.Begginer}>
        <Prose>
          <p>
            <strong>Functional components</strong> are plain functions that return JSX. With hooks they can hold state,
            effects, and all modern React features. <strong>Class components</strong> are ES6 classes with{' '}
            <code className="inline-code">render()</code> and lifecycle methods — still supported but
            considered legacy for new code.
          </p>
          <DocLink href="https://react.dev/reference/react/Component" label="React docs — Component (legacy classes)" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is the difference between props and state?" level={Level.Begginer}>
        <Prose>
          <p>
            <strong>Props</strong> are inputs from the parent — read-only inside the child.{' '}
            <strong>State</strong> is internal data owned by the component; updating it triggers a re-render. Props flow
            down; state changes are local unless lifted up or shared via Context.
          </p>
          <Table
            headers={['', 'Props', 'State']}
            rows={[
              ['From', 'Parent', 'Inside component'],
              ['Mutable by child', 'No', 'Yes (via setter)'],
            ]}
          />
          <DocLink href="https://react.dev/learn/passing-props-to-a-component" label="React docs — Passing props to a component" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What are the Rules of Hooks?" level={Level.Begginer}>
        <Prose>
          <p>
            Hooks rely on a fixed call order on every render. Breaking these rules causes React to lose track of which
            state belongs to which hook.
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Only call hooks at the top level — never inside conditions, loops, or nested functions.</li>
            <li>Only call hooks from React function components or custom hooks.</li>
          </ol>
          <DocLink href="https://react.dev/reference/rules/rules-of-hooks" label="React docs — Rules of Hooks" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useState and how does it work?" level={Level.Begginer}>
        <Prose>
          <p>
            <code className="inline-code">useState</code> declares a piece of state in a functional
            component. It returns the current value and a setter function. Calling the setter schedules a re-render with
            the new value.
          </p>
          <Code>{`const [count, setCount] = useState(0);
setCount((prev) => prev + 1); // functional update when next value depends on previous`}</Code>
          <DocLink href="https://react.dev/reference/react/useState" label="React docs — useState" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useEffect and how does it work?" level={Level.Begginer}>
        <Prose>
          <p>
            <code className="inline-code">useEffect</code> runs side effects after render: fetching data,
            subscribing to events, syncing with external systems. The dependency array controls when it re-runs; the
            returned function cleans up on unmount or before the next run.
          </p>
          <Code>{`useEffect(() => {
  fetch('/api/data').then(setData);
  return () => cleanup();
}, [userId]);`}</Code>
          <DocLink href="https://react.dev/reference/react/useEffect" label="React docs — useEffect" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is useReducer and how does it work?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            <code className="inline-code">useReducer</code> manages complex state with a reducer function
            and explicit actions — similar to Redux but local to one component (or shared via Context). Prefer it over
            multiple related <code className="inline-code">useState</code> calls when updates are
            interdependent.
          </p>
          <Code>{`const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });`}</Code>
          <DocLink href="https://react.dev/reference/react/useReducer" label="React docs — useReducer" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is conditional rendering?" level={Level.Begginer}>
        <Prose>
          <p>
            React lets you render different UI based on conditions. Common patterns: early <code className="inline-code">return</code>,
            ternary operator, or logical <code className="inline-code">&&</code> (mind falsy values like{' '}
            <code className="inline-code">0</code>).
          </p>
          <Code>{`{isLoggedIn ? <Dashboard /> : <Login />}
{error && <p>{error}</p>}`}</Code>
          <DocLink href="https://react.dev/learn/conditional-rendering" label="React docs — Conditional rendering" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What are lists and keys in React?" level={Level.Begginer}>
        <Prose>
          <p>
            When rendering lists with <code className="inline-code">.map()</code>, each item needs a
            stable <code className="inline-code">key</code> so React can match items across re-renders.
            Use a unique id from your data — avoid array index if the list can be reordered, inserted, or deleted.
          </p>
          <DocLink href="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key" label="React docs — Rendering lists" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="How does event handling work in React?" level={Level.Begginer}>
        <Prose>
          <p>
            React events use camelCase (<code className="inline-code">onClick</code>) and you pass a{' '}
            <strong>function reference</strong>, not a function call. React wraps native events in{' '}
            <strong>SyntheticEvents</strong> for consistent behavior across browsers.
          </p>
          <Code>{`<button onClick={handleClick}>OK</button>
// ❌ onClick={handleClick()} — runs immediately on every render`}</Code>
          <DocLink href="https://react.dev/learn/responding-to-events" label="React docs — Responding to events" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is lifting state up?" level={Level.Begginer}>
        <Prose>
          <p>
            When two or more sibling components need the same data, move the state to their{' '}
            <strong>closest common parent</strong>. Pass state down as props and pass callbacks up so children can report
            changes — this is the core of React&apos;s one-way data flow.
          </p>
          <DocLink href="https://react.dev/learn/sharing-state-between-components" label="React docs — Sharing state between components" />
        </Prose>
      </CollapsibleSection>

      <CollapsibleSection title="What is composition vs inheritance?" level={Level.Inrtermediate}>
        <Prose>
          <p>
            Instead of extending class components to reuse behavior, React favors <strong>composition</strong>: nest
            components via <code className="inline-code">children</code> and props. A{' '}
            <code className="inline-code">Card</code> does not need to know what goes inside; you compose
            smaller pieces flexibly without rigid inheritance hierarchies.
          </p>
          <DocLink href="https://react.dev/learn/passing-props-to-a-component#alternative-using-jsx-children" label="React docs — Composition with children" />
        </Prose>
      </CollapsibleSection>
      </NumberedCollapsibleSections>
    </div>
  )
}

export default ReactBasics
