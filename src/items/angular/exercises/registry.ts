import { Level } from '../../types'
import type { Exercise } from '../../types'
import { ComponentCommunication } from './component-communication/ComponentCommunication'
import { DependencyInjection } from './dependency-injection/DependencyInjection'

export const angularExercises: Exercise[] = [
  {
    kind: 'exercise',
    id: 'component-communication',
    level: Level.Begginer,
    question: 'How do Angular components communicate with each other?',
    title: 'Component Communication',
    description: 'Implementa: @Input / @Output entre padre e hijo.',
    file: 'src/items/angular/exercises/component-communication/ComponentCommunication.tsx',
    topics: ['@Input', '@Output', 'EventEmitter'],
    Component: ComponentCommunication,
  },
  {
    kind: 'exercise',
    id: 'dependency-injection',
    level: Level.Begginer,
    question: 'What is dependency injection in Angular and why is it useful?',
    title: 'Dependency Injection',
    description: 'Implementa: servicio compartido inyectado en varios componentes.',
    file: 'src/items/angular/exercises/dependency-injection/DependencyInjection.tsx',
    topics: ['@Injectable', 'providers', 'services'],
    Component: DependencyInjection,
  },
]
