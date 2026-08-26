import type { Exercise, Question } from '../items/types'

export type Track = {
  id: string
  name: string
  description: string
  exercisesPath: string
  questionsPath: string
  exercises: Exercise[]
  questions: Question[]
}

export type TrackItem = Exercise | Question
