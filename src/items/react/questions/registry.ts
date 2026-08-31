import { Level } from '../../types'
import type { Question } from '../../types'
import ReactBasics from './ReactBasics'
import ReactSenior from './ReactSenior'
import VirtualDOM from './VirtualDOM'
import VirtualDOMResources from './VirtualDOMResources'

export const reactQuestions: Question[] = [
  {
    id: 'react-basics',
    kind: 'question',
    level: Level.Begginer,
    question: 'Preguntas básicas de React para entrevistas (junior/mid)',
    title: 'React Basics (+20)',
    description:
      'Conceptos fundamentales, Hooks, ciclo de vida, patrones básicos y consejos para entrevistas — todo en un solo tab.',
    file: 'src/items/react/questions/ReactBasics.tsx',
    topics: ['Hooks', 'JSX', 'Virtual DOM', 'props', 'state', 'ciclo de vida'],
    Component: ReactBasics,
  },
  {
    id: 'react-senior',
    kind: 'question',
    level: Level.Advanced,
    question: 'Preguntas senior de React: patrones, arquitectura e internals',
    title: 'React Senior',
    description:
      'HOCs, render props, custom hooks, code splitting, SSR, internals de hooks y sync entre pestañas.',
    file: 'src/items/react/questions/ReactSenior.tsx',
    topics: ['HOC', 'render props', 'custom hooks', 'SSR', 'code splitting', 'internals'],
    Component: ReactSenior,
  },
  {
    id: 'react-fiber-virtual-dom',
    kind: 'question',
    level: Level.Advanced,
    question: 'What is React Fiber and why is it different from the virtual DOM?',
    title: 'React Fiber vs Virtual DOM',
    description:
      'Historia de React, el Virtual DOM y Fiber: qué es cada uno y por qué no son lo mismo.',
    file: 'src/items/react/questions/VirtualDOM.tsx',
    topics: ['Fiber', 'Virtual DOM', 'reconciliation', 'Concurrent Rendering'],
    Component: VirtualDOM,
    Resources: VirtualDOMResources,
  },
]
