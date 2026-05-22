import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import type { NewsDetail } from './news.schema'

const news: NewsDetail[] = [
  {
    author: 'Alice Johnson',
    content:
      'This is the full content of the first news item. It contains detailed information about the topic.',
    date: '2026-05-18',
    id: 1,
    title: 'First news item',
  },
  {
    author: 'Bob Smith',
    content:
      'This is the full content of the second news item. It contains detailed information about the topic.',
    date: '2026-05-17',
    id: 2,
    title: 'Second news item',
  },
  {
    author: 'Carol White',
    content:
      'This is the full content of the third news item. It contains detailed information about the topic.',
    date: '2026-05-16',
    id: 3,
    title: 'Third news item',
  },
]

writeFileSync(join(import.meta.dirname, 'news.local.json'), JSON.stringify({ news }, null, 2))
