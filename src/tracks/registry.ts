import { angularExercises, angularQuestions } from '../items/angular/registry'
import { reactExercises, reactQuestions } from '../items/react/registry'
import type { Track } from './types'

export const tracks: Track[] = [
  {
    id: 'react',
    name: 'React',
    description: 'Hooks, componentes, patrones de entrevista React',
    exercisesPath: 'src/items/react/exercises/',
    questionsPath: 'src/items/react/questions/',
    exercises: reactExercises,
    questions: reactQuestions,
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Componentes, servicios, DI y patrones Angular',
    exercisesPath: 'src/items/angular/exercises/',
    questionsPath: 'src/items/angular/questions/',
    exercises: angularExercises,
    questions: angularQuestions,
  },
]

export function getTrack(id: string) {
  return tracks.find((track) => track.id === id)
}
