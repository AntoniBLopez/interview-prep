import { Level } from '../../types'
import type { Exercise } from '../../types'
import { ClickCircles } from './click-circles/ClickCircles'
import { ChildToParent } from './child-to-parent/ChildToParent'
import { PortalExample } from './portal/PortalExample'
import { CodeSplitting } from './code-splitting/CodeSplitting'
import { GlobalStore } from './global-store/GlobalStore'
import TreeBrowser from './tree-browser/TreeBrowser'
import AIInference from './ai-inference/AIInference'

export const reactExercises: Exercise[] = [
  {
    kind: 'exercise',
    id: 'child-to-parent',
    level: Level.Begginer,
    question: 'How to pass data from child to parent?',
    title: 'Child → Parent',
    description: 'Implementa: hijo envía datos al padre via callback.',
    file: 'src/items/react/exercises/child-to-parent/ChildToParent.tsx',
    topics: ['props', 'callbacks', 'state'],
    Component: ChildToParent,
  },
  {
    kind: 'exercise',
    id: 'portal',
    level: Level.Begginer,
    question: 'How to render an element outside of component scope/tree?',
    title: 'Portal (DOM externo)',
    description: 'Implementa: modal con createPortal en #portal-root.',
    file: 'src/items/react/exercises/portal/PortalExample.tsx',
    topics: ['portal', 'createPortal', 'DOM'],
    Component: PortalExample,
  },
  {
    kind: 'exercise',
    id: 'code-splitting',
    level: Level.Begginer,
    question:
      'How to implement code splitting in your React app and why? (by code splitting we also meant lazy loading of React Components)',
    title: 'Code Splitting',
    description: 'Implementa: carga diferida con React.lazy + Suspense.',
    file: 'src/items/react/exercises/code-splitting/CodeSplitting.tsx',
    topics: ['lazy', 'Suspense', 'dynamic import'],
    Component: CodeSplitting,
  },
  {
    kind: 'exercise',
    id: 'global-store',
    level: Level.Begginer,
    question: 'What is the best way to add a global store to your React app or project?',
    title: 'Global Store',
    description: 'Implementa: estado global con Context (o la lib que prefieras).',
    file: 'src/items/react/exercises/global-store/GlobalStore.tsx',
    topics: ['Context', 'Provider', 'global state'],
    Component: GlobalStore,
  },
  {
    kind: 'exercise',
    id: 'tree-browser',
    level: Level.Inrtermediate,
    question: 'Can you build out a tree browser component?',
    title: 'Tree Browser',
    description:
      'Contruye un tree en el browser simulando la estructura de carpetas y archivos de tu DEI',
    file: 'src/items/react/exercises/tree-browser/TreeBrowser.tsx',
    topics: ['JSON', 'Render', 'Recursive'],
    Component: TreeBrowser,
  },
  {
    kind: 'exercise',
    id: 'click-circles',
    level: Level.Inrtermediate,
    question: 'Can you draw circles on click and support undo/redo?',
    title: 'Click Circles (Undo/Redo)',
    description: 'Implementa: pinta círculos donde haces click con botones Undo y Redo.',
    file: 'src/items/react/exercises/click-circles/ClickCircles.tsx',
    topics: ['state', 'events', 'undo/redo', 'immutability'],
    Component: ClickCircles,
  },
  {
    kind: 'exercise',
    id: 'ai-inference',
    level: Level.Advanced,
    question:
      "Can you create an AI Inference that shows the answer as they are generated? (error management it's part of the exercise)",
    title: 'AI Inference',
    description:
      'Stateless AI inference to stateful AI inference. Crea un chat sencillo en el que le envias un prompt a la AI y pintas la respuesta según te la va dando.',
    file: 'src/items/react/exercises/ai-inference/AIInference.tsx',
    topics: ['JSON', 'Render', 'Recursive', 'State'],
    Component: AIInference,
  },
]
