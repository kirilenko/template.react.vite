export interface NewsItem {
  date: string
  id: number
  title: string
}

export interface NewsDetail extends NewsItem {
  author: string
  content: string
}
