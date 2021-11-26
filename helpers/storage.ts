const STORE_KEY = 'tmdb-actives'

export function save(selected: number[]): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(selected))
}

export function load(): number[] {
  const saved = localStorage.getItem(STORE_KEY)
  return saved ? JSON.parse(saved) : []
}
