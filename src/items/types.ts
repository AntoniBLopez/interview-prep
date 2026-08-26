import type { ComponentType } from 'react'

export enum Level {
  Begginer = 'begginer',
  Inrtermediate = 'intermediate',
  Advanced = 'advanced',
}

export type Exercise = {
  id: string
  kind: 'exercise'
  level: Level
  question: string
  title: string
  description: string
  file: string
  topics: string[]
  Component: ComponentType
}

export type Question = {
  id: string
  kind: 'question'
  level: Level
  question: string
  title: string
  description: string
  file: string
  topics: string[]
  Component: ComponentType
}
