import { useStore } from '../../store'
import type { ChapterId } from '../../contracts/types'
import { Chapter00Descent } from './Chapter00Descent'
import { Chapter01Moon } from './Chapter01Moon'
import { Chapter02MarsEarly } from './Chapter02MarsEarly'
import { Chapter03MarsLong } from './Chapter03MarsLong'
import { Chapter04Belt } from './Chapter04Belt'
import { Chapter05Anywhere } from './Chapter05Anywhere'
import { Chapter06Inventory } from './Chapter06Inventory'
import { Travel, travelAt } from './Travel'

export default function ChapterSwitch() {
  const activeChapter = useStore((s) => s.activeChapter as ChapterId)

  const route = useStore((s) => travelAt(s.progress))
  if (route) return <Travel route={route} />
  switch (activeChapter) {
    case 'ch00-descent':
      return <Chapter00Descent />
    case 'ch01-moon':
      return <Chapter01Moon />
    case 'ch02-mars-early':
      return <Chapter02MarsEarly />
    case 'ch03-mars-long':
      return <Chapter03MarsLong />
    case 'ch04-belt':
      return <Chapter04Belt />
    case 'ch05-anywhere':
      return <Chapter05Anywhere />
    case 'ch06-inventory':
      return <Chapter06Inventory />
    default:
      return <Chapter00Descent />
  }
}
