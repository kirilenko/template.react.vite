import type { NewsItem } from './news.schema'

const ITEMS: NewsItem[] = [
  { date: '2026-05-18', id: 1, title: 'First news item' },
  { date: '2026-05-17', id: 2, title: 'Second news item' },
  { date: '2026-05-16', id: 3, title: 'Third news item' },
]

export function useNewsReading(): { items: NewsItem[] } {
  return { items: ITEMS }
}
