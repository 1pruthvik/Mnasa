// src/three/chapters/ChapterSwitch.tsx
import React from 'react'
import type { ChapterId } from '../../contracts/types'
import { useStore } from '../../store'
import Chapter00Descent from './Chapter00Descent'
import Chapter01Moon from './Chapter01Moon'
import Chapter02MarsEarly from './Chapter02MarsEarly'
import Chapter03MarsLong from './Chapter03MarsLong'
import Chapter04Belt from './Chapter04Belt'
import Chapter05Anywhere from './Chapter05Anywhere'
import Chapter06Inventory from './Chapter06Inventory'

const MAP: Record<ChapterId, React.ComponentType> = {
  'ch00-descent':    Chapter00Descent,
  'ch01-moon':       Chapter01Moon,
  'ch02-mars-early': Chapter02MarsEarly,
  'ch03-mars-long':  Chapter03MarsLong,
  'ch04-belt':       Chapter04Belt,
  'ch05-anywhere':   Chapter05Anywhere,
  'ch06-inventory':  Chapter06Inventory,
}

export default function ChapterSwitch() {
  const id = useStore(s => s.activeChapter)
  const C = MAP[id] || Chapter00Descent
  return <C key={id} />
}
